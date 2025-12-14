---
title: 'Tech Lead of "Where’s Religion?"'
date: '12/12/25'
summary: 'How I led a team to overhaul "Where’s Religion?" by modernizing its tech stack, security, and UX for ethnographers and cultural studies, in partnership with Saint Louis University.'
published: 'true'
---

### My work on _Where's Religion?_

_Where's Religion?_ is best described as a sort of social media and learning platform for ethnographers and cultural studies. I took up this project as a tech lead guiding a group of undergraduate capstone students and working with a client from the Saint Louis University Center of Lived Religion.

<figure>
  <img src="/projects/wr-home.png" alt="New Where's Religion home page" class="rounded-lg" />
  <figcaption class="text-sm text-muted-foreground text-center">New home page</figcaption>
</figure>

<figure>
  <img src="/projects/wr-home-old.png" alt="Old Where's Religion home page" class="rounded-lg" />
  <figcaption class="text-sm text-muted-foreground text-center">Old home page</figcaption>
</figure>

I chose it due to it being within my skillsets and seeing many things that could be improved in it. It is a cross platform React Native application as well as a Next.js web application, which are technologies that I am comfortable working with and felt I could guide a less experienced team on to success. I ended up leading a team of three undergrads in their computer science capstone course and having weekly meetings with the client who owns the website and mobile app with the SLU Center of Lived Religion.

I quickly found out that there were a lot of problems under the hood in addition to the sub-par UX. Many issues stemming from the poor backend solution. It was using a bespoke SLU created open source BAAS called RERUM. RERUM is a cool idea in that it is a hosted backend on SLU infrastructure that provides a structured CRUD API that automatically provides linked open data following the Web Annotation Data Model W3C specification. The issues however are in that we have no control over our data other than through their limited provided CRUD endpoints and there was no security preventing anyone from doing anything.

I took it upon myself to rewrite RERUM into a node package that could extend an existing server in similar format to BetterAuth. So it can be added to an Express router and endpoints can be proxied behind middleware. We also get the added benefit of being able to add custom search and pagination endpoints that we were not able to have before. And moved _Where's Religion?_ onto its own server on SLU AWS. I also moved to dockerize elements during local development so we could mess with fake data during development instead of adding/modifiying stuff on the real production database which they had been doing previously. The project has also grossly misused Next.js in ways that harmed the experience of users through slow load times, leaked environment variables in production code, and an overly complicated codebase. All of which I also moved to fix.

In addition to major security overhauls I also wanted to push for a better UX. One of the main selling points of _Where's Religion?_ was supposed to be its ease of use. However, it lacked many common features now expected in modern interfaces and no unified design choices. We modernized the UI of almost every page and elements on the mobile app as well. I also pushed to show off more on the website and use it as a platform to market the mobile app and the Center of Lived Religion. In addition to the landing page improvements, I had improvements done to the website state management to be more unified and reduce redundant rerenders and fetch calls on page navigations with caching.

<figure>
  <img src="/projects/wr-showcase.png" alt="New mobile app showcase page" class="rounded-lg" />
  <figcaption class="text-sm text-muted-foreground text-center">New mobile app showcase</figcaption>
</figure>

Apparently, I learned that many of the changes I pushed for and made had been wanted for years but no one had been able to coordinate with the right people and teams and get things done the right way before I came along. I guess sometimes it pays to be a bit stubborn and push for things to be done right.

I also learned a lot about project management and working with a team this semester. It is certainly not as easy when everyone is not equally passionate and motivated. Especially given that the undergrad capstone is only 2 credits so I really had to temper my Sprint expectations and goals for them to better align with what they wanted to do. Working withing the boundaries of SLU was also difficult with getting things deployed and secured. However, not quite as tricky as my current job working on CUI + Classified military software.

<figure>
  <img src="/projects/wr-team.png" alt="Where's Religion? Team" class="rounded-lg" />
  <figcaption class="text-sm text-muted-foreground text-center">Where's Religion? Team</figcaption>
</figure>
