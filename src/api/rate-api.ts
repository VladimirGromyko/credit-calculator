const today = new Date()
const todayYear = today.getFullYear()
const todayMonth = today.getMonth()
const todayDay = today.getDate()
const todayStr = todayYear.toString() + '-' + todayMonth.toString() + '-' + todayDay.toString()
const apiUrl = `https://www.nbrb.by/api/refinancingrate?ondate=${todayStr}`

export const rateApi = {
    getRate() {
        return fetch(apiUrl)
            .then(response => response.json())
    },
}
