import React from 'react'
import {ResultForm} from "./ResultForm";
import {resultCalcFloating} from "../containers/utils/resultCalcFloating";
import SuperButton from "./common/SuperButton";
import {FLOATING_PAYMENT} from "../containers/LoanParameters/LoanParameters";

type ResultFormType = {
    creditAmount: string
    creditTerm: string
    rate: number
    paymentTypeByAmount: string
    showAddResult: boolean
    setAddResult: (showAddResult: boolean) => void
}

export const ResultWrapperForm: React.FC<ResultFormType> =
    ({
         creditAmount, creditTerm,
         rate, paymentTypeByAmount,
         showAddResult, setAddResult
     }) => {

        const creditInfo = resultCalcFloating({creditAmount, creditTerm, rate, paymentTypeByAmount})
        const period = creditInfo.length - 1

        const onClickHandler = () => {
            setAddResult(true)
        }
        if (!isFinite(+creditAmount)) return <></>;
        return (
            <div>
                <div className="calculator"><h3>Main results</h3>
                    <div className="calculator-record">
                        <div className="calculator-names">Amount of credit (BYN):</div>
                        <div className="calculator-data__result">{creditAmount}</div>
                    </div>
                    <div className="calculator-record">
                        <div className="calculator-names">Credit term (months):</div>
                        <div className="calculator-data__result">{creditTerm}</div>
                    </div>

                    <div className="calculator-record">
                        <div className="calculator-names">Monthly payment (BYN):</div>
                        {paymentTypeByAmount===FLOATING_PAYMENT ?
                        <>
                            <div className="calculator-data__result">max: {creditInfo[0].totalPaymentInPeriod}</div>
                            <div
                                className="calculator-data__result">min: {creditInfo[period].totalPaymentInPeriod}</div>
                        </>
                            :
                        <div className="calculator-data__result">{creditInfo[0].totalPaymentInPeriod}</div>
                        }
                    </div>

                    <div className="calculator-record">
                        <div className="calculator-names">Total credit payments (BYN):</div>
                        <div
                            className="calculator-data__result">{(creditInfo[period].totalCumulativePayment).toFixed(2)}</div>
                    </div>

                    <div className="calculator-record">
                        <div className="calculator-names">Total repayments (BYN):</div>
                        <div className="calculator-data__result">{creditInfo[period].totalCumulativeOverpayment}</div>
                    </div>

                    <div className="calculator-action">
                        {/*<button onClick={onClickHandler}></button>*/}
                        <SuperButton onClick={onClickHandler}>payment details</SuperButton>
                    </div>


                </div>


                {
                    showAddResult && <ResultForm creditInfo={creditInfo}/>
                }
            </div>
        )
    }