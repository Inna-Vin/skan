import { ACTIONS } from "./action";


const initialState = {
    token: '',
    expire: '',
    isAuth: false,
    usedCompanyCount: '',
    companyLimit: '',
    histograms: {
        totalDocuments: {},
        riskFactors: {}
    },
    objectsearch: {
        items: {}
    },
    documents: {
        items: {}
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.LOG_IN:
            return {
                ...state, 
                token: action.token,
                expire: action.expire,
                isAuth: true
            }
        case ACTIONS.LOG_OUT:
            localStorage.removeItem('token')
            localStorage.removeItem('expire')
            localStorage.removeItem('valuesRequest')
            return {
                ...state,
                token: '',
                expire: '',
                isAuth: false
            }
        case ACTIONS.GET_INFO:
            return{
                ...state,
                usedCompanyCount: action.usedCompanyCount,
                companyLimit: action.companyLimit,
            }
        case ACTIONS.HISTOGRAMS:
            return {
                ...state, histograms: {
                    ...state.histograms,
                    totalDocuments: action.totalDocuments,
                    riskFactors: action.riskFactors
                }
                
            }
        case ACTIONS.OBJECTSEARCH:
            return {
                ...state, objectsearch: {
                    ...state.objectsearch,
                    items: action.items
                }
            }
        case ACTIONS.DOCUMENTS:
            return {
                ...state, documents: {
                    ...state.documents,
                    items: action.items
                }
            }
        default: 
            return state
    }
}
export default reducer;

// export const logInRequest = (values) => {
//     return function (dispatch) {
//         fetch ('https://gateway.scan-interfax.ru/api/v1/account/login', {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//                 'Accept': 'application/json',
//             },
//             body: JSON.stringify(values)
//         })
//         .then(response => {
//             return response.json()
//         })
//         .then (data => {
//             console.log(data)
//             if (data.accessToken) {
//             localStorage.setItem('token', JSON.stringify(data.accessToken));
//             localStorage.setItem('expire', JSON.stringify(data.expire))
//             window.location.reload()
//             } else {
//                 alert('Ошибка при входе')
//             }
//             dispatch(logIn(data.accessToken, data.expire))
//         })
//     }
// }

// export const histogramsRequest = (userToken, valuesRequest) => {
//     return function (dispatch) {
//         fetch ('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${userToken}`
//             },
//             body: JSON.stringify ({
//                 "issueDateInterval": {
//                   "startDate": valuesRequest.startDate,
//                   "endDate": valuesRequest.endDate
//                 },
//                 "searchContext": {
//                   "targetSearchEntitiesContext": {
//                     "targetSearchEntities": [
//                       {
//                         "type": "company",
//                         "sparkId": null,
//                         "entityId": null,
//                         "inn": +valuesRequest.inn,
//                         "maxFullness": valuesRequest.maxFullness,
//                         "inBusinessNews": null
//                       }
//                     ],
//                     "onlyMainRole": valuesRequest.onlyMainRole,
//                     "tonality": valuesRequest.tonality,
//                     "onlyWithRiskFactors": valuesRequest.onlyMainRole,
//                     "riskFactors": {
//                       "and": [],
//                       "or": [],
//                       "not": []
//                     },
//                     "themes": {
//                       "and": [],
//                       "or": [],
//                       "not": []
//                     }
//                   },
//                   "themesFilter": {
//                     "and": [],
//                     "or": [],
//                     "not": []
//                   }
//                 },
//                 "searchArea": {
//                   "includedSources": [],
//                   "excludedSources": [],
//                   "includedSourceGroups": [],
//                   "excludedSourceGroups": []
//                 },
//                 "attributeFilters": {
//                   "excludeTechNews": valuesRequest.excludeTechNews,
//                   "excludeAnnouncements": valuesRequest.excludeAnnouncements,
//                   "excludeDigests": valuesRequest.excludeDigests
//                 },
//                 "similarMode": "duplicates",
//                 "limit": +valuesRequest.limit,
//                 "sortType": "sourceInfluence",
//                 "sortDirectionType": "desc",
//                 "intervalType": "month",
//                 "histogramTypes": [
//                   "totalDocuments",
//                   "riskFactors"
//                 ]
//               })
//         })
//         .then (response => {
//             return response.json()
//         })
//         .then (data => {
//             console.log(data)
//             dispatch(histograms(data.data[0].data, data.data[1].data))
//             //navigate('/response', {replace: true})
//         })
//         dispatch(objectsearchRequest(userToken, valuesRequest))
//     } 
// }

// export const objectsearchRequest = (userToken, valuesRequest) => {
//     return function (dispatch) {
//         fetch ('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${userToken}`
//             },
//             body: JSON.stringify ({
//                 "issueDateInterval": {
//                   "startDate": valuesRequest.startDate,
//                   "endDate": valuesRequest.endDate
//                 },
//                 "searchContext": {
//                   "targetSearchEntitiesContext": {
//                     "targetSearchEntities": [
//                       {
//                         "type": "company",
//                         "sparkId": null,
//                         "entityId": null,
//                         "inn": +valuesRequest.inn,
//                         "maxFullness": valuesRequest.maxFullness,
//                         "inBusinessNews": null
//                       }
//                     ],
//                     "onlyMainRole": valuesRequest.onlyMainRole,
//                     "tonality": valuesRequest.tonality,
//                     "onlyWithRiskFactors": valuesRequest.onlyMainRole,
//                     "riskFactors": {
//                       "and": [],
//                       "or": [],
//                       "not": []
//                     },
//                     "themes": {
//                       "and": [],
//                       "or": [],
//                       "not": []
//                     }
//                   },
//                   "themesFilter": {
//                     "and": [],
//                     "or": [],
//                     "not": []
//                   }
//                 },
//                 "searchArea": {
//                   "includedSources": [],
//                   "excludedSources": [],
//                   "includedSourceGroups": [],
//                   "excludedSourceGroups": []
//                 },
//                 "attributeFilters": {
//                   "excludeTechNews": valuesRequest.excludeTechNews,
//                   "excludeAnnouncements": valuesRequest.excludeAnnouncements,
//                   "excludeDigests": valuesRequest.excludeDigests
//                 },
//                 "similarMode": "duplicates",
//                 "limit": +valuesRequest.limit,
//                 "sortType": "sourceInfluence",
//                 "sortDirectionType": "desc",
//                 "intervalType": "month",
//                 "histogramTypes": [
//                   "totalDocuments",
//                   "riskFactors"
//                 ]
//               })
//         })
//         .then (response => {
//             return response.json()
//         })
//         .then (data => {
//             console.log(data)
//             dispatch(objectsearch(data.items))
//         })
//     }
// }