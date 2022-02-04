import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    dis?: boolean
}
const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,dis,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
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
