import React from 'react'
import {ResultForm} from "./ResultForm";
import {resultCalcFloating} from "../containers/utils/resultCalcFloating";
import SuperButton from "./common/SuperButton";
import {FLOATING_PAYMENT} from "../containers/LoanParameters/LoanParameters";
import {appearanceOfValue} from "../containers/utils/appearanceOfValue";
import {precisionRound} from "../containers/utils/precisionRound";

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
                        <div className="calculator-data__result">
                            <div>{appearanceOfValue(+creditAmount)[0]}</div>
                            <div className="fraction">{appearanceOfValue(+creditAmount)[1]}</div>
                        </div>
                    </div>
                    <div className="calculator-record">
                        <div className="calculator-names">Credit term (months):</div>
                        <div className="calculator-data__result">{creditTerm}</div>
                    </div>

                    <div className="calculator-record">
                        <div className="calculator-names">Monthly payment (BYN):</div>
                        {paymentTypeByAmount === FLOATING_PAYMENT ?
                            <>
                                <div className="calculator-data__result">
                                    <div className='result__div'>max:</div>
                                    <div className='result__div'>
                                        <div>{appearanceOfValue(creditInfo[0].totalPaymentInPeriod)[0]}</div>
                                        <div className="fraction">
                                            {appearanceOfValue(creditInfo[0].totalPaymentInPeriod)[1]}
                                        </div>
                                    </div>

                                </div>
                                <div className="calculator-data__result">
                                    <div className='result__div'>min:</div>
                                    <div className='result__div'>
                                        <div>{appearanceOfValue(creditInfo[period].totalPaymentInPeriod)[0]}</div>
                                        <div className="fraction">
                                            {appearanceOfValue(creditInfo[period].totalPaymentInPeriod)[1]}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div className="calculator-data__result">
                                <div>{appearanceOfValue(creditInfo[0].totalPaymentInPeriod)[0]}</div>
                                <div className="fraction">
                                    {appearanceOfValue(creditInfo[0].totalPaymentInPeriod)[1]}
                                </div>
                            </div>
                        }
                    </div>

                    <div className="calculator-record">
                        <div className="calculator-names">Total credit payments (BYN):</div>
                        <div className="calculator-data__result">
                            <div>{appearanceOfValue(creditInfo[period].totalCumulativePayment)[0]}</div>
                            <div className="fraction">
                                {appearanceOfValue(creditInfo[period].totalCumulativePayment)[1]}
                            </div>
                        </div>
                    </div>

                    <div className="calculator-record">
                        <div className="calculator-names">Total repayments (BYN):</div>
                        <div className="calculator-data__result">
                            <div>{appearanceOfValue(precisionRound((creditInfo[period].totalCumulativePayment-(+creditAmount)),2))[0]}</div>
                            <div className="fraction">
                                {appearanceOfValue(precisionRound((creditInfo[period].totalCumulativePayment-(+creditAmount)),2))[1]}
                            </div>
                        </div>
                    </div>

                    <div className="calculator-action">
                        <SuperButton onClick={onClickHandler}>payment details</SuperButton>
                    </div>
                </div>
                {
                    showAddResult && <ResultForm creditInfo={creditInfo}/>
                }
            </div>
        )
    }