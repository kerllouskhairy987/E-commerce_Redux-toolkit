import { MdError } from "react-icons/md";
import { Link, useLocation } from "react-router";
import Button from "../ui/Button";
interface IProps {
    statusCode: number;
    title?: string;
}
const PageNotFound = ({ statusCode = 500, title = "INTERNAL SERVER ERROR" }: IProps) => {
    const { pathname } = useLocation();
    
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-5">
            <h2 className="text-9xl text-red-600"> <MdError /> </h2>
            <h3 className="font-semibold text-2xl">{statusCode} - {title}</h3>
            <p className="font-semibold text-xl">Oops something went wrong</p>
            <div className="flex gap-5">
                <Link
                    to={"/"}
                    reloadDocument
                >
                    <Button type="button">Home</Button>
                </Link>
                <Link
                    to={pathname}
                    reloadDocument
                >
                    <Button type="button">Refresh</Button>
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound