"use client";

import React, { useState, useEffect } from "react";

function HomePage() {
  const [text, setText] = useState("");
  const fullText = "Meu Projeto Full-Stack Stefanini";
  const typingSpeed = 100; // ms por letra

  // Efeito para simular o efeito de digitação
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, typingSpeed); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-background text-primary">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono border-r-2 border-primary pr-2 animate-pulse">
        {text}
      </h1>
    </div>
  );
}

export default HomePage;