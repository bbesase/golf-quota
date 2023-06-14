import { Box } from "@chakra-ui/react";
import { Golfer } from "src/types/golfer";
import { CompactTable } from '@table-library/react-table-library/compact';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { useTheme } from '@table-library/react-table-library/theme';
import { Link } from "react-router-dom";

interface TableProps {
  golfers: Golfer[] | null
}

export const COLUMNS = [
  { label: 'First Name', renderCell: (item: any) => {
    const name = `${item.firstName}`;
    return (
      <Link to={`/golfer/${item.guuid}`}>{name}</Link>
    )
  }},
  { label: 'Last Name', renderCell: (item: any) => {
    const name = `${item.lastName}`;
    return (
      <Link to={`/golfer/${item.guuid}`}>{name}</Link>
    )
  }},
  { label: 'Average', renderCell: (item: any) => item.average },
];

export default function Table (props: TableProps) {
  const nodes = props.golfers;
  const data = {nodes}
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  return (
    <div>
      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box>
    </div>
  )
}