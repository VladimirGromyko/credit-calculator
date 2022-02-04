import {resultCalcFloating, resultCalcFloatingType} from "./resultCalcFloating";
import {FIXED_PAYMENT, FLOATING_PAYMENT} from "../LoanParameters/LoanParameters";

let initialDataFloating: resultCalcFloatingType

beforeEach(() => {

    initialDataFloating = {
        creditAmount: '3000',
        creditTerm: '24',
        rate: 5,
        paymentTypeByAmount: FLOATING_PAYMENT
    }

})

test('correct amount of Total Cumulative Payment', () => {
    const result = resultCalcFloating(initialDataFloating)


    expect(result[22].totalCumulativePayment).toBe(3030.74);
    expect(result[23].totalCumulativePayment).toBe(3156.26);
});

let initialDataFixed: resultCalcFloatingType

beforeEach(() => {

    initialDataFixed = {
        creditAmount: '100000',
        creditTerm: '60',
        rate: 9,
        paymentTypeByAmount: FIXED_PAYMENT
    }
})

test('correct amount of Percent and Main Payment', () => {
    const result = resultCalcFloating(initialDataFixed)

    expect(result[58].percent).toBe(30.79);
    expect(result[59].mainPayment).toBe(2060.39);
});
