"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const Submit = () => {
  const {
    selectedAction,
    item,
    selectedSubAction,
    selectedPrice,
    selectedWhere,
    selectedCity,
  } = useSelector((state: any) => state.query);

  const disableSubmit = () => {
    if (
      //TODO: Check for valid inputs
      selectedAction == "" ||
      item === "" ||
      selectedSubAction === "" ||
      selectedPrice === "" ||
      selectedWhere === "" ||
      selectedCity.name === ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    console.log("submitting...", {
      selectedAction,
      item,
      selectedSubAction,
      selectedPrice,
      selectedWhere,
      selectedCity,
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        className="ml-16 border-green-500 bg-transparent px-16 text-green-500 hover:bg-blue-700 hover:bg-opacity-50 hover:text-white"
        onClick={handleSubmit}
        disabled={disableSubmit()}
      >
        submit
      </Button>
    </div>
  );
};

export default Submit;
