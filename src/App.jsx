import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';
import GeminiInteraction from './GeminiInteraction';

function App() {
  const cubeMeshRef = useRef();

  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={cubeMeshRef}> 
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}> {/* Ground plane */}
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="gray" />
        </mesh>
        <color attach="background" args={['#272727']} />
      </Canvas>
      <GeminiInteraction meshRef={cubeMeshRef} />
    </div>
  );
}

export default App;
