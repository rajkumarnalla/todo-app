import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import DataTableFilter, {FilterMainProps} from "./DataTableFilter";

export default function DataListFilter({filterTasks, setToastInfo}: FilterMainProps) {

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="filter">
        <FilterListIcon />
      </IconButton>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogContent>
          <DataTableFilter
            filterTasks={filterTasks}
            setToastInfo={setToastInfo}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
