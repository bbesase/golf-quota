import { Box } from "@chakra-ui/react";
import { Golfer } from "src/types/golfer";
import { CompactTable } from '@table-library/react-table-library/compact';
import { COLUMNS } from "./columns";
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { useTheme } from '@table-library/react-table-library/theme';

interface TableProps {
  golfers: Golfer[] | null
}

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