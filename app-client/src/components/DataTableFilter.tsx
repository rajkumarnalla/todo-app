import {
  Box,
  Button,
  Checkbox,
  Grid,
  Hidden,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  ClearIcon,
  DatePicker,
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setFilter } from "../store/reducers/taskSlice";

export interface FilterProps {
  [key: string]: string;
}

export interface FilterMainProps {
  filterTasks: (payload: any) => void;
  setToastInfo: any;
  handleClose?: () => void;
}

type statusFilterChangeFn = 
  ((value: SelectChangeEvent<string[]>, child: ReactNode) => void);
type dateFilterChangeFn = 
  (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => void
type dateClearFn = React.MouseEventHandler<HTMLButtonElement>;

export default function DataTableFilter({
  filterTasks,
  setToastInfo,
  handleClose,
}: FilterMainProps) {
  const {filters: {fromDate, toDate, status}} = useAppSelector(state => state.task);
  const dispatch = useAppDispatch();

  const handleStatusChange: statusFilterChangeFn = (ev: SelectChangeEvent<string[]>) => {
    const {value} = ev.target;
    
    dispatch(setFilter({
      fromDate,
      toDate,
      status: Array.isArray(value) ? value.join(',') : value
    }));
  };

  const handleDateFilterChange = (key: string): dateFilterChangeFn => (value: Dayjs | null) => {
    let data: FilterProps = {
      fromDate,
      toDate,
      status
    }
    data[key] = dayjs(value).format("DD/MM/YYYY");
    dispatch(setFilter(data));
  }

  const clearDate = (key: string):dateClearFn => () => {
    dispatch(setFilter({
      fromDate,
      toDate,
      status,
      [key]: ''
    }))
  }

  useEffect(() => {
    filterTasks({
      fromDate: dayjs(fromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      toDate: dayjs(toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      status
    });
  }, []);

  const handleSubmit = () => {
    try {
      const payload: FilterProps = {};

      if (status || (fromDate && toDate)) {
        if (status) {
          payload["status"] = status;
        }
        if (fromDate && toDate) {
          payload["fromDate"] = dayjs(fromDate, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          );
          payload["toDate"] = dayjs(toDate, "DD/MM/YYYY").format("YYYY-MM-DD");
        }
        filterTasks(payload);
        if (handleClose) {
          handleClose();
        }
      }
    } catch (err) {
      setToastInfo({
        show: true,
        message: "Request failed, please try again",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          },
          alignItems: {
            md: "flex-end",
            lg: "flex-end",
          },
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Grid xs={12} sm={12} container direction="column">
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Status</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Status"
                multiple
                sx={{
                  ".MuiSelect-select": {
                    padding: "5px",
                    fontSize: "14px",
                  },
                }}
                value={status.split(',')}
                fullWidth
                onChange={handleStatusChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected: string[]) => selected.join(", ")}
              >
                <MenuItem key="To Do" value="To Do">
                  <Checkbox checked={status?.indexOf("To Do") > -1} />
                  <ListItemText primary="To Do" />
                </MenuItem>
                <MenuItem key="In Progress" value="In Progress">
                  <Checkbox checked={status?.indexOf("In Progress") > -1} />
                  <ListItemText primary="In Progress" />
                </MenuItem>
                <MenuItem key="Done" value="Done">
                  <Checkbox checked={status?.indexOf("Done") > -1} />
                  <ListItemText primary="Done" />
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Grid container direction="column">
            <Grid item xs={4}>
              <Typography variant="subtitle1">Due Date Range</Typography>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container direction="row">
                  <Box
                    sx={{
                      width: "calc(50% - 10px)",
                      margin: "auto",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <DatePicker
                      value={dayjs(fromDate, "DD/MM/YYYY")}
                      onChange={handleDateFilterChange('fromDate')}
                      //   setFromDate(dayjs(value).format("DD/MM/YYYY"))
                      // }
                      format="DD/MM/YYYY"
                      sx={{
                        ".MuiInputBase-input": {
                          padding: "8px",
                          paddingRight: 0,
                          fontSize: "13px",
                        },
                      }}
                    />
                    <IconButton onClick={clearDate('fromDate')} size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      width: "calc(50% - 10px)",
                      margin: "auto",
                      marginLeft: "20px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <DatePicker
                      value={dayjs(toDate, "DD/MM/YYYY")}
                      onChange={handleDateFilterChange('toDate')}
                      //   setToDate(dayjs(value).format("DD/MM/YYYY"))
                      // }
                      format="DD/MM/YYYY"
                      {...(fromDate
                        ? { minDate: dayjs(fromDate, "DD/MM/YYYY") }
                        : {})}
                      sx={{
                        ".MuiInputBase-input": {
                          padding: "8px",
                          paddingRight: 0,
                          fontSize: "13px",
                        },
                      }}
                    />
                    <IconButton onClick={clearDate('toDate')} size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={1} lg={1}>
          <Grid container justifyContent={"flex-end"}>
            <Hidden only={["md", "lg"]}>
              {handleClose && (
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    padding: "4px 10px",
                    marginRight: "20px",
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              )}
            </Hidden>
            <Button
              variant="contained"
              sx={{
                color: "white",
                padding: "4px 10px",
              }}
              onClick={handleSubmit}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
