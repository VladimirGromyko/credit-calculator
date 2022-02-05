import React, {ChangeEvent, KeyboardEvent} from "react";
import {checkValue} from "../containers/utils/checkValue";

type AddAmountFormType = {
    amount: string
    changeFunction: (Amount: string) => void
    setResult: (value: boolean) => void
    onClickAmountHandler: () => void
    onKeyPressTaskHandler: (e: KeyboardEvent<HTMLInputElement>) => void
    tab: number
}
export const AddAmountForm = React.memo(({
                                             amount, changeFunction, tab,
                                             setResult, onClickAmountHandler,
                                             onKeyPressTaskHandler,
                                         }: AddAmountFormType) => {

    const changeAmountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setResult(false)
        let value = e.currentTarget.value.trim();
            checkValue(value) && changeFunction(value)
    }

    return (<>
        <input className="calculator-data"
               value={amount}
               onChange={changeAmountHandler}
               onKeyPress={onKeyPressTaskHandler}
               onClick={onClickAmountHandler}
               tabIndex={tab}
        />
    </>)
})
