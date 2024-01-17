"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { api } from "~/trpc/react";
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

  const [marketItems, setMarketItems] = React.useState(null);

  const { data, isLoading, isError, refetch } =
    api.query.getMarketItems.useQuery(
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
        className="ml-16 border-green-500 bg-transparent px-16 text-green-500 hover:bg-blue-700 hover:bg-opacity-50 hover:text-white"
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
