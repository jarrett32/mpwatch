import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";

export function QueryTable({ data }: { data: any }) {
  const marketColor = (market: string) => {
    switch (market) {
      case "offerup":
        return "text-green-500";
      case "facebook":
        return "text-blue-500";
      default:
        return "";
    }
  };

  const routeToLink = (link: string) => {
    window.open(link, "_blank");
  };

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Item</TableHead>
          <TableHead>Price Listed</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Market</TableHead>
          <TableHead className="w-[240px]">Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((q: any) => (
          <TableRow
            className="cursor-pointer"
            onClick={() => routeToLink(q.link)}
            key={q.link}
          >
            <TableCell className="font-medium">{q.item}</TableCell>
            <TableCell className="font-bold">
              {q.price ? q.price : ""}
            </TableCell>
            <TableCell>{q.location ? q.location : ""}</TableCell>
            <TableCell className={`${marketColor(q.market)}`}>
              {q.market}
            </TableCell>
            <TableCell className="text-ellipsis underline">{q.link}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default QueryTable;
