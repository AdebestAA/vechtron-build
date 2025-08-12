import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

const info = [
  {
    id: 1,
    date: "Jan 10, 2025",
    service: `Oil Change & Filter
    5W-30 Full Synthetic
    Oil Filter Replacement`,
    provider: `BraJiffy Lube
    Main Street Locationke Oil`,
    cost: "$30,000 ",
    mileage: "42,100"
  },
  {
    id: 1,
    date: "Jan 10, 2025",
    service: `Oil Change & Filter
    5W-30 Full Synthetic
    Oil Filter Replacement`,
    provider: `BraJiffy Lube
    Main Street Locationke Oil`,
    cost: "$30,000 ",
    mileage: "42,100"
  },
  {
    id: 1,
    date: "Jan 10, 2025",
    service: `Oil Change & Filter
    5W-30 Full Synthetic
    Oil Filter Replacement`,
    provider: `BraJiffy Lube
    Main Street Locationke Oil`,
    cost: "$30,000 ",
    mileage: "42,100"
  },
  {
    id: 1,
    date: "Jan 10, 2025",
    service: `Oil Change & Filter
    5W-30 Full Synthetic
    Oil Filter Replacement`,
    provider: `BraJiffy Lube
    Main Street Locationke Oil`,
    cost: "$30,000 ",
    mileage: "42,100"
  },

]

export function TableDemo() {
  return (
    <Table className="[&_td]:whitespace-normal [&_td]:align-top [&_td]:px-8 [&_td]:py-2 [&_td]:min-w-[100px] border-separate border-spacing-x-4">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow className="">
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Services</TableHead>
          <TableHead className="text-center">Provider</TableHead>
          <TableHead className="text-center ">Cost</TableHead>
          <TableHead className=" text-center">Milage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {info.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.date}</TableCell>
            <TableCell className=" whitespace-normal " >{item.service}</TableCell>
            <TableCell className=" whitespace-normal">{item.provider}</TableCell>
            <TableCell className="text-center">{item.cost}</TableCell>
            <TableCell className="text-center">{item.mileage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  )
}
