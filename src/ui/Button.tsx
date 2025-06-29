import React from 'react'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    type: "submit" | "reset" | "button";
    disabled?: boolean
}
const Button = ({ children, className, type, disabled, ...rest }: IProps) => {
    return (
        <button
            className={`border px-3 py-2 rounded bg-green-600 text-white active:scale-95 ${className}`}
            type={type}
            disabled={disabled}
            {...rest}
        >{children}</button>
    )
}

export default Button