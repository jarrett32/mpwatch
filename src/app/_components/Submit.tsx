"use client";
import React from "react";
import { Button } from "./ui/button";

const Submit = () => {
  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <div>
      <Button
        variant="outline"
        className="ml-16 border-green-500 bg-transparent px-16 text-green-500 hover:bg-blue-700 hover:bg-opacity-50 hover:text-white"
        onClick={handleSubmit}
      >
        submit
      </Button>
    </div>
  );
};

export default Submit;
