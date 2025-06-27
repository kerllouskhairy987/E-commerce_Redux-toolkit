import React from 'react'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    type: "submit" | "reset" | "button";
}
const Button = ({ children, className, type, ...rest }: IProps) => {
    return (
        <button
            className={`border px-3 py-2 rounded cursor-pointer bg-green-600 text-white active:scale-95 ${className}`} 
            type={type}
            {...rest}
        >{children}</button>
    )
}

export default Button