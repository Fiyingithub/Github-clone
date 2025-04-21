# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#Project Info

# GitHub Repository Portfolio

A React web application that displays GitHub repositories with various features including pagination, search functionality, and detailed repository views.

## Features

- **Repository Listing**: View all repositories with pagination (5 per page)
- **Search & Filter**: Search repositories by name or description, and filter by type (all, sources, forks)
- **Repository Details**: View detailed information about each repository
- **Create Repository**: Create new repositories via modal interface
- **Update Repository**: Update repository details such as description, homepage URL, etc.
- **Delete Repository**: Delete repositories with confirmation
- **Error Boundary**: Graceful error handling throughout the application
- **404 Page**: Custom not found page for invalid routes
- **Responsive Layout**: Mobile-friendly design that works across devices
- **Accessibility**: Built with accessibility in mind, including proper focus management and ARIA attributes

## Technologies Used

- Reactjs
- React-Router-dom for routing
- Octokit REST for GitHub API integration
- Tailwind CSS for styling
- React Hooks for state management

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Fiyingithub/github-repo-portfolio.git
   cd 3mtt
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your GitHub token:

   ```
   REACT_APP_GITHUB_TOKEN=your_github_token
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Project Structure

```


## Authentication

This application uses GitHub's personal access token for authentication. To use the create, update, and delete functionality, you'll need to:

1. Generate a GitHub personal access token at https://github.com/settings/tokens
2. Grant the token `repo` scope to allow repository management
3. Add the token to your environment variables as described in the setup section

## Deployment

This application is deployed to Vercel:

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set the environment variables in Vercel's project settings
4. Deploy your site

## Live Demo

- GitHub Repository: [https://github.com/Fiyingithub/Github-clone]
- Live Demo: [https://github-clone-jade-two.vercel.app/]

## Learning Outcomes

This project demonstrates:

- Working with third-party APIs (GitHub API)
- Implementing pagination for large data sets
- Creating responsive and accessible UIs
- Handling form submissions and validation
- Managing state with React Hooks
- Implementing robust error handling
- Creating reusable components

## License

MIT © [Adekoya Adegbenga]
