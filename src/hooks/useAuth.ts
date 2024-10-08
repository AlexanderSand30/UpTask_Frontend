import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/AuthApi"

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false
    })
    return { data, isError, isLoading }
}