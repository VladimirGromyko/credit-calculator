import React from 'react'
import s from '../components/ResultForm.module.css'
import {creditInfoType} from "../containers/utils/resultCalcFloating";
import {appearanceOfValue} from "../containers/utils/appearanceOfValue";

type ResultFormType = {
    creditInfo: creditInfoType[]
}

export const ResultForm: React.FC<ResultFormType> =
    ({creditInfo}) => {
        let today = new Date()

        const paymentDate = (index: number) => {
            const newDate = new Date()
            newDate.setMonth(today.getMonth() + index)
            if (newDate.getMonth() === 2 && today.getDay() > 28) newDate.setDate(28)
            return newDate.toLocaleDateString()
        }

        const detailForm = () => {
            return (
                <div className={s.resultFormNameTitle}>
                    <div className={s.resultFormNameNumber}># pay ment</div>
                    <div className={s.resultFormName}>Date</div>
                    <div className={s.resultFormInterest}>Interest payment</div>
                    <div className={s.resultFormName}>Principal payment</div>
                    <div className={s.resultFormName}>Total payment for the period</div>
                    <div className={s.resultFormName}>Balance on the loan body</div>
                </div>
            )
        }
        const detailFormBody: JSX.Element[] = creditInfo ? creditInfo.map((el, index) => {

            return (
                <div key={index + 1} className={s.resultFormNameTitle}>
                    <div className={s.resultFormDataNumber}>{index + 1}</div>
                    <div className={s.resultFormData}>{paymentDate((index + 1))}</div>
                    <div className={s.resultFormDataInterest}>
                        <div>{appearanceOfValue(el.percent)[0]}</div>
                        <div className={s.fraction}>{appearanceOfValue(el.percent)[1]}</div>
                    </div>
                    <div className={s.resultFormData}>
                        <div>{appearanceOfValue(el.mainPayment)[0]}</div>
                        <div className={s.fraction}>{appearanceOfValue(el.mainPayment)[1]}</div>
                    </div>
                    <div className={s.resultFormData}>
                        <div>{appearanceOfValue(el.totalPaymentInPeriod)[0]}</div>
                        <div className={s.fraction}>{appearanceOfValue(el.totalPaymentInPeriod)[1]}</div>
                    </div>
                    <div className={s.resultFormData}>
                        <div>{appearanceOfValue(el.amountForEndPeriod)[0]}</div>
                        <div className={s.fraction}>{appearanceOfValue(el.amountForEndPeriod)[1]}</div>
                    </div>
                </div>
            )
        }) : []


        return (
            <div>
                <div className="calculator"><h3>Detailed results</h3>
                    {detailForm()}
                    {detailFormBody}
                </div>

            </div>)
    }