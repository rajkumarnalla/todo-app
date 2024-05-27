import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface DataTableProps {
  columnLabels: string[];
  columns: string[];
  data: any[];
  handleRowClick: (row: any) => void;
}

interface ColorDef {
  [key: string]: string;
}

const statusColors: ColorDef = {
  'To Do': 'maroon',
  'In Progress': 'orange',
  'Done': 'green',
}

export function StatusText({status}: {status: string}) {
  return (
    <span style={{
        background: statusColors[status], 
        padding: '2px 4px', 
        borderRadius: '4px', 
        color: 'white'
      }}
    >
      {status}
    </span>
  )
}

export function DataTable({
  columnLabels,
  columns,
  data,
  handleRowClick,
}: DataTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnLabels.map((el) => (
              <TableCell>{el}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.title}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "*": { cursor: "pointer" },
              }}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((el) => (
                <TableCell component="th" scope="row">
                  {el === "dueDate"
                    ? dayjs(row[el]).format("DD/MM/YYYY")
                    : el !== 'status' && row[el]}

                  {el === 'status' && <StatusText status={row[el]}/>}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data?.length === 0 && <TableRow>
            <TableCell align="center" colSpan={4}>
              No Tasks Found
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
