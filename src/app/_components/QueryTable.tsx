import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";
import { QueryResult } from "../lib/typings.d";

export function QueryTable({ data }: { data: QueryResult[] }) {
  console.log("QueryTable", data);

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Market</TableHead>
          <TableHead className="w-[160px]">Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((q) => (
          <TableRow key={q.item + q.link}>
            <TableCell className="font-medium">{q.item}</TableCell>
            <TableCell>{q.price ? q.price : ""}</TableCell>
            <TableCell>{q.City?.name ? q.City.name : ""}</TableCell>
            <TableCell>{q.market}</TableCell>
            <TableCell>{q.link}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default QueryTable;
