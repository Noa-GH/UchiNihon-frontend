# UchiNihon Frontend

UchiNihon is an application dedicated to finding abandoned Japanese homes (known as *Akiya*) across Japan. 

## Purpose & Problem Solved

There are millions of unoccupied homes in Japan, many of which are deteriorating and forgotten. For non-Japanese speakers, acquiring one of these homes is incredibly challenging.

This project exists to solve that problem by providing a modern, English-friendly application. UchiNihon helps English speakers discover homes that would otherwise be lost due to:
- Severe language barriers in traditional Japanese real estate.
- Poor data collection and fragmentation of Akiya listings across various small municipal databases.
- The lack of English-friendly applications catering to the home buying and renting process in rural Japan.

## Tech Stack

This frontend application is built using modern web technologies to ensure a fast, robust, and easily maintainable user experience:

- **[React 19](https://react.dev/)**: Core UI library.
- **[TypeScript](https://www.typescriptlang.org/)**: For strict type safety and better developer experience.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for blazing fast development servers and optimized builds.
- **[React Router](https://reactrouter.com/)**: For application routing and navigation.
- **[TanStack Query](https://tanstack.com/query/latest/)**: For powerful asynchronous state management and data fetching.
- **[Zod](https://zod.dev/)**: For schema-based validation.

## Download & Setup

To get the application running locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd UchiNihon-frontend
   ```

2. **Install dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and configure any necessary variables for your local setup:
   ```bash
   cp .env.example .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   This will start the Vite development server and automatically open the application in your browser.

## Deployment

To deploy the application to a production environment:

1. **Build the project:**
   ```bash
   npm run build
   ```
   This will compile the TypeScript code and bundle the React application into the `dist/` directory, optimized for production.

2. **Deploy the `dist/` folder:**
   The output is a collection of static files. You can deploy the contents of the `dist/` directory to any static hosting service such as **Vercel**, **Netlify**, **GitHub Pages**, or serve it using **Google Cloud Run** or **AWS S3/CloudFront**.
