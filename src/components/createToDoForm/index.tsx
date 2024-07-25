"use client";
import { Todo, todoStatus } from "@/stateManagement/atom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import dayjs from "dayjs";
export default function CreateToDoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Todo>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: dayjs(),
      status: todoStatus.pending,
    },
  });

  const onSubmit: SubmitHandler<Todo> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-red-300 border-2 rounded p-5 flex flex-col gap-5 drop-shadow shadow"
    >
      <TextField
        className="w-full"
        id="title"
        {...register("title", { required: "please enter title" })}
        label="title"
        variant="outlined"
        error={!!errors.title}
        helperText={errors.title?.message}
        size="small"
      />
      <TextField
        className="w-full"
        id="description"
        {...register("description", { required: "please enter description" })}
        label="description"
        variant="outlined"
        multiline
        maxRows={4}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Controller
        control={control}
        name="dueDate"
        rules={{ required: "please select a date" }}
        render={({ field }) => {
          return (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  label="Basic date picker"
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errors.dueDate?.message,
                      error: !!errors.dueDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </>
          );
        }}
      />
      <Controller
        control={control}
        name="status"
        rules={{ required: "please select a status" }}
        render={({ field }) => (
          <ToggleButtonGroup
            exclusive
            value={field.value}
            onChange={(event, newValue) => {
              field.onChange(newValue);
            }}
            aria-label="status"
          >
            <ToggleButton
              value={todoStatus.pending}
              aria-label="pending"
              color="info"
              sx={{ minWidth: "115px" }}
            >
              Pending
            </ToggleButton>
            <ToggleButton
              value={todoStatus.doing}
              aria-label="doing"
              color="warning"
              sx={{ minWidth: "115px" }}
            >
              Doing
            </ToggleButton>
            <ToggleButton
              value={todoStatus.completed}
              aria-label="completed"
              color="success"
              sx={{ minWidth: "115px" }}
            >
              Completed
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      />
      <Button variant="contained" type="submit" color="success">
        Save
      </Button>
    </form>
  );
}
