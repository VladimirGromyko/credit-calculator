import {precisionRound} from "./precisionRound";
import {FIXED_PAYMENT, FLOATING_PAYMENT} from "../LoanParameters/LoanParameters";

export type creditInfoType = {
    amountForStartPeriod: number
    amountForEndPeriod: number
    mainPayment: number
    percent: number
    totalPaymentInPeriod: number
    totalCumulativePayment: number
    totalCumulativeOverpayment: number

}
export type resultCalcFloatingType = {
    creditAmount: string,
    creditTerm: string,
    rate: number,
    paymentTypeByAmount: string
}

export const resultCalcFloating =
    ({creditAmount, creditTerm, paymentTypeByAmount, rate}: resultCalcFloatingType) => {

        let creditInfo: creditInfoType[] = []

        // calculation of floating payments
        if (paymentTypeByAmount === FLOATING_PAYMENT) {

            creditInfo = [
                {
                    amountForStartPeriod: precisionRound((+creditAmount), 2),
                    amountForEndPeriod: precisionRound((+creditAmount - (+creditAmount / +creditTerm)), 2),
                    mainPayment: precisionRound((+creditAmount / +creditTerm), 2),
                    percent: precisionRound(((+creditAmount) * (rate)) / (100 * 12), 2),
                    totalPaymentInPeriod: precisionRound((precisionRound((+creditAmount / +creditTerm), 2) +
                        precisionRound((((+creditAmount) * (rate)) / (100 * 12)), 2)), 2),
                    totalCumulativePayment: precisionRound((precisionRound((+creditAmount / +creditTerm), 2) +
                        precisionRound((((+creditAmount) * (rate)) / (100 * 12)), 2)), 2),
                    totalCumulativeOverpayment: precisionRound((((+creditAmount) * (+rate)) / (100 * 12)), 2),
                }
            ]

            for (let i = 1; i < +creditTerm; i++) {
                let amountForStartPeriod = precisionRound((creditInfo[i - 1].amountForEndPeriod), 2)
                let amountForEndPeriod: number
                if (i === +creditTerm - 1) {
                    amountForEndPeriod = precisionRound((0), 2)
                } else amountForEndPeriod = precisionRound((amountForStartPeriod - creditInfo[0].mainPayment), 2)
                let mainPayment = precisionRound((creditInfo[0].mainPayment), 2)
                let percent = precisionRound((((amountForStartPeriod) * (rate)) / (100 * 12)), 2)
                let totalPaymentInPeriod = precisionRound((mainPayment + percent), 2)
                let totalCumulativePayment = precisionRound((precisionRound((creditInfo[i - 1].totalCumulativePayment),
                    2) + precisionRound(totalPaymentInPeriod, 2)), 2)
                let totalCumulativeOverpayment = precisionRound((precisionRound((creditInfo[i - 1].totalCumulativeOverpayment),
                    2) + precisionRound(percent, 2)), 2)

                creditInfo.push(
                    {
                        amountForStartPeriod: amountForStartPeriod,
                        amountForEndPeriod: amountForEndPeriod,
                        mainPayment: mainPayment,
                        percent: percent,
                        totalPaymentInPeriod: totalPaymentInPeriod,
                        totalCumulativePayment: totalCumulativePayment,
                        totalCumulativeOverpayment: totalCumulativeOverpayment,
                    }
                )
            }
        }

        // calculation of fixed payments
        if (paymentTypeByAmount === FIXED_PAYMENT) {
            let annRatio = precisionRound(((rate / (100 * 12) * Math.pow((1 + (rate / (100 * 12))), (+creditTerm))) /
                (Math.pow((1 + (rate / (100 * 12))), (+creditTerm)) - 1)), 7)

            creditInfo = [
                {
                    amountForStartPeriod: precisionRound((+creditAmount), 2),
                    mainPayment: precisionRound(precisionRound((+creditAmount * annRatio), 2) -
                        precisionRound(((+creditAmount) * (rate)) / (100 * 12), 2), 2),
                    amountForEndPeriod: precisionRound((precisionRound((+creditAmount), 2) -
                        precisionRound(precisionRound((+creditAmount * annRatio), 2) -
                            precisionRound(((+creditAmount) * (rate)) /
                                (100 * 12), 2), 2)), 2),
                    percent: precisionRound(((+creditAmount) * (rate)) / (100 * 12), 2),
                    totalPaymentInPeriod: precisionRound((+creditAmount * annRatio), 2),
                    totalCumulativePayment: precisionRound((+creditAmount * annRatio), 2),
                    totalCumulativeOverpayment: precisionRound(((+creditAmount) * (rate)) / (100 * 12), 2),
                }
            ]
            for (let i = 1; i < +creditTerm; i++) {
                let amountForStartPeriod = precisionRound((creditInfo[i - 1].amountForEndPeriod), 2)
                let amountForEndPeriod: number

                let percent = precisionRound((((creditInfo[i - 1].amountForEndPeriod) * (rate)) / (100 * 12)), 2)
                let totalPaymentInPeriod = precisionRound((creditInfo[0].totalPaymentInPeriod), 2)
                let mainPayment = precisionRound((totalPaymentInPeriod - percent), 2)

                if (i === +creditTerm - 1) {
                    amountForEndPeriod = precisionRound((0), 2)
                } else amountForEndPeriod = precisionRound((amountForStartPeriod - mainPayment), 2)

                let totalCumulativePayment = precisionRound((precisionRound((creditInfo[i - 1].totalCumulativePayment),
                    2) + precisionRound(totalPaymentInPeriod, 2)), 2)

                let totalCumulativeOverpayment = precisionRound((precisionRound((creditInfo[i - 1].totalCumulativeOverpayment),
                    2) + precisionRound(percent, 2)), 2)

                creditInfo.push(
                    {
                        amountForStartPeriod: amountForStartPeriod,
                        amountForEndPeriod: amountForEndPeriod,
                        mainPayment: mainPayment,
                        percent: percent,
                        totalPaymentInPeriod: totalPaymentInPeriod,
                        totalCumulativePayment: totalCumulativePayment,
                        totalCumulativeOverpayment: totalCumulativeOverpayment,
                    }
                )
            }

        }
        return creditInfo
    }
