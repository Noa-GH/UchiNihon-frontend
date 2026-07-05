# UchiNihon - Frontend

**Live Site:** [https://noa-gh.github.io/UchiNihon-frontend/](https://noa-gh.github.io/UchiNihon-frontend/)

UchiNihon is a modern web application dedicated to finding abandoned Japanese homes (known as *Akiya*) across Japan.

---

## 📖 Consumer Usage & Purpose

There are millions of unoccupied homes in Japan, many of which are deteriorating and forgotten. For non-Japanese speakers, acquiring one of these homes is incredibly challenging due to:
- Severe language barriers in traditional Japanese real estate.
- Poor data collection and fragmentation of Akiya listings across various small municipal databases.
- The lack of English-friendly applications catering to the home buying and renting process in rural Japan.

**UchiNihon** solves this by providing a unified, English-friendly platform. Consumers use this frontend application to:
- Seamlessly browse property listings and authoritative housing statistics (synced from the e-Stat API).
- Create accounts to save favorite properties and manage preferences.
- Interact with a fast, responsive UI built to remove the friction of the traditional Japanese real estate process.

---

## 💻 For Outsider Developers

We welcome developers who want to explore, learn from, or contribute to the UchiNihon frontend. The application is designed to be robust, type-safe, and highly performant.

### Tech Stack
- **Core Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety.
- **Build Tool:** [Vite](https://vitejs.dev/) for instant dev server startup and optimized production builds.
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Data Fetching/State:** [TanStack Query v5](https://tanstack.com/query/latest/) for asynchronous state management.
- **Validation:** [Zod](https://zod.dev/) for schema-based data validation.

### Architecture
The frontend communicates via REST with the `uchinihon-backend`. State is primarily managed via TanStack React Query, ensuring smooth caching, background updates, and optimistic UI rendering.

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Noa-GH/UchiNihon-frontend.git
   cd UchiNihon-frontend
   ```

2. **Install Dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Set up your variables (e.g., pointing `VITE_API_BASE_URL` to your local backend instance running on port 3001).

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Vite will start the server and automatically open the application in your default browser.

### Scripts
- `npm run dev`: Start the local development server.
- `npm run build`: Type-check and build the project for production.
- `npm run lint`: Run ESLint across the codebase.
- `npm run format`: Format code using Prettier.
- `npm run preview`: Serve the built `dist/` directory locally to preview the production build.

### Deployment
To deploy the application to a production environment:
1. Run `npm run build` to generate the `dist/` directory.
2. Deploy the static contents of `dist/` to any static hosting service (e.g., Vercel, Netlify, GitHub Pages, Google Cloud Run, AWS S3).
