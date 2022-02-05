import PaymentTypeRange from "../../components/PaymentTypeRange";
import {KeyboardEvent, useState} from "react";
import SelectPaymentTerms from "../../components/SelectPaymentTerms";
import {ResultWrapperForm} from "../../components/ResultWrapperForm";
import SuperButton from "../../components/common/SuperButton";
import {rateApi} from "../../api/rate-api";
import {AddAmountForm} from "../../components/AddAmountForm";

export const FIXED_PAYMENT = 'fixed payment (annuity)'
export const FLOATING_PAYMENT = 'floating payment (declining balance)'

const arr = [FIXED_PAYMENT, FLOATING_PAYMENT]
export const creditTerm: string[] = ["1", "3", "6", "12", "24", "60"]
let initialRate = "5"

export const LoanParameters = () => {

    const [creditAmount, onChangeAmount] = useState<string>("10000")
    const [valueTerm, onChangeTerm] = useState<string>(creditTerm[3])
    const [paymentTypeByAmount, onChangeOption] = useState<string>(arr[0])
    const [showResult, setResult] = useState<boolean>(false)
    const [showAddResult, setAddResult] = useState<boolean>(false)
    const [rate, setRate] = useState<string>(initialRate)
    const [refinancingRate, setRefinancingRate] = useState<number>(0)
    const [isQuery, setQuery] = useState<boolean>(true)
    const [errorInput, setErrorInput] = useState<string | boolean>(false)

    isQuery && rateApi.getRate()
        .then((res) => {
                setRate(String((+initialRate) + res[0].Value))
                setRefinancingRate(res[0].Value)
                setQuery(false)
            }
        )
    const onCalculate = () => {
        if ((!!+creditAmount) && (!!+rate)) setResult(true)
        if ((!+creditAmount) || (!+rate)) {
            setErrorInput('Credit input parameters are incorrect!!!')
        }
    }
    const onClickAmountHandler = () => {
        setResult(false)
        setAddResult(false)
        setErrorInput(false)
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onCalculate()
        }
    }

    return (
        <div>
            <div className="calculator"><h3>Credit input parameters</h3>
                <div className="calculator-record">
                    <div className="calculator-names">Amount of credit (BYN):</div>
                    <AddAmountForm amount={creditAmount}
                                   changeFunction={onChangeAmount}
                                   setResult={setResult}
                                   onClickAmountHandler={onClickAmountHandler}
                                   onKeyPressTaskHandler={onKeyPressTaskHandler}
                                   tab={1} />

                </div>
                <div className="calculator-record">
                    <div className="calculator-names">
                        Credit term:
                    </div>
                    <SelectPaymentTerms
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
                    <AddAmountForm amount={rate}
                                   changeFunction={setRate}
                                   setResult={setResult}
                                   onClickAmountHandler={onClickAmountHandler}
                                   onKeyPressTaskHandler={onKeyPressTaskHandler}
                                   tab={3} />
                    <div className="calculator-names__reference">* National Bank refinancing rate {refinancingRate}
                    </div>
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
                    />
                </div>
                <div className="calculator-action__record">
                    <div className="calculator-action button">
                        <SuperButton onClick={onCalculate}>Calculate payments</SuperButton>
                    </div>
                    <div className="calculator-action__error">
                        {(errorInput !== false) && <div>{errorInput}</div>}</div>
                </div>
            </div>
            {
                (showResult) && <ResultWrapperForm
                    creditAmount={creditAmount}
                    creditTerm={valueTerm}
                    rate={+rate}
                    paymentTypeByAmount={paymentTypeByAmount}
                    showAddResult={showAddResult}
                    setAddResult={setAddResult}
                />
            }
        </div>
    )
}