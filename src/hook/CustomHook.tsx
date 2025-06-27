import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../config/axios.config'

interface IProps {
    queryKey: string[],
    url: string,
    // config: 
}
const CustomHook = ({ queryKey, url }: IProps) => {
    return (
        useQuery({
            queryKey,
            queryFn: async () => {
                const response = await axiosInstance.get(url)
                return response.data
            }
        })
    )
}

export default CustomHook