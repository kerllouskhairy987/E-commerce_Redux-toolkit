import Button from "../ui/Button"

interface IProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number
}

const Pagination = ({ page, setPage, totalPages }: IProps) => {
    return (
        <div className="container mx-auto px-2 mt-5 text-center">
            <span>Page {page} from {totalPages}</span>
            <div className="mt-2 flex gap-2 justify-center items-center">
                <Button
                    type="button"
                    className={`bg-green-500 w-28 ${page === 1 ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1 ? true : false}
                >
                    Previous
                </Button>

                <Button
                    type="button"
                    className={`bg-green-500 w-28 ${page === totalPages ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                    onClick={() => setPage((prev) => Math.min(prev + 1, 20))}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default Pagination
