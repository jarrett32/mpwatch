"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/Searchbar.css";

function SearchBar() {
  const phrases = [
    "Search for new electronics below $200...",
    "Find deals for books from $10 to $30...",
    "Track prices of cameras for 60 days...",
    "Search for vintage clothing under $100...",
    "Find deals for new shoes $30 to $100...",
    "Track laptop prices for next 30 days...",
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const changePhrase = () => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    };

    const typingDuration = 4;
    const deletingDuration = 2;
    const totalDuration = (typingDuration + deletingDuration) * 1000; // milliseconds

    const interval = setInterval(changePhrase, totalDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="typing-demo">{phrases[currentPhraseIndex]}</div>
    </div>
  );
}

export default SearchBar;
