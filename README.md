# Chess with AI

This project allows users to play chess against an AI. Users can choose from multiple AI providers, including Gemini, GPT, and Cohere. The app features a chessboard with interactive gameplay and integrates real-time AI moves.

## Live Demo

You can try the deployed app here:  
[Chess AI Demo](https://chess-ai-aoocbx92m-prachi-nardes-projects.vercel.app/)

## Features

- Play chess against different AI providers: Gemini, GPT, and Cohere.
- Real-time chess move suggestions.
- Interactive chessboard using the `react-chessboard` library.
- Toast notifications for error handling and move alerts.
- Responsive user interface.

## Technologies Used

- **React.js** for the frontend.
- **Chess.js** for chess game logic.
- **React Chessboard** for rendering the chessboard.
- **React Toastify** for toast notifications.
- **Fetch API** for making API calls to fetch AI moves.

## Setup Instructions

### 1. Clone the repository

To get started, clone the repository to your local machine.

```bash
git clone https://github.com/prachinarde/chess-ai-app.git
cd chess-ai
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Run the Development Server

To start the local development server, run:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to see the application in action.

### 4. Build the Project for Production

To create an optimized production build, run:

```bash
npm run build
```

The optimized files will be generated in the `build/` directory.

## Deployment

This app is hosted on Vercel. To deploy your own version:

1. Create an account on [Vercel](https://vercel.com).
2. Link your GitHub repository to Vercel.
3. Deploy the app by following Vercel's deployment instructions.

## AI Providers

- **Gemini**  
  API: [https://api.gemini.com/v1/move](https://api.gemini.com/v1/move)  
  Fetches the best move based on the provided FEN (chessboard position).

- **GPT**  
  API: [https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions)  
  Uses GPT-4 to suggest a move based on a provided FEN.

- **Cohere**  
  API: [https://api.cohere.ai/generate](https://api.cohere.ai/generate)  
  Provides chess move suggestions based on a prompt.

## Troubleshooting

If you encounter issues related to missing or invalid API keys, check the respective AI provider's documentation for obtaining a valid API key.

Ensure that all dependencies are correctly installed by running `npm install`.
