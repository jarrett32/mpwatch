"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/Searchbar.css";

import { Input } from "~/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";

function SearchBar() {
  // const phrases = [
  //   "Search for new electronics below $200...",
  //   "Find deals for books from $10 to $30...",
  //   "Track prices of cameras for 60 days...",
  //   "Search for vintage clothing under $100...",
  //   "Find deals for new shoes $30 to $100...",
  //   "Track laptop prices for next 30 days...",
  // ];
  // const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // useEffect(() => {
  //   const changePhrase = () => {
  //     setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
  //   };

  //   const typingDuration = 4;
  //   const deletingDuration = 2;
  //   const totalDuration = (typingDuration + deletingDuration) * 1000; // milliseconds

  //   const interval = setInterval(changePhrase, totalDuration);

  //   return () => clearInterval(interval);
  // }, []);

  const subActionStates = {
    search: ["lt", "bt", "gt"],
    track: ["lowest", "between", "highest"],
  };

  const [selectedAction, setSelectedAction] = useState("search");
  const [selectedSubAction, setSelectedSubAction] = useState("lt");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    if (selectedAction == "search") {
      setSelectedSubAction("lt");
    } else if (selectedAction == "track") {
      setSelectedSubAction("lowest");
    }
  }, [selectedAction]);

  return (
    // <div>
    //   <div className="typing-demo">{phrases[currentPhraseIndex]}</div>
    // </div>

    <div className="flex text-black">
      <Select value={selectedAction} onValueChange={setSelectedAction}>
        <SelectTrigger className="w-[180px] border-none bg-transparent text-2xl font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="search">Search For</SelectItem>
            <SelectItem value="track">Track</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        className="w-[300px] border-none bg-transparent text-2xl font-bold focus:border-none active:border-none"
        type="text"
        placeholder="Keywords here..."
      />
      {selectedAction == "search" ? (
        <>
          <Select
            value={selectedSubAction}
            onValueChange={setSelectedSubAction}
          >
            <SelectTrigger className="w-[180px] border-none bg-transparent text-2xl font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="lt">Less Then</SelectItem>
                <SelectItem value="bt">Between</SelectItem>
                <SelectItem value="gt">Greater Than</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="w-[100px] border-none bg-transparent text-2xl font-bold focus:border-none active:border-none"
            type="text"
            placeholder="$0.00"
            value={selectedPrice}
            onChange={(e) => {
              const newPrice = "$" + e.target.value.replace(/[^0-9.]/g, "");
              if (newPrice == "$") {
                setSelectedPrice("");
              } else {
                setSelectedPrice(newPrice);
              }
            }}
          />
        </>
      ) : selectedAction == "track" ? (
        <Select value={selectedSubAction} onValueChange={setSelectedSubAction}>
          <SelectTrigger className="w-[180px] border-none bg-transparent text-2xl font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowest">Lowest</SelectItem>
              <SelectItem value="track">Between</SelectItem>
              <SelectItem value="track">Greater Than</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
}

export default SearchBar;
