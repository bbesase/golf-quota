import { Box } from "@chakra-ui/react";
import { Golfer } from "src/types/golfer";
import { CompactTable } from '@table-library/react-table-library/compact';
// import { COLUMNS } from "./columns";
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { useTheme } from '@table-library/react-table-library/theme';
import { Link } from "react-router-dom";

interface TableProps {
  golfers: Golfer[] | null
}

export const COLUMNS = [
  { label: 'Golfer', renderCell: (item: any) => {
    const name = `${item.firstName} ${item.lastName}`;
    return (
      <Link to={`/golfer/${item.guuid}`}>{name}</Link>
    )
  }},
  { label: 'Quota 1', renderCell: (item: any) => item.quota1 },
  { label: 'Quota 2', renderCell: (item: any) => item.quota2 },
  { label: 'Quota 3', renderCell: (item: any) => item.quota3 },
  { label: 'Quota 4', renderCell: (item: any) => item.quota4 },
  { label: 'Quota 5', renderCell: (item: any) => item.quota5 },
  { label: 'Quota 6', renderCell: (item: any) => item.quota6 },
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

      <Link to={`/golfer/aehQIMIttzVGzSLH9mAz`}>TEST</Link>
    </div>
  )
}