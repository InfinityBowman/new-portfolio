# Copilot Instructions for Portfolio Project

## Project Overview
This is Jacob Maynard's personal portfolio website built with modern web technologies.

## Tech Stack
- **Framework**: Preact (React-compatible) with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP (with @gsap/react) and Motion (Framer Motion)
- **Smooth Scrolling**: Lenis
- **Icons**: react-icons
- **Markdown**: vite-plugin-markdown for blog posts

## Project Structure
```
src/
├── components/       # React/Preact components
│   ├── nav/          # Navigation components
│   └── icons/        # Icon components
├── lib/              # Data files and utilities
│   ├── data.ts       # Site content (experience, projects, education, etc.)
│   └── socials.tsx   # Social media links
├── posts/            # Blog posts in Markdown
├── App.tsx           # Main app with routing
├── Home.tsx          # Home page layout
├── Blog.jsx          # Blog page
├── Main.tsx          # Entry point with Lenis setup
└── global.css        # Global styles and Tailwind config
```

## Key Conventions

### Imports
- Use `@/` alias for absolute imports from project root (e.g., `@/src/components/Hero`)
- React is aliased to Preact in vite.config.ts

### Styling
- Use Tailwind CSS classes for styling
- CSS variables defined in `global.css` for theming (e.g., `--background`, `--primary`, `--accent`)
- Use `text-muted-foreground` for secondary text
- Use `border-accent` for borders
- Headers use the "Anton" font family

### Animations
- GSAP ScrollTrigger for scroll-based animations
- Use `useGSAP` hook from `@gsap/react` for cleanup
- Common pattern: `.slide-up`, `.slide-over`, `.pop-in` classes for animated elements
- Motion/Framer Motion for simpler animations

### Components
- Section components should have `id` for navigation (e.g., `id="about"`)
- Use `SectionTitle` component for consistent section headers
- Components typically use `useRef` with GSAP for scroll animations
- Follow existing animation patterns (fade in on scroll, fade out when leaving viewport)

### Data
- Site content is centralized in `src/lib/data.ts`
- Social links are in `src/lib/socials.tsx`
- Add new sections by: 1) Adding data to data.ts, 2) Creating component, 3) Adding to Home.tsx, 4) Adding to NavMenu.tsx

### Lenis Smooth Scrolling
- Lenis is initialized in Main.tsx wrapping the entire app
- Use `useLenis()` hook to access Lenis instance
- For instant scrolling (like scrollbar drag), use `lenis.scrollTo(target, { immediate: true })`
- Default lerp is 0.1 with duration 1.4

## Common Tasks

### Adding a new section
1. Add data to `src/lib/data.ts`
2. Create component in `src/components/`
3. Import and add to `src/Home.tsx`
4. Add navigation link in `src/components/nav/NavMenu.tsx`

### Adding a blog post
1. Create `.md` file in `src/posts/`
2. Blog component will automatically pick it up

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
