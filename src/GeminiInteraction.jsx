import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GoogleGenerativeAI } from "@google/generative-ai";

// It's highly recommended to use environment variables for API keys
// For local development, you can store it in a .env file and use a package like 'dotenv'
// Example: const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// IMPORTANT: Replace 'YOUR_GEMINI_API_KEY' with your actual API key obtained from Google AI Studio.
const API_KEY = 'YOUR_GEMINI_API_KEY'; 

function GeminiInteraction({ meshRef }) {
  const [prompt, setPrompt] = useState('');
  const [responseText, setResponseText] = useState('Ask me to change the cube!');
  const cubeRef = useRef();
  const rotationSpeed = useRef(0.01);
  const baseColor = useRef('orange'); // Store base color

  // Initialize Gemini AI client
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-3" });

  const runChat = async () => {
    if (!prompt.trim()) return;

    setResponseText(`Thinking...`);
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      let updatedResponseText = text; // Default to raw text if no command is recognized

      // Parse commands and update scene
      const lowerCaseText = text.toLowerCase();
      if (lowerCaseText.includes('rotate faster')) {
        rotationSpeed.current *= 1.5;
        updatedResponseText = "Okay, rotating faster!";
      } else if (lowerCaseText.includes('rotate slower')) {
        rotationSpeed.current /= 1.5;
        updatedResponseText = "Okay, rotating slower.";
      } else if (lowerCaseText.includes('change color to blue')) {
        if (cubeRef.current) {
          cubeRef.current.material.color.set('blue');
          baseColor.current = 'blue'; // Update base color
          updatedResponseText = "Changed the cube to blue!";
        }
      } else if (lowerCaseText.includes('change color to red')) {
         if (cubeRef.current) {
          cubeRef.current.material.color.set('red');
          baseColor.current = 'red'; 
          updatedResponseText = "Changed the cube to red!";
        }
      } else if (lowerCaseText.includes('reset')) {
         if (cubeRef.current) {
          cubeRef.current.material.color.set(baseColor.current);
          rotationSpeed.current = 0.01;
          updatedResponseText = "Resetting cube properties.";
        }
      } else {
        // If no specific command, use a generic response or the raw text
        updatedResponseText = `Gemini says: "${text}"`;
      }

      setResponseText(updatedResponseText);

    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      setResponseText("Sorry, I encountered an error processing your request.");
    }
  };

  // Effect to ensure we have the correct mesh ref from the parent
  useEffect(() => {
    if (meshRef.current) {
        cubeRef.current = meshRef.current;
    }
  }, [meshRef]);

  // useFrame hook for animation loop
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += rotationSpeed.current;
      cubeRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '15px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., rotate faster, change color to blue, reset"
          style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc', flexGrow: 1 }}
          onKeyPress={(e) => e.key === 'Enter' && runChat()}
        />
        <button onClick={runChat} style={{ padding: '10px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}>Send</button>
      </div>
      <p style={{ margin: 0, fontSize: '1.1em' }}>{responseText}</p>
    </div>
  );
}

export default GeminiInteraction;
