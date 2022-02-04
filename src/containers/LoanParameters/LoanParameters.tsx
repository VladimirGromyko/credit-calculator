import PaymentTypeRange from "../../components/PaymentTypeRange";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import SelectPaymentTerms from "../../components/SelectPaymentTerms";

import {ResultWrapperForm} from "../../components/ResultWrapperForm";
import {checkValue} from "../utils/checkValue";
import SuperButton from "../../components/common/SuperButton";
import {rateApi} from "../../api/rate-api";


export const FIXED_PAYMENT = 'fixed payment (annuity)'
export const FLOATING_PAYMENT = 'floating payment (declining balance)'

const arr = [FIXED_PAYMENT, FLOATING_PAYMENT]
export const creditTerm: string[] = ["1", "3", "6", "12", "24", "60"]
let initialRate = "5"


export const LoanParameters = () => {


    const [creditAmount, onChangeAmount] = useState<string>("1000")
    const [valueTerm, onChangeTerm] = useState<string>(creditTerm[3])
    const [paymentTypeByAmount, onChangeOption] = useState<string>(arr[0])
    const [showResult, setResult] = useState<boolean>(false)
    const [showAddResult, setAddResult] = useState<boolean>(false)
    const [rate, setRate] = useState<string>(initialRate)
    const [refinancingRate, setRefinancingRate] = useState<number>(0)
    const [isQuery, setQuery] = useState<boolean>(true)

    isQuery && rateApi.getRate()
        .then((res) => {

                isQuery && setRate(String((+initialRate) + res[0].Value))
                isQuery && setRefinancingRate(res[0].Value)
                setQuery(false)
            }
        )

    const changeCreditAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setResult(false)
        let value = e.currentTarget.value;
        checkValue(value) && onChangeAmount(value)
    }

    const onCalculate = () => {
        setResult(true)
    }
    const onClickAmountHandler = () => {
        setResult(false)
        setAddResult(false)
    }
    const setRateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setResult(false)

        let value = e.currentTarget.value;
        checkValue(value) && setRate(value)
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {
            onCalculate()
        }
    }

    return (
        <div>
            <div className="calculator"><h3>Сredit input parameters</h3>
                <div className="calculator-record">
                    <div className="calculator-names">Amount of credit (BYN):</div>
                    <input className="calculator-data"
                           value={creditAmount}
                           onChange={changeCreditAmount}
                           onKeyPress={onKeyPressTaskHandler}
                           data-currency="amount"
                           tabIndex={1}
                           onClick={onClickAmountHandler}

                    />
                </div>
                <div className="calculator-record">
                    <div className="calculator-names">
                        Credit term:
                    </div>
                    <SelectPaymentTerms
                        /*data-currency="term"*/
                        className="calculator-data__select"
                        options={creditTerm}
                        valueTerm={valueTerm}
                        onChangeTerm={onChangeTerm}
                        setResult={setResult}
                        setAddResult={setAddResult}
                    />
                </div>
                <div className="calculator-record">
                    <div className="calculator-names">
                        Interest rate:
                    </div>
                    <input className="calculator-data"
                           value={rate}
                           onChange={setRateHandler}
                           onKeyPress={onKeyPressTaskHandler}
                           onClick={onClickAmountHandler}
                           data-currency="rate"
                           tabIndex={3}
                    />
                    <div className="calculator-names__reference">* National Bank refinancing rate {refinancingRate}</div>
                </div>

                <div className="calculator-record__radio">
                    <div className="calculator-names">
                        Payment types:
                    </div>
                    <PaymentTypeRange
                        name={'radio'}
                        options={arr}
                        value={paymentTypeByAmount}
                        onChangeOption={onChangeOption}
                        setResult={setResult}
                        setAddResult={setAddResult}
                        data-currency="rate"
                    />
                </div>
                <div/>

                <div className="calculator-action">
                    <SuperButton onClick={onCalculate}>Calculate payments</SuperButton>

                    {/*                    <button data-action="сalculate-payments" onClick={onCalculate}>
                        Calculate payments
                    </button>*/}

                </div>
            </div>
            {showResult && <ResultWrapperForm
                creditAmount={creditAmount}
                creditTerm={valueTerm}
                rate={+rate}
                paymentTypeByAmount={paymentTypeByAmount}
                showAddResult={showAddResult}
                setAddResult={setAddResult}

            />}
        </div>
    )
}