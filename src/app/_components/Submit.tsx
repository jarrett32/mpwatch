"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "~/trpc/react";
import type { QueryResult } from "../lib/typings.d";
import QueryTable from "./QueryTable";
import { Button } from "./ui/button";

const Submit = () => {
  const { item, selectedCity } = useSelector((state: any) => state.query);

  const offerUpQuery = api.query.getOfferUpItems.useQuery(
    { item, city: selectedCity.name, state: selectedCity.state },
    { enabled: false },
  );
  const marketplaceQuery = api.query.getFacebookMarketplaceItems.useQuery(
    { item, city: selectedCity.name },
    { enabled: false },
  );

  const [results, setResults] = useState<QueryResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [high, setHigh] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);
  const [median, setMedian] = useState<number | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    // Function to handle successful fetch and update state
    const handleSuccess = (newData) => {
      if (!newData) return;
      setResults((prevResults) => [...prevResults, ...newData]);
      interpretData([...results, ...newData]);
    };

    // Function to handle fetch error (logs error and does nothing else)
    const handleError = (error, source) => {
      console.error(`Error fetching data from ${source}:`, error);
    };

    // Fetch OfferUp data
    offerUpQuery
      .refetch()
      .then((response) => {
        handleSuccess(response.data);
      })
      .catch((error) => {
        handleError(error, "OfferUp");
      });

    // Fetch Marketplace data
    marketplaceQuery
      .refetch()
      .then((response) => {
        handleSuccess(response.data);
      })
      .catch((error) => {
        handleError(error, "Marketplace");
      });
  };

  const interpretData = (data: QueryResult[]) => {
    // Sort by data by price
    const sortedData = data.sort((a, b) => {
      if (a.price && b.price) {
        return parseInt(a.price) - parseInt(b.price);
      }
      return 0;
    });
    setHigh(parseInt(sortedData[sortedData.length - 1]?.price!));
    setLow(parseInt(sortedData[0]?.price!));

    setMedian(
      parseInt(
        sortedData[Math.floor(sortedData.length / 2)]?.price ??
          sortedData[Math.floor(sortedData.length / 2) - 1]?.price!,
      ),
    );

    return sortedData;
  };

  const disableSubmit = () => {
    return item === "" || selectedCity.name === "" || !selectedCity.lat;
  };

  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <Button
        variant="outline"
        className="border-blue-900 border-opacity-30 bg-transparent px-10 text-white hover:bg-blue-900 hover:bg-opacity-30 hover:text-white md:px-16"
        onClick={handleSubmit}
        disabled={disableSubmit()}
      >
        Submit
      </Button>
      <div className="p-4"></div>

      {high && low && median && (
        <div className="mx-auto flex max-w-xl flex-row items-center justify-around font-bold">
          <div className="">Low: ${low}</div>
          <div className="">Med: ${median}</div>
          <div className="">High: ${high}</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mx-auto w-full max-w-5xl">
          <QueryTable data={results} />
        </div>
      )}

      {isLoading &&
        [...Array(5)].map((_, i) => (
          <div
            key={i}
            className="mb-4 w-full animate-pulse rounded bg-slate-900 bg-opacity-80 p-10"
          ></div>
        ))}
    </div>
  );
};

export default Submit;
