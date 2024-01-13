"use client";
import React from "react";
import { useSelector } from "react-redux";
import { api } from "~/trpc/react";
import { QueryResult } from "../lib/typings.d";
import { Button } from "./ui/button";

type ApiResult = {
  result: QueryResult[];
};

const Submit = () => {
  const {
    selectedAction,
    item,
    selectedSubAction,
    selectedPrice,
    selectedWhere,
    selectedCity,
  } = useSelector((state: any) => state.query);

  const { data: marketItems, isLoading } = api.query.getMarketItems.useQuery<
    boolean,
    ApiResult
  >(
    { item },
    // {
    //   enabled: item.length > 0, // This prevents the query from running until there is an item
    // },
  );

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
      <div className="p-4"></div>

      {marketItems && (
        <div className="mx-auto w-full max-w-3xl">
          <ul>
            {Array.isArray(marketItems.result) &&
              marketItems.result.map((item) => (
                <li key={item.item}>
                  {item.item} - {item.price}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Submit;
