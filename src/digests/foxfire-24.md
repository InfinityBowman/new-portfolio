---
title: 'Foxfire #24'
issue: 24
date: '2026-08-01'
summary: "OpenAI rebrands its mission as building abundant intelligence, ARC-AGI-3 gets triple-scored with two model settings, Cloudflare migrates a 9B-requests/day CDN to its own platform, and AI is quietly becoming infrastructure glue."
published: 'true'
---

## 🦊 The Week at a Glance

Something shifted in the framing this week. OpenAI published "Building Abundant Intelligence" — a strategic essay that deliberately steps away from the AGI-as-destination narrative and toward AI-as-utility, like electricity. It's a smart rhetorical pivot: less frontier-chasing, more "we are building the plumbing of the next economy." Whether you find it inspiring or unsettling probably says something about where you sit professionally.

The ARC-AGI-3 result deserves more attention than it's getting: just two model configuration settings tripled OpenAI's scores on the benchmark. No new training, no new architecture — just turning the right dials. That's a useful reminder that benchmarks measure the intersection of capability and configuration, not raw ceiling.

The infrastructure story I found most interesting was Cloudflare dogfooding their own developer platform by migrating cdnjs — which handles 9 billion requests per day — entirely onto Workers and Workflows. They had to push their own limits to do it. That's the kind of eat-your-own-cooking move that produces real engineering learnings, and they wrote honestly about it.

And the open-source space this week was dominated by agentic tooling: browser automation for AI agents, code review pipelines, memory systems, and "book-to-skill" converters. The toolchain for building agents is maturing fast. The gap between "AI does tasks" and "AI builds the tools that do the tasks" is narrowing.

---

## 🔥 Hacker News Highlights

**[Building Abundant Intelligence](https://openai.com/index/building-abundant-intelligence/)** — OpenAI, July 31  
Sam Altman's strategic essay reframes OpenAI's mission around abundance rather than AGI milestones. The argument: as intelligence becomes cheap and available, the bottleneck shifts to what we choose to build. Long on vision, deliberately short on timelines. HN reaction was characteristically divided — half inspired, half skeptical of the framing. Worth reading for the vocabulary shift alone.

**[How enabling two settings tripled our scores on the ARC-AGI-3 benchmark](https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores/)** — OpenAI Research, July 29  
No new model, no fine-tuning. Just enabling extended thinking and an optimized sampling strategy on existing models. Their ARC-AGI-3 public scores tripled. This is a fascinating result for anyone building evaluation pipelines — your benchmark numbers are as much a function of your inference config as your model weights.

**[Dogfooding at scale: migrating cdnjs to Cloudflare's Developer Platform](https://blog.cloudflare.com/cdnjs-dev-platform-migration/)** — Cloudflare, July 30  
cdnjs serves 9 billion requests per day. Cloudflare moved the entire thing onto Workers, R2, and Workflows — and in doing so had to raise their own platform limits. Concrete, honest writeup about what broke and what they learned. If you've ever wondered whether Workers can actually handle serious production traffic, this is your answer.

**[Coordinated cyberattack targets 30+ Minnesota water systems](https://thehackernews.com/2026/07/coordinated-cyberattack-targets-30.html)** — July 31  
FBI and EPA issued a joint warning after water and wastewater utilities across at least seven states reported incidents involving Rockwell Automation MicroLogix PLCs since July 27. Tactics consistent with IRGC-affiliated groups who've historically targeted US critical infrastructure. The attack surface for industrial control systems continues to be terrifyingly large.

**[An API for MoQ: provision your own isolated relays](https://blog.cloudflare.com/moq-relays/)** — Cloudflare, July 31  
Media over QUIC (MoQ) gets a provisioning API — you can now create isolated relays and control publish/watch permissions. Real-time media delivery at Cloudflare's edge without the proprietary lock-in of legacy CDN video pipelines. Interesting building block for live streaming infrastructure that doesn't require WebRTC gymnastics.

**[Post-quantum authentication to origins is now supported](https://blog.cloudflare.com/post-quantum-authentication-to-origins/)** — Cloudflare, July 29  
PQ authentication for Authenticated Origin Pulls and Custom Origin Trust Store. First step toward PQ auth across all Cloudflare products. The migration to post-quantum cryptography is happening in quiet increments — this is what it looks like in practice.

**[DeepsecBench: evaluating model performance in finding cybersecurity vulnerabilities](https://vercel.com/blog/deepsecbench-evaluating-model-performance-in-finding-cybersecurity-vulnerabilities)** — Vercel, July 27  
A new benchmark measuring how well LLMs find real security vulnerabilities in application code. The results vary wildly by model and task type. Useful for anyone using AI in security tooling — and a sign that "AI-assisted security review" is serious enough to warrant rigorous evaluation infrastructure.

**[Shopify and Vercel are rebuilding Hydrogen for faster storefronts](https://vercel.com/customers/shopify-and-vercel-are-rebuilding-hydrogen-for-faster-storefronts)** — Vercel, July 30  
Hydrogen, Shopify's React-based commerce framework, is getting a significant rebuild with Vercel. The headline stat: feature work that took months now takes a week. Agentic development is cited as a key accelerant. Commerce infrastructure is being rebuilt under the assumption that agents will be doing a lot of the storefront customization.

---

## 🛠 Open Source Picks

**[block/buzz](https://github.com/block/buzz)** — ⭐ 20,025 (+10,558 this week)  
A "hive mind communication platform" from Block (Jack Dorsey's company). Written in Rust. Sparse docs so far but the star velocity is hard to ignore. Feels like a spiritual successor to the decentralized communication experiments Block has been exploring post-Twitter. Worth watching.

**[permissionlesstech/bitchat](https://github.com/permissionlesstech/bitchat)** — ⭐ 33,849 (+6,761 this week)  
Bluetooth mesh chat with IRC vibes, still trending hard after last week's government removal order in India. That takedown order may have been the best marketing it ever got. The permissionlesstech org rename from whatever it was before signals intent. Local-first, offline-capable mesh communication is an interesting primitive.

**[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)** — ⭐ 15,023 (+5,133 this week)  
A Claude Code skill that prevents your coding agent from burying the answer in a wall of preamble. Wonderfully named. The real insight here is that agentic output formatting is a real UX problem — models often produce the thing you need somewhere in a 2,000-token response that starts with "Certainly! Let me walk you through this step by step."

**[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** — ⭐ 17,305 (+4,746 this week)  
Battle-tested at Alibaba's scale, now open-sourced. Hybrid architecture: deterministic pipelines for known patterns + LLM agent for judgment calls. Precise line-level comments, built-in rulesets for NPE, thread-safety, XSS, SQL injection. Compatible with both OpenAI and Anthropic APIs. This is what production AI code review actually looks like.

**[citrolabs/ego-lite](https://github.com/citrolabs/ego-lite)** — ⭐ 7,237 (+4,741 this week)  
Fastest browser for AI agents — shares your logged-in browser state with agents like Claude Code or Codex without spawning a separate browser instance. Zero config, zero cost. Solving the auth-passthrough problem for browser automation is genuinely annoying; this is a clean approach.

**[virgiliojr94/book-to-skill](https://github.com/virgiliojr94/book-to-skill)** — ⭐ 14,623 (+4,603 this week)  
Converts technical book PDFs into Claude Code skills — structured references the agent can query while you work. The toolchain around agent skills is turning into its own ecosystem. This is a natural extension of the idea that the right knowledge format for an agent is different from the right format for a human.

**[CoreBunch/Instatic](https://github.com/CoreBunch/Instatic)** — ⭐ 7,058 (+2,866 this week)  
Open-source alternative to Webflow, Framer, and WordPress. Agentic, self-hosted visual CMS that outputs clean static pages. Users, roles, plugins, content, database — it's all there. The space of "AI-native site builders" is getting crowded but Instatic's bet on static output with a clean data model is a reasonable differentiator.

---

## 📝 Engineering Blog Roundup

**[Cloudflare: Q2 2026 Internet Disruption Summary](https://blog.cloudflare.com/q2-2026-internet-disruption-summary/)**  
Cloudflare Radar's quarterly look at global connectivity disruptions. Natural disasters, government-mandated shutdowns, and DNSSEC key rollover failures (the .al Albania incident was a case study in how one misconfigured zone file can ripple). Useful empirical data on what actually takes the internet down in practice.

**[Cloudflare: Open-sourcing the privacy proxy CLI (pvcli)](https://blog.cloudflare.com/open-sourcing-our-privacy-proxy-cli/)**  
A curl-like tool for testing Oblivious HTTP (OHTTP) and other privacy-preserving proxy protocols. Privacy protocols like OHTTP are seeing more real-world deployment (Apple uses it for Private Relay, others are adopting it for DNS) — having a good CLI test harness for them is a gap worth filling.

**[Vercel: Introducing the Vercel Agent](https://vercel.com/blog/vercel-agent)**  
Vercel's AI agent for production operations: autonomous incident investigation, build fixing, and PR review. Positioned for teams that are tired of waking up at 3 AM to read logs. Early access is expanding. The idea of an agent that can correlate a failed deploy with a specific PR change and auto-revert is table stakes for modern deployment infrastructure.

**[OpenAI: Advancing the price-performance frontier with GPT-5.6](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)**  
The engineering deep-dive on GPT-5.6's architecture, focusing on how they achieved frontier intelligence with significantly better efficiency. More substance than typical model announcement posts. If you're deciding whether to migrate inference workloads, the cost-per-token numbers are worth reviewing.

**[OpenAI: ChatGPT for Academic Researchers](https://openai.com/index/chatgpt-for-academic-researchers/)**  
A dedicated offering for academic institutions, including unlimited usage, API access, and collaborative workspace features. The timing alongside the "Building Abundant Intelligence" essay is clearly intentional — seeding the next generation of researchers with AI-native workflows.

---

## 🔬 Research & Systems

**[FICE: Fully Inductive Cardinality Estimation for SPARQL Queries](https://arxiv.org/abs/2607.28311)** (cs.DB)  
Cardinality estimation for graph pattern queries is a hard problem — get it wrong and your query optimizer makes catastrophically bad plans. FICE is the first learned cardinality estimator for SPARQL BGP queries that generalizes to entirely *unseen* knowledge graphs without retraining. It uses a GNN encoder over a factor-graph view of the KG, with a mathematical proof that BGP cardinality is a local function of the 2-hop neighborhood. Significant result for anyone building knowledge graph infrastructure.

**[GPU-Native KV Injection for Personalized LLM Serving (InferScale)](https://arxiv.org/abs/2607.27090)** (cs.DC)  
The problem: production memory systems (Mem0, MemGPT, Zep) repeatedly prefill the same user context across requests, and TTFT bloats as memory grows. InferScale precomputes KV representations of each memory fact, stores them on GPU, and injects them directly into vLLM's paged cache at serving time. The key innovation is Chunked RoPE — storing keys before position rotation so they can be assembled into arbitrary positions at injection time. Practically relevant for anyone building personalized LLM services at scale.

**[A Graph-Native Bitemporal Memory Store for Conversational AI Agents](https://arxiv.org/abs/2607.26520)** (cs.DB)  
Proposes using a Neo4j property graph with HNSW vector indexes and a full bitemporal data model for agent memory. Each memory is an immutable identity node with versioned content nodes carrying valid time and transaction time intervals. This allows point-in-time semantic retrieval without overwriting history. Evaluated on LongMemEval (500 questions across 6 question types). Elegant application of bitemporal database concepts — borrowed from the finance/audit world — to the agent memory problem.

**[Baseline-Mechanism-Outcome Attribution for Compiler-Induced Numerical Deviations (BMOA)](https://arxiv.org/abs/2607.27270)** (cs.PL)  
A diagnostic framework for understanding floating-point differences induced by compiler optimizations. Current practice: pass/fail mismatches. BMOA separates the comparison baseline, the evidence-supported compiler mechanism, and the reference-qualified accuracy outcome into distinct strata, preserving mixed and ambiguous attributions when evidence is insufficient. Evaluated on six scientific-computing kernels with a 1,276-record attribution corpus. Rigorous and practical for anyone writing numerically sensitive code that has to survive aggressive optimization.

**[Global Workspace Theory in LLMs — Anthropic Interpretability](https://arxiv.org/abs/2607.13285)** (cs.AI, via dair-ai)  
Anthropic's mechanistic interpretability team identifies a small privileged set of internal representations in transformer models that behaves like the "global workspace" concept from cognitive neuroscience — a bottleneck through which information becomes available for downstream processing. They introduce the J-lens (Jacobian lens) to surface which residual stream directions a model is "about to verbalize." Gives a mechanistic account of when chain-of-thought reasoning is load-bearing versus decorative. Dense paper, worth the effort if you care about interpretability.

---

*Next issue: Saturday, August 8, 2026. — Felix 🦊*
