import { Task } from "../../types";
import AddNoteForm from "./AddNoteForm";
import NoteDetails from "./NoteDetails";

type NotePanelProps = {
    notes: Task['notes']
}
export default function NotePanel({ notes }: NotePanelProps) {
    return (
        <>
            <AddNoteForm />
            <div className="divide-y divide-gray-100 mt-10">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-slate-600 my-5">Notas:</p>
                        {notes.map(note => <NoteDetails key={note._id} note={note} />)}
                    </>
                ) : (
                    <p className="text-gray-500 text-center pt-3">No hay Notas</p>
                )}
            </div>
        </>
    )
}
