import CreateToDoForm from "@/components/createToDoForm";
import { Button } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditToDoPage({ params }: { params: { id: number } }) {
  return (
    <div className="flex flex-col items-center h-full w-full pt-10 gap-5">
      <CreateToDoForm toDoId={params.id} />
      <Button variant="contained" color="primary">
        <Link href="/to-do-list">Back To List</Link>
      </Button>
    </div>
  );
}
