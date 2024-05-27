import { Card, CardContent, Typography, Box, Grid, CardActionArea } from "@mui/material";
import { StatusText } from "./DataTable";
import dayjs from "dayjs";

interface DataTableProps {
  columnLabels: string[];
  columns: string[];
  data: any[];
  handleRowClick: (row: any) => void;
}

export default function DataList({
  columnLabels,
  columns,
  data,
  handleRowClick,
}: DataTableProps) {
  return (
    <Box>
      {data.map(el => (
        <Card variant="outlined" style={{marginBottom: '10px'}}>
          <CardActionArea onClick={() => handleRowClick(el)}>
            <CardContent style={{padding: '6px 10px'}}>
              <Typography color="textPrimary">
                {el.title}
              </Typography>
              <Typography color="textPrimary">
                {el.description}
              </Typography>
              <Grid container spacing={2} direction="row" justifyContent={"space-between"}>
                <Grid item>
                  <Grid container direction="row">
                    <Typography color="textSecondary">
                      Due
                    </Typography>
                    <Typography color="textPrimary" style={{marginLeft: '10px'}}>
                      {dayjs(el.dueDate).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography color="textPrimary" style={{marginLeft: '10px'}}>
                    <StatusText status={el['status']}/>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      {data?.length === 0 && <Card variant="outlined" style={{marginBottom: '10px'}}>
        <Typography textAlign="center" color="textPrimary" style={{marginLeft: '10px', padding: '20px'}}>
          No Tasks Found
        </Typography>
      </Card>}
    </Box>
  )
}
