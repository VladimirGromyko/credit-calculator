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

    const mappedOptions: JSX.Element[] = options ? options.map((o, i) => {
        return <option key={restProps.name + '-' + i}
                       value={o}
                       style={{background: '#EEF4FF'}}
        >{+o < 2
            ? `${o} month`
            : +o < 12
                ? `${o} months`
                : +o < 24
                    ? `${+o / 12} year`
                    : `${+o / 12} years`}

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
