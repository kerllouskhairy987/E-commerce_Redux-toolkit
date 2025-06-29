interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder: string;
    width?: "fit" | "full";
    className?: string
}
const Input = ({ type, placeholder, width = "fit", className, ...rest }: IProps) => {
    return (
        <input type={type} placeholder={placeholder}
            className={`border px-3 py-2 rounded focus:outline-none ${className} w-${width}} `}
            {...rest}
        />
    )
}

export default Input