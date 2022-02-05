import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeTerm?: (option: string) => void
    valueTerm?: string
    setResult: (showResult: boolean) => void
    setAddResult: (showAddResult: boolean) => void
}

const SelectPaymentTerms: React.FC<SuperSelectPropsType> = (
    {
        options, valueTerm,
        onChange, onChangeTerm,
        setResult, setAddResult,
        ...restProps
    }
) => {

    const termOptions = (term: string) => {
        let ternValue = Number(term)
        if (ternValue===1) {return `${ternValue} month`}
        if (ternValue>1 && ternValue<12) {return `${ternValue} months`}
        if (ternValue===12) {return `${ternValue/12} year`}
        if (ternValue>12) {return `${ternValue/12} years`}
    }

    const mappedOptions: JSX.Element[] = options ? options.map((o, i) => {
        return <option key={restProps.name + '-' + i}
                       value={o}
                       style={{background: '#EEF4FF'}}
        > {termOptions(o)}
        </option>
    }) : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        setResult && setResult(false)
        setAddResult && setAddResult(false)
        onChangeTerm && onChangeTerm(e.currentTarget.value)
    }

    return (
        <select
            value={valueTerm}
            onChange={onChangeCallback} {...restProps}
            tabIndex={2}
            onClick={() => setResult(false)}
        >
            {mappedOptions}
        </select>
    )
}
export default SelectPaymentTerms
