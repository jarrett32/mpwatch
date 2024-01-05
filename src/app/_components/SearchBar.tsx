"use client";
import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/Searchbar.css";
import { Button } from "./ui/button";

import { Input } from "~/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { City } from "../lib/typings.d";
import { cn } from "../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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

  const [selectedAction, setSelectedAction] = useState("search");
  const [item, setItem] = useState("");
  const [selectedSubAction, setSelectedSubAction] = useState("lt");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<City>({
    name: "",
    country: "",
  });
  const [selectedWhere, setSelectedWhere] = useState("in");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log({
      selectedAction,
      item,
      selectedSubAction,
      selectedPrice,
      selectedCity,
    });
  }, [selectedAction, item, selectedSubAction, selectedPrice, selectedCity]);

  useEffect(() => {
    const filtered = cities
      .filter(
        (city: City) =>
          selectedCity?.name &&
          city.name &&
          city.name.toLowerCase().includes(selectedCity.name.toLowerCase()),
      )
      .slice(0, 10);
    setFilteredCities(filtered);
  }, [selectedCity, cities]);

  useEffect(() => {
    fetch("/cities.json")
      .then((response) => response.json())
      .then((data) =>
        setCities(data.filter((city: City) => city.country == "US")),
      )
      .catch((error) => console.error("Error loading city data:", error));

    console.log("cities", cities.length);
  }, []);

  const subActionStates = {
    search: ["lt", "bt", "gt"],
    track: ["lowest", "between", "highest"],
  };

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

    <div className="flex p-1 text-white">
      <Select value={selectedAction} onValueChange={setSelectedAction}>
        <SelectTrigger className="w-auto border-none bg-blue-900 text-2xl font-bold">
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
        placeholder="Item..."
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
      />
      {selectedAction == "search" ? (
        <>
          <Select
            value={selectedSubAction}
            onValueChange={setSelectedSubAction}
          >
            <SelectTrigger className="w-[180px] border-none bg-blue-800 text-2xl font-bold">
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
        <>
          <Select
            value={selectedSubAction}
            onValueChange={setSelectedSubAction}
          >
            <SelectTrigger className="w-auto border-none bg-blue-600 text-2xl font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="lowest">Lowest</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="highest">Highest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mx-4 p-1 text-2xl font-bold">Prices</div>
        </>
      ) : null}
      <Select value={selectedWhere} onValueChange={setSelectedWhere}>
        <SelectTrigger className="w-auto border-none bg-blue-500 text-2xl font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="in">In</SelectItem>
            <SelectItem value="inplus">In + Shipping</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between border-none bg-transparent text-white hover:bg-transparent hover:text-white"
          >
            {selectedCity.name
              ? cities.find((city: City) => city.name === selectedCity.name)
                  ?.name
              : "Find City"}
            <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Find City"
              onValueChange={(value) =>
                setSelectedCity({ ...selectedCity, name: value })
              }
            />
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {filteredCities.map((city: City) => (
                <CommandItem
                  key={city.name}
                  value={city.name}
                  onSelect={(currentValue) => {
                    setSelectedCity(
                      currentValue === selectedCity.name
                        ? { name: "", country: "" }
                        : { ...selectedCity, name: currentValue },
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity === city.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {city.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchBar;
