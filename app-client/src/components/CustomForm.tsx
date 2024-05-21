import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CustomFormProps } from "../utils";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function CustomForm({
  elements,
  yupSchema,
  handleFormSubmit,
  handleClose,
}: CustomFormProps) {
  const {
    control,
    handleSubmit: reactHookSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = (data: any) => {
    handleFormSubmit(data);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={reactHookSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        {elements.map((el) => {
          switch (el.type) {
            case "textfield":
              return (
                <Controller
                  name={el.name}
                  control={control}
                  defaultValue={el.defaultValue || ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={el.label}
                      type={el.protected ? "password" : "text"}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors[el.name]}
                      helperText={errors[el.name]?.message as string}
                    />
                  )}
                />
              );
            case "select":
              return (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>{el.label}</InputLabel>
                  <Controller
                    name={el.name}
                    control={control}
                    defaultValue={el.defaultValue || ""}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        fullWidth
                        name={el.name}
                        label={el.label}
                      >
                        {el.options.map(
                          (option: { value: string; label: string }) => (
                            <MenuItem value={option.value}>
                              {option.label}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}
                  />
                </FormControl>
              );
            case "date":
              return (
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <Controller
                    name={el.name}
                    control={control}
                    defaultValue={el.defaultValue ? el.defaultValue : dayjs()}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          label={el.label}
                          minDate={dayjs()}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>
              );
          }
        })}
        <Grid container justifyContent="flex-end">
          {handleClose && (
            <Button
              onClick={() => handleClose()}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              style={{ marginRight: "20px" }}
            >
              Close
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}
