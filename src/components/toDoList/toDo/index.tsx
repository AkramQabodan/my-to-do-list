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
import { EtodoStatus } from "@/stateManagement/todos/todosAtom";
import { useSetAtom } from "jotai";
import { removeToDoAtom } from "@/stateManagement/todos/todosActions";
import { useRouter } from "next/navigation";

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
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
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
      <AccordionDetails>{description}</AccordionDetails>
      <AccordionDetails>{formattedDate}</AccordionDetails>
      <AccordionDetails
        sx={{
          display: "flex",
        }}
      >
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
        <IconButton
          aria-label="delete"
          size="small"
          onClick={deleteToDoHandler}
        >
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
}
