"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "~/trpc/react";
import QueryTable from "./QueryTable";
import { Button } from "./ui/button";

interface getMarketItemsResponse {
  result: any[];
}

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

  const { data, isLoading, isError, refetch } =
    api.query.getMarketItems.useQuery<getMarketItemsResponse>(
      { item },
      {
        enabled: false, // This prevents the query from auto-running
      },
    );

  const handleSubmit = async () => {
    refetch();
  };

  useEffect(() => {
    if (data && data.result) {
      setMarketItems(data.result);
    }
  }, [data]);

  const disableSubmit = () => {
    return (
      selectedAction === "" ||
      item === "" ||
      selectedSubAction === "" ||
      selectedPrice === "" ||
      selectedWhere === "" ||
      selectedCity.name === ""
    );
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

      {isLoading && <div>Loading...</div>}
      {marketItems && data && (
        <div className="mx-auto w-full max-w-5xl">
          <QueryTable data={data.result} />
        </div>
      )}
    </div>
  );
};

export default Submit;
