import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    dis?: boolean
}
const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,dis,
        ...restProps
    }
) => {
    const finalClassName = `${red ? s.red : s.default && dis ? s.dis : s.default} ${className}`
    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}
export default SuperButton
