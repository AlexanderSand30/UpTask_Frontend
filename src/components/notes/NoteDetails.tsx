import { useMemo } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Note } from "../../types"
import { formatDate } from "../../utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

type NoteDetailsProps = {
    note: Note
}
export default function NoteDetails({ note }: NoteDetailsProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['taskView', taskId] })
            toast.success(data)
        }
    })

    if (isLoading) return 'Cargando...'

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por:
                    <span className="font-bold ml-1">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                >Eliminar</button>
            )}
        </div>
    )
}
