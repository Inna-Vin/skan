import { logIn, histograms, objectsearch, documents } from "./action";

export const logInRequest = (values) => {
    return function (dispatch) {
        fetch ('https://gateway.scan-interfax.ru/api/v1/account/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            return response.json()
        })
        .then (data => {
            console.log(data)
            if (data.accessToken) {
              localStorage.setItem('token', JSON.stringify(data.accessToken));
              localStorage.setItem('expire', JSON.stringify(data.expire))
              window.location.reload()
            } else {
                alert(data.message)
            }
            dispatch(logIn(data.accessToken, data.expire))
        })
    }
}

export const histogramsRequest = (userToken, valuesRequest) => {
    return function (dispatch) {
        fetch ('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify ({
                "issueDateInterval": {
                  "startDate": valuesRequest.startDate,
                  "endDate": valuesRequest.endDate
                },
                "searchContext": {
                  "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                      {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": +valuesRequest.inn,
                        "maxFullness": valuesRequest.maxFullness,
                        "inBusinessNews": null
                      }
                    ],
                    "onlyMainRole": valuesRequest.onlyMainRole,
                    "tonality": valuesRequest.tonality,
                    "onlyWithRiskFactors": valuesRequest.onlyMainRole,
                    "riskFactors": {
                      "and": [],
                      "or": [],
                      "not": []
                    },
                    "themes": {
                      "and": [],
                      "or": [],
                      "not": []
                    }
                  },
                  "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                  }
                },
                "searchArea": {
                  "includedSources": [],
                  "excludedSources": [],
                  "includedSourceGroups": [],
                  "excludedSourceGroups": []
                },
                "attributeFilters": {
                  "excludeTechNews": valuesRequest.excludeTechNews,
                  "excludeAnnouncements": valuesRequest.excludeAnnouncements,
                  "excludeDigests": valuesRequest.excludeDigests
                },
                "similarMode": "duplicates",
                "limit": +valuesRequest.limit,
                "sortType": "sourceInfluence",
                "sortDirectionType": "desc",
                "intervalType": "month",
                "histogramTypes": [
                  "totalDocuments",
                  "riskFactors"
                ]
              })
        })
        .then (response => {
            return response.json()
        })
        .then (data => {
          if(data.message) (
            alert(data.message)
          )
            //console.log(data)
            dispatch(histograms(data.data[0].data, data.data[1].data))
        })
        .catch(e => {
          alert(e.response.data.message)
        })
        dispatch(objectsearchRequest(userToken, valuesRequest))
    } 
}

export const objectsearchRequest = (userToken, valuesRequest) => {
    return function (dispatch) {
        fetch ('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify ({
                "issueDateInterval": {
                  "startDate": valuesRequest.startDate,
                  "endDate": valuesRequest.endDate
                },
                "searchContext": {
                  "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                      {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": +valuesRequest.inn,
                        "maxFullness": valuesRequest.maxFullness,
                        "inBusinessNews": null
                      }
                    ],
                    "onlyMainRole": valuesRequest.onlyMainRole,
                    "tonality": valuesRequest.tonality,
                    "onlyWithRiskFactors": valuesRequest.onlyMainRole,
                    "riskFactors": {
                      "and": [],
                      "or": [],
                      "not": []
                    },
                    "themes": {
                      "and": [],
                      "or": [],
                      "not": []
                    }
                  },
                  "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                  }
                },
                "searchArea": {
                  "includedSources": [],
                  "excludedSources": [],
                  "includedSourceGroups": [],
                  "excludedSourceGroups": []
                },
                "attributeFilters": {
                  "excludeTechNews": valuesRequest.excludeTechNews,
                  "excludeAnnouncements": valuesRequest.excludeAnnouncements,
                  "excludeDigests": valuesRequest.excludeDigests
                },
                "similarMode": "duplicates",
                "limit": +valuesRequest.limit,
                "sortType": "sourceInfluence",
                "sortDirectionType": "desc",
                "intervalType": "month",
                "histogramTypes": [
                  "totalDocuments",
                  "riskFactors"
                ]
              })
        })
        .then (response => {
            return response.json()
        })
        .then (data => {
          if(data.message) (
            alert(data.message)
          )
            //console.log(data)
            dispatch(objectsearch(data.items))
            dispatch(documentsRequect(userToken, data.items))
        })
    }
}

export const documentsRequect = (userToken, items) => {
    const ids = items.map(item => item.encodedId)
    return function (dispatch) {
        fetch ('https://gateway.scan-interfax.ru/api/v1/documents', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
                "ids": ids
            })
        })
        .then (response => {
            return response.json()  
        })
        .then (data => {
          if(data.message) (
            alert(data.message)
          )
            // console.log(data)
            dispatch(documents(data))
        })
    }
    
}