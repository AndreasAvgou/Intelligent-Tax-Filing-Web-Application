#  Intelligent Tax Filing Assistant

This is the front-end component of the **Intelligent Tax Filing Web Application**, a sophisticated platform designed to provide AI-driven tax assistance[cite: 2, 3]. Built with **React** and **Vite**, this application focuses on delivering a seamless, responsive, and user-friendly experience[cite: 3, 13].

---

## Features (Step 1 Completion)

According to the project requirements for Step 1, the following features have been implemented:

* **Responsive Home Page**: A modern landing page with a clear description of the application's AI capabilities.
* **User-Friendly Tax Form**: A clean interface for users to input basic tax information, specifically annual income and total expenses.
* **Internationalization (i18n)**: Full support for English (EN) and Greek (EL) languages, allowing users to toggle their preferred language dynamically.
* **Dark Mode Support**: A built-in theme provider that allows users to switch between light and dark modes for better accessibility.
* **Input Validation**: Real-time validation to prevent negative values or empty submissions, ensuring data integrity before processing.
* **Interactive UI Components**: Leveraging **shadcn/ui** for high-quality, accessible components like Cards, Inputs, and Buttons.
* **Toast Notifications**: Instant feedback using **Sonner** for successful data entry or validation errors.

---

## Tech Stack

* **Framework**: [React.js](https://react.dev/) (Vite)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
* **Internationalization**: [i18next](https://www.i18next.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State Management**: React Hooks (useState)

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/       # Reusable UI components (shadcn/ui)
│   ├── lib/              # Utility functions
│   ├── theme-provider.js # Dark mode logic
│   ├── i18n.js           # Translation configurations (EL/EN)
│   ├── App.jsx           # Main application logic and UI
│   └── main.jsx          # Application entry point
├── public/               # Static assets
└── tailwind.config.js    # Tailwind CSS configuration
```

---

## Getting Started

Follow these instructions to get the front-end application up and running on your local machine for development and testing purposes.

### Prerequisites
Before you begin, ensure you have the following installed:
* **Node.js**: version 18 or higher.
* **npm** (Node Package Manager) or **yarn**.

### Installation
1. **Navigate to the frontend directory**:
   From the root of the project, enter the `frontend` folder:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   Install all the necessary dependencies using npm:
   ```bash
   npm install
   ```

### Running the Application

Once the installation is complete, you can start the development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`. You can now interact with the Intelligent Tax Filing Assistant directly from your browser.   