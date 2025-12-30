---
title: 'Developing CoRATES'
date: '2025-12-30'
summary: 'Building a local-first, real-time collaborative platform for research appraisal on the Cloudflare edge.'
published: 'true'
---

Research synthesis pulls together findings across many studies to determine what actually works, for whom, and under what conditions. But those conclusions are only as credible as the evidence behind them, which is why study appraisal is foundational to systematic reviews and meta-analyses. In practice, it is also one of the more complex and time-consuming parts of the process.

Working closely with a top evidence synthesist, I quickly learned that while well-established appraisal instruments exist, the software support around them was fragmented. Critical steps were spread across PDFs, spreadsheets, and statistical software for visualization, with some work, like scoring, still done manually. It was far more complicated and messy than it needed to be.

As a software engineer, I saw these challenges as solvable design problems. I built <a href="https://corates.org" target="_blank" rel="noopener">CoRATES</a> alongside leading researchers to explore what a blazingly fast, modern, collaborative research appraisal platform (Linear/Figma style) could look like if it were designed from the ground up for concurrency, low latency, and distributed teams.

At its core, CoRATES is a Collaborative Research Appraisal Tool for Evidence Synthesis. It enables multiple researchers to appraise studies simultaneously without overwriting each other's work, following local-first principles that prioritize speed, resilience, and offline capability.

The rest of this post dives into how CoRATES was built. I'll walk through the design goals, architecture, and tradeoffs behind it, including how real-time collaboration, local-first behavior, and edge-native infrastructure shaped the system, and what I learned building it as a solo developer.

### Design Goals

From the start, CoRATES was designed around a few core goals shaped directly by real appraisal workflows:

- **Seamless collaboration**: Support true parallel work so multiple reviewers can independently code and score studies without overwriting one another.
- **Intuitive double-coding and reconciliation**: Make it easy to compare ratings, resolve disagreements, and document final decisions in one place.
- **All-in-one workflow**: Everything should happen in a single application, from completing appraisal checklists, to intuitive reconciliation, automatic scoring, and generating publication-ready outputs. No bouncing between PDFs, spreadsheets, and external tools.
- **Rigor by design**: Structure the workflow to support consistency and transparency, reduce errors and help researchers apply best practices in study appraisal.
- **Local-first performance**: Keep the app fast and resilient, with offline support and background syncing built in.
- **Designed for future AI integration**: The data model and workflows were intentionally structured so AI can be integrated later as a collaborative aid within the appraisal process, supporting judgment and consistency rather than sitting outside the workflow.

The architecture, design, and technology choices were heavily influenced by tools like <a href="https://linear.app/homepage" target="_blank" rel="noopener">Linear</a> and <a href="https://livestore.dev/" target="_blank" rel="noopener">LiveStore</a>.

### Architecture Overview

CoRATES is built as a local-first Progressive Web App deployed on Cloudflare’s edge stack. There is no traditional server or long-lived backend process. Instead, the system is composed of several main components:

- Cloudflare Workers handle request routing, authentication, and API logic.
- Durable Objects act as authoritative coordination points for long lived collaborative projects.
- Yjs provides CRDT-based data structures that enable real-time, conflict-free merging.
- D1 is used as a SQLite relational store for cross-project data such as users and billing information.
- R2 stores larger assets such as PDFs and images.

The system is fully multi-tenant, with project data isolated per organization. This combination allows collaborative state to live close to users while still remaining consistent and durable.

### Real-Time Collaboration with CRDTs

One of the most interesting challenges in CoRATES was figuring out the sync layer. I searched far and wide for the ideal architecture for my data model. I explored ElectricSQL, TinyBase, Zero Sync, and LiveStore (even built SolidJS adapters for some of them) before finally settling on Yjs, a CRDT (Conflict-free Replicated Data Type) library designed for real-time collaboration.

Each project’s collaborative state is synchronized through a Durable Object, which acts as a rendezvous point for connected clients. Updates propagate over a WebSocket connection that is scoped per project and only active while a user is viewing that project, with an additional WebSocket channel used for notifications.

This approach avoids traditional locking, reduces coordination overhead, and results in a smoother collaborative and development experience. It also makes it possible to keep nearly all application state at the edge.

### Local-First by Default

A key benefit of the CRDT-based approach is that it naturally enables local-first behavior. Most interactions happen against in-memory or locally cached state (IndexedDB), with synchronization occurring opportunistically in the background.

This makes the app feel fast and resilient. Network latency or brief disconnects do not block user interaction, which is particularly valuable in long, cognitively demanding workflows like study appraisal. I know many researchers who regularly take trains or flights that often experience poor or no connection.

Once the data model was designed this way, supporting offline usage primarily came down to implementing robust service worker logic.

### Frontend and UX

The main application is built with SolidJS, chosen for its fine-grained reactivity and predictable performance characteristics. This pairs well with a data model that updates frequently due to real-time collaboration. I also love SolidJS and Ryan Carniato and find its mental model far better than React. It pushes you towards success by making the easy path, the correct path.

Marketing and informational pages are built with SolidStart, keeping the overall stack cohesive while allowing for static generation where appropriate. I was having difficulty figuring out the best way to do a primarily SPA app but with certain pages being prerendered on the same domain. The split architecture doesn't feel the best but it seems like the simplest way to achieve it all in one nice CICD and deployment on Workers.

As a PWA, CoRATES supports installation, offline behavior, and a more app-like experience. I am very happy that it has almost no loading spinners (except in the auth flow) and everything appears instantly, synced between users and saved to their local devices.

### Authentication, Permissions, and Billing

Beyond the core collaboration features, CoRATES includes a full identity and monetization stack:

- OAuth-based sign-in/sign-up
- Magic link authentication
- Optional two-factor authentication
- Admin impersonation for support and debugging
- Subscription billing via Stripe

These features are implemented using Better-Auth, allowing security-sensitive concerns to remain robust while still integrating cleanly. Better-Auth is amazing and I loved learning how it works and working with it.

This was also my first time working with Stripe and doing anything with monetization which was pretty cool.

### Improving Developer Experience

During development, I built a custom MCP server to improve agent-driven workflows. This made claude, copilot, etc. way smarter and much more useful and efficient. I gave them more initial context about the codebase and some tools to search for icons, get relevant documentation, lint the codebase, and more.

While not user-facing, this tooling significantly improved iteration speed and helped keep the codebase manageable as a solo developer still learning. It was also pretty cool to see it work and see agents using my custom tooling.

### Lessons Learned

Building CoRATES reinforced several ideas:

- Local-first is so crazy, the speed and reliability you get by simply using web standards is incredible.
- Yjs is very good. At first I had brushed it off as a older thing in favor of the newer ElectricSQL and Zero Sync but Yjs really knows what it is doing and has solved its problems well. Combining it with Durable Objects I think is a very powerful architecture.
- Cloudflare is amazing. I had never used them for anything before, I had only done things on AWS, various VPSs, Netlify, Vercel, Supabase, and Firebase. Cloudflare is just really nice and does things in a way I like. I do think they can continue to improve and be better. I think Convex really has the infra as code thing solved quite well and Cloudflare is getting pretty close.

### What's Next

CoRATES is an ongoing project. Near-term work includes native PDF annotation, deeper analytics, expanded export formats, and additional collaboration features designed for larger research teams.

Within the next month, we plan to run structured user testing with a broader group of researchers, followed by a full public launch in late spring.

More broadly, CoRATES continues to explore how modern web primitives, CRDTs, edge compute, and local-first design can be combined to build serious, production-grade collaborative tools for evidence synthesis without traditional server infrastructure.
