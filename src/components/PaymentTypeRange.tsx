import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
    setResult: (showResult: boolean) => void
    setAddResult: (showAddResult: boolean) => void
}

const PaymentTypeRange: React.FC<SuperRadioPropsType> = (
    {
        type, name, setResult,
        setAddResult, options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>, o: string) => {
        // onChange && onChange(e)
        onChangeOption && onChangeOption(o)
        setResult && setResult(false)
        setAddResult && setAddResult(false)
    }

    // map options with key
    const mappedOptions: JSX.Element[] = options ? options.map((o, i) => (
        <div key={name + '-' + i} className="calculator-data__radio">
            <input
                type={'radio'}
                                name={name}
                checked={value === o}
                onChange={(e) => onChangeCallback(e, o)}
                tabIndex={4}
            />
            {o}
        </div>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default PaymentTypeRange
