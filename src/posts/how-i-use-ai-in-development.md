---
title: 'How I Use AI in Development'
date: '2026-2-26'
summary: 'A practical look at how I actually use Claude Code and the Claude app in my workflow — what I use them for, what works, and what I have learned.'
published: 'true'
---

I use AI a lot in my development workflow. Not in a "let me generate my entire app" kind of way, more like it has become part of how I think through and build things. I wanted to write about what that actually looks like because most of the discourse around AI and coding is either "it's going to replace us all" or "it's useless" and neither of those have been my experience at all. I find it extremely useful, but I don't think it'll be replacing me anytime soon.

### What I Use

I use <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a> (the app, desktop and mobile) and <a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" rel="noopener">Claude Code</a> (the CLI). They do very different things for me. I also occasionally will use Google Stitch and ChatGPT.

The Claude app is where I think. When I was building <a href="https://corates.org" target="_blank" rel="noopener">CoRATES</a> and trying to decide on a sync layer, I went back and forth in Claude about ElectricSQL vs Zero Sync vs TinyBase vs LiveStore vs Yjs. I created some prototypes and I ended up settling on Yjs after initially brushing it off as an "old library". I use the app on my phone too, which is nice for when I go on walks and want to think through things.

Claude Code is where I actually build. It sits in my terminal and has access to my whole computer. It can read files, write code, run commands, all of it. It's not autocomplete. It's more like a pair programmer who is both super smart and super dumb. I have put thousands of messages through it across a bunch of different projects at this point and it has become pretty central to how I work. But I don't only use Claude Code. I always have VS Code open to the projects I'm working on to track changes, review code, make tweaks, and stay in charge of version control. I may be writing fewer lines of code myself now, but I am reading a lot more and thinking at a higher level.

### Debugging

Probably a third of my Claude Code usage is just debugging. I see something broken, I describe it, and it traces through the codebase to figure out what's going on. Stuff like "my toasts overlap when I have multiple of them, make sure you use shadcn correctly" or "[pasted error snippet], figure out why the cloudflare migration failed" and it'll go read the relevant components and figure it out.

These aren't the kind of bugs you can solve by pasting a snippet somewhere. They span multiple files and require understanding how the project is wired together. Having an agent that can actually read your whole codebase and trace the data flow is genuinely useful for this. It's usually faster than me stepping through it manually, especially when the bug is in some interaction between components I haven't touched in a while.

### Audits

This is the one I think most people are sleeping on. I regularly ask Claude Code to just sweep my entire codebase for stuff. Full audit of my Stripe integration across local and prod. Check every frontend API call against the backend endpoints to make sure they actually line up. Security audits for lingering role checks or missing atomicity. Go through my test suite and tell me which tests are actually worthless. API consistency audits across naming, response shapes, error formats. This becomes especially important when Claude is writing code. It is essentially another layer of testing and review to help keep the AI in check.

### Architecture Decisions

I use both Claude Code and the Claude app as someone to bounce ideas off of. In Claude Code it's especially useful because it can explore the codebase first and give advice based on what I've actually built rather than generic recommendations or make prototypes to verify if what it actually says works. I'm generally well versed in a lot of things and my intuition can usually see through Claude's hallucinations. On occassions that I'm working with things I'm unfamiliar with, I get quite skeptical.

I ask things like "how do mature codebases handle these sorts of errors?", "tradeoffs between Elysia over Fastify?", "what are my options for local vector databases and tradeoffs?", "are there any fields I should include on the user schema to make it more futureproof?" — stuff like that. It doesn't make the decision for me but it helps me think through it faster. Sometimes it catches things I hadn't considered and sometimes it just confirms what I was already leaning toward, which is also valuable.

### Complex Features and Multi-Phase Prompting

When I'm building something complex like a new checklist type, a PDF annotation system, a billing flow, I don't just tell Claude Code "build X" and hope for the best. I've found that multi-phased prompts are extremely useful. The idea is to break a feature into distinct phases: explore the codebase first, then ask clarifying questions, then plan, then execute, then review. I use a structured feature development skill for this, or I'll write my own phases depending on the task. It's a huge difference compared to just throwing a one-shot prompt at it and expecting good results.

I also do a lot of competitive research and reference work through Claude Code. When I'm implementing something and want to see how other projects handle it, I've found that having Claude clone the reference repos and read the code directly is far more useful than having it search the internet or browse GitHub for docs. These development AI tools are designed to be experts at reading code, and actual source code doesn't lie. So I'll have it look for OSS projects, clone repos, explore how they structured something, and then apply those patterns to my project. This has proved to be very reliable for all sorts of tasks from Stripe integrations to local-first patterns.

### Making It Smarter

One thing I've spent real time on is extending AI to work better for my specific projects. For CoRATES I built a custom <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener">MCP</a> server that gave Claude Code extra tools like icon search, pulling up documentation, and more. It made the agents smarter and more useful. I've also built Claude Code plugins for structured feature development and testing, and custom skills for code review. I set up a workflow where I can launch three code-reviewer agents in parallel with different focuses — simplicity/DRY/elegance, bugs/functional correctness, and project conventions — and then consolidate the findings.

Adding more context has tradeoffs so it's important to first get an intuition for how the models work and how to manage their context windows. Don't just give it an MCP server and have it be always on and don't just accept other people's workflows.

The most fun experiment was building an MCP server for an idle game side project that let Claude Code actually play the game. I could tell it "play until first prestige, inform me of how long it takes and provide a review, you are a game tester" and it would interact with the game through the MCP tools and give me feedback on pacing and balance. Not a replacement for real playtesting but pretty cool for rapid iteration and a neat feature to let users play the game with their own AI agent. I also tried letting <a href="https://github.com/openclaw/clawdebot" target="_blank" rel="noopener">clawdebot</a> (an autonomous agent) loose on the project to see how well it could build features completely on its own. Short answer: not well. It drifts, loses context, and makes compounding bad decisions that I would catch immediately. Fully autonomous agents are not there yet for anything beyond guided/structured tasks.

### Where It Sucks

AI has a strong pull toward generic, safe, boring output. In frontend work especially, you get this visually bland, instantly recognizable aesthetic and in backend work you get overengineered solutions and common pitfalls. I've had to be pretty explicit about pushing back on this. I have custom skills inspired by the Anthropic frontend-design skill in order to make quick, visually inspiring designs. I don't like using `any` types, I don't want error handling for scenarios that can't happen, I don't want abstractions for one-time operations, and I don't want everything to be backwards compatible. Without these guardrails it will happily over-engineer everything or implement unique solutions in situations where nice abstractions would actually work well.

Context degradation is also a real thing. Long sessions get worse as the conversation grows. I've gotten into the habit of asking Claude to write up what it accomplished and what the next steps are so I can start a fresh session with a good continuation prompt. It works but it's annoying.

### What I've Learned

The biggest thing is that AI amplifies whatever you already are as a developer. If you have strong opinions about architecture and code quality, it helps you move faster. If you don't, it will confidently generate stuff that seems fine until it isn't. The developers who get the most out of this are the ones who could do the work without it but use it to take on more than they otherwise would.

I'm doing a Master's in AI so I think about this a lot. I've been working on many projects, CoRATES for example with real-time collaboration with CRDTs, edge compute, multi-tenant auth, billing, the whole thing would be significantly harder without AI in my workflow. But the AI isn't the reason the architecture is good or the product decisions are right. That part is still on me. It's a tool, and like any tool, the quality of what comes out depends on who's using it.
