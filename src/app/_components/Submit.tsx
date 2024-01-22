"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "~/trpc/react";
import { QueryResult } from "../lib/typings.d";
import QueryTable from "./QueryTable";
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

  const [marketItems, setMarketItems] = useState<any[] | null>(null);

  const city = "Los Angeles";
  const state = "California";

  const [high, setHigh] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);
  const [median, setMedian] = useState<number | null>(null);

  const { data, isError, refetch } = api.query.getMarketItems.useQuery<
    QueryResult[]
  >(
    { item, city, state },
    {
      enabled: false, // This prevents the query from auto-running
    },
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await refetch();
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    if (data) {
      const interpretedData = interpretData(data);
      setMarketItems(interpretedData);
    }
  }, [data]);

  const disableSubmit = () => {
    return item === "" || selectedWhere === "";
  };

  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <Button
        variant="outline"
        className="border-blue-900 border-opacity-30 bg-transparent px-16 text-white hover:bg-blue-900 hover:bg-opacity-30 hover:text-white"
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

      {isLoading &&
        [...Array(5)].map((_, i) => (
          <div
            key={i}
            className="mb-4 w-full animate-pulse rounded bg-slate-900 bg-opacity-80 p-10"
          ></div>
        ))}

      {data && (
        <div className="mx-auto w-full max-w-5xl">
          <QueryTable data={data} />
        </div>
      )}
    </div>
  );
};

export default Submit;
