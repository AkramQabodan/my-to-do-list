"use client";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { EtodoStatus } from "@/stateManagement/auth/Users/usersAtom";
import { removeToDoAtom } from "@/stateManagement/auth/Users/todosActions";
import Tooltip from "@mui/material/Tooltip";
import { useMemo } from "react";

export default function ToDo({
  title,
  description,
  dueDate,
  status,
  index,
}: {
  title: string;
  description: string;
  dueDate: dayjs.Dayjs;
  status: EtodoStatus;
  index: number;
}) {
  const removeToDo = useSetAtom(removeToDoAtom);
  const router = useRouter();
  const formattedDate = dayjs(dueDate).format("MMMM D, YYYY");
  const today = useMemo(() => {
    return new Date();
  }, []);
  const exceededDueDate = new Date(formattedDate) < today;
  const deleteToDoHandler = () => {
    removeToDo(index);
  };
  const editToDoHandler = () => {
    router.push(`to-do-list/${index + 1}`);
  };
  return (
    <Accordion
      sx={{
        width: "100%",
      }}
      className="dark:bg-stone-800 dark:text-white"
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon className="dark:bg-stone-800 dark:text-white" />
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <span className="mr-5 max-w-48 truncate">{title}</span>
        {status === EtodoStatus.pending && (
          <Chip label={EtodoStatus.pending} color="default" />
        )}
        {status === EtodoStatus.doing && (
          <Chip label={EtodoStatus.doing} color="primary" />
        )}
        {status === EtodoStatus.completed && (
          <Chip label={EtodoStatus.completed} color="success" />
        )}
      </AccordionSummary>
      <AccordionDetails>description : {description}</AccordionDetails>
      <AccordionDetails>
        Due Date :{" "}
        {
          <span
            className={`${
              exceededDueDate && status !== EtodoStatus.completed
                ? "text-red-500"
                : ""
            }`}
          >
            {formattedDate}
          </span>
        }
      </AccordionDetails>
      <AccordionDetails
        sx={{
          display: "flex",
        }}
      >
        <Tooltip title="Edit">
          <IconButton
            aria-label="edit"
            size="small"
            sx={{
              marginLeft: "auto",
            }}
            onClick={editToDoHandler}
          >
            <EditIcon fontSize="small" color="info" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={deleteToDoHandler}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Tooltip>
      </AccordionDetails>
    </Accordion>
  );
}
