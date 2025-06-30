import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../config/axios.config'
import type { AxiosRequestConfig } from 'axios'

interface IProps {
    queryKey: string[],
    url: string,
    config?: AxiosRequestConfig;
}
const CustomHook = ({ queryKey, url, config }: IProps) => {
    return (
        useQuery({
            queryKey,
            queryFn: async () => {
                const response = await axiosInstance.get(url, config);
                return response.data
            },
            staleTime: 1000 * 60 * 1,
            refetchInterval: 1000 * 60 * 2,
        })
    )
}

export default CustomHook