# Interactive 3D Scene with Gemini 3 and React

This project demonstrates an interactive 3D scene built with React and `@react-three/fiber`. The scene's behavior can be controlled through natural language commands processed by the Gemini 3 API.

## Features

*   **3D Scene:** A basic 3D environment with a rotating cube and a ground plane.
*   **Gemini Integration:** Uses Google's Gemini 3 API to understand user prompts.
*   **Interactive Controls:** Users can command the scene to change cube color, rotation speed, or reset properties via text input.
*   **React and `@react-three/fiber`:** Leverages these libraries for building the UI and managing the 3D scene.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd interactive-3d-scene-gemini-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Get a Gemini API Key:**
    *   Go to [Google AI Studio](https://aistudio.google.com/).
    *   Create a new API key.

4.  **Configure API Key:**
    *   Create a `.env` file in the root of the project.
    *   Add your API key to the `.env` file:
        ```
        VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```
    *   **Note:** The provided `GeminiInteraction.jsx` file has a placeholder `YOUR_GEMINI_API_KEY`. For this setup to work, you'll need to replace it with your actual key or, preferably, use environment variables as shown in the comment within `GeminiInteraction.jsx` and set up your `.env` file.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

6.  **Open in browser:**
    Navigate to `http://localhost:5173` (or the port specified by Vite).

## Usage

Once the application is running, you will see a 3D scene with a control panel.

*   Enter commands in the input field (e.g., `rotate faster`, `change color to blue`, `reset`).
*   Press `Enter` or click the `Send` button.
*   Observe the 3D scene and the response text for feedback.

## File Structure

```
interactive-3d-scene-gemini-react/
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── GeminiInteraction.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Dependencies

*   `react`
*   `react-dom`
*   `@react-three/fiber`
*   `three`
*   `@google/generative-ai`
*   `vite` (for development server and build)
