"use client";
import { CaretDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import {
  setItem,
  setSelectedAction,
  setSelectedCity,
  setSelectedPrice,
  setSelectedSubAction,
  setSelectedWhere,
} from "~/store/query";
import { City } from "../lib/typings.d";
import { cn, getAllCities, getCityFromLL } from "../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function SearchBar() {
  const dispatch = useDispatch();
  const {
    selectedAction,
    item,
    selectedSubAction,
    selectedPrice,
    selectedWhere,
    selectedCity,
  } = useSelector((state: any) => state.query);

  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleSelectedAction = (value: string) => {
    dispatch(setSelectedAction(value));
  };

  const handleSelectedSubAction = (value: string) => {
    dispatch(setSelectedSubAction(value));
  };

  const handleSelectedWhere = (value: string) => {
    dispatch(setSelectedWhere(value));
  };

  const handleSelectedCity = (name?: string, lat?: number, lng?: number) => {
    const city = { name: name, lat: lat, lng: lng };
    // dispatch(setSelectedCity(city));
  };

  function capitalizeWords(string: string) {
    return string.replace(/\b(\w)/g, (s) => s.toUpperCase());
  }

  useEffect(() => {
    const filtered = cities.filter((city) => {
      return city.name.toLowerCase().includes(selectedCity.name.toLowerCase());
    });

    setFilteredCities(filtered.slice(0, 8));
  }, [selectedCity, cities]);

  useEffect(() => {
    const cities = getAllCities() || [];
    setCities(cities);
  }, []);

  const subActionStates = {
    search: ["lt", "bt", "gt"],
    track: ["lowest", "between", "highest"],
  };

  useEffect(() => {
    if (selectedAction == "search") {
      dispatch(setSelectedSubAction("lt"));
    } else if (selectedAction == "track") {
      dispatch(setSelectedSubAction("lowest"));
    }
  }, [selectedAction]);

  return (
    // <div>
    //   <div className="typing-demo">{phrases[currentPhraseIndex]}</div>
    // </div>

    <div className="flex flex-col justify-between space-y-6 rounded bg-transparent p-1 text-white lg:flex-row lg:space-y-0 lg:bg-slate-900">
      <div className="flex flex-row justify-start">
        <div className="hidden md:block">
          <Select value={selectedAction} onValueChange={handleSelectedAction}>
            <motion.div
              className="w-auto rounded border-none bg-blue-900 bg-opacity-40 text-2xl font-bold"
              initial={{ backgroundColor: "rgba(0, 0, 139, .4)" }}
              whileHover={{ backgroundColor: "rgba(0, 0, 139, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </motion.div>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="search">Search For</SelectItem>
                <SelectItem value="soon" disabled>
                  More options coming soon
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Input
          className={`text-md w-[170px] animate-pulse border-none bg-transparent font-bold focus:border-none active:border-none md:w-auto lg:text-2xl ${
            item ? "animate-none" : "animate-pulse"
          }`}
          type="text"
          placeholder="Item..."
          value={item}
          onChange={(e) => {
            dispatch(setItem(e.target.value));
          }}
        />
        {/* {selectedAction == "search" && item ? (
          <>
            <Select
              value={selectedSubAction}
              onValueChange={handleSelectedSubAction}
            >
              <motion.div
                className="w-auto rounded border-none bg-blue-900 bg-opacity-40 text-2xl font-bold"
                initial={{ backgroundColor: "rgba(0, 0, 139, .4)" }}
                whileHover={{ backgroundColor: "rgba(0, 0, 139, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </motion.div>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lt">Less Then</SelectItem>
                  <SelectItem value="bt">Between</SelectItem>
                  <SelectItem value="gt">Greater Than</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              className={`w-[100px] border-none bg-transparent text-2xl font-bold focus:border-none active:border-none ${
                selectedPrice ? "animate-none" : "animate-pulse"
              }`}
              type="text"
              placeholder="$0.00"
              value={selectedPrice}
              onChange={(e) => {
                const newPrice = "$" + e.target.value.replace(/[^0-9.]/g, "");
                if (newPrice == "$") {
                  dispatch(setSelectedPrice(""));
                } else {
                  dispatch(setSelectedPrice(newPrice));
                }
              }}
            />
          </>
        ) : selectedAction == "track" && item ? (
          <>
            <Select
              value={selectedSubAction}
              onValueChange={handleSelectedSubAction}
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
        ) : null} */}
      </div>
      <>
        {/* <div className="my-auto px-4 text-center text-2xl font-bold text-white">
            In
          </div> */}
        <div className="justify-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`text-md my-auto w-auto justify-between border-none bg-transparent font-bold text-white hover:bg-transparent hover:text-white md:text-2xl ${
                  selectedCity.name ? "animate-none" : "animate-pulse"
                }`}
              >
                {selectedCity.name
                  ? capitalizeWords(selectedCity.name)
                  : "Find City"}
                <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Command>
                <CommandInput
                  placeholder="Find City"
                  onValueChange={(value) =>
                    dispatch(
                      setSelectedCity({
                        name: value,
                        state: "",
                        lat: 0,
                        lon: 0,
                      }),
                    )
                  }
                />
                <CommandEmpty>Not found.</CommandEmpty>
                <CommandGroup>
                  {filteredCities.map((city: City) => (
                    <CommandItem
                      key={city.lon + city.lat}
                      value={city.name}
                      onSelect={(currentValue) => {
                        dispatch(
                          setSelectedCity(
                            currentValue === selectedCity.name
                              ? { name: "", state: "", lat: 0, lon: 0 }
                              : city,
                          ),
                        );
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCity.name === city.name
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {capitalizeWords(city.name || "")}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </>
    </div>
  );
}

export default SearchBar;
