import React from 'react'
import s from '../components/ResultForm.module.css'

import {creditInfoType} from "../containers/utils/resultCalcFloating";

type ResultFormType = {
    creditInfo: creditInfoType[]
}

export const ResultForm: React.FC<ResultFormType> =
    ({creditInfo}) => {
        let today = new Date()
        /*const stringDate = today && today.toLocaleDateString()*/

        const paymentDate = (index: number) => {
            const newDate = new Date()
            newDate.setMonth(today.getMonth() + index)
            console.log(index)
            if (newDate.getMonth() === 2 && today.getDay() > 28) newDate.setDate(28)
            return newDate.toLocaleDateString()
        }

        const detailForm = () => {
            return (
                <div className={s.resultFormNameTitle}>
                    <div className={s.resultFormNameNumber}># payment</div>
                    <div className={s.resultFormNameNumber}>Date</div>
                    <div className={s.resultFormName}>Interest payment</div>
                    <div className={s.resultFormName}>Principal payment</div>
                    <div className={s.resultFormName}>Total payment for the period</div>
                    <div className={s.resultFormName}>Balance on the loan body</div>
                </div>

            )
        }
        const detailFormBody: any[] = creditInfo ? creditInfo.map((el, index) => {

            return (
                <div key={index + 1} className={s.resultFormNameTitle}>
                    <div className={s.resultFormNameNumber}>{index + 1}</div>
                    <div className={s.resultFormNameNumber}>{paymentDate((index +1))}</div>
                    <div className={s.resultFormName}>{el.percent}</div>
                    <div className={s.resultFormName}>{el.mainPayment}</div>
                    <div className={s.resultFormName}>{el.totalPaymentInPeriod}</div>
                    <div className={s.resultFormName}>{el.amountForEndPeriod}</div>
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