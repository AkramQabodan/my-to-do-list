"use client";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import dayjs from "dayjs";
import {
  EtodoStatus,
  processedTodosAtom,
  Todo,
} from "@/stateManagement/todos/todosAtom";
import { atom, useAtomValue, useSetAtom } from "jotai";
import {
  addToDoAtom,
  updateToDoAtom,
} from "@/stateManagement/todos/todosActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function CreateToDoForm({ toDoId }: { toDoId?: number }) {
  const addToDo = useSetAtom(addToDoAtom);
  const updateToDo = useSetAtom(updateToDoAtom);
  const todos = useAtomValue(processedTodosAtom);
  const initiativeValues = toDoId
    ? todos[toDoId - 1]
    : {
        title: "",
        description: "",
        dueDate: dayjs(),
        status: EtodoStatus.pending,
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<Todo>({
    defaultValues: initiativeValues,
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Todo> = (data) => {
    if (toDoId) {
      updateToDo(toDoId - 1, data);
    } else {
      addToDo(data);
    }
    router.push("/to-do-list");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" border-2 rounded p-5 flex flex-col gap-5 drop-shadow shadow"
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
                  value={field.value}
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
              value={EtodoStatus.pending}
              aria-label="pending"
              color="standard"
              sx={{ minWidth: "115px" }}
            >
              Pending
            </ToggleButton>
            <ToggleButton
              value={EtodoStatus.doing}
              aria-label="doing"
              color="primary"
              sx={{ minWidth: "115px" }}
            >
              Doing
            </ToggleButton>
            <ToggleButton
              value={EtodoStatus.completed}
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
        {toDoId ? "Update" : "Save"}
      </Button>
    </form>
  );
}
