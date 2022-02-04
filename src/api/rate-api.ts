const today = new Date()
const todayYear = today.getFullYear()
const todayMonth = today.getMonth()
const todayDay = today.getDay()
const todayStr=todayYear.toString()+'-'+todayMonth.toString()+'-'+todayDay
const apiUrl= `https://www.nbrb.by/api/refinancingrate?ondate=${todayStr}`

export const rateApi = {
    getRate() {
        return fetch(apiUrl)
            .then(response => response.json())
    },
}

/*export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "08f8988c-36d5-478a-8bca-6bc3626a17f4"
    }
})*/
