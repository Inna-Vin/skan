export const ACTIONS = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    GET_INFO: 'GET_INFO',
    HISTOGRAMS: 'HISTOGRAMS',
    OBJECTSEARCH: 'OBJECTSEARCH',
    DOCUMENTS: 'DOCUMENTS'
}

export const logIn = (token, expire) => {
    return {
        type: ACTIONS.LOG_IN,
        token,
        expire
    }
}

export const logOut = () => {
    return {
        type: ACTIONS.LOG_OUT
    }
}

export const getInfo = (usedCompanyCount, companyLimit) => {
    return {
        type: ACTIONS.GET_INFO,
        usedCompanyCount,
        companyLimit,
    }
}

export const histograms = (totalDocuments, riskFactors) => {
    return {
        type: ACTIONS.HISTOGRAMS,
         totalDocuments,
         riskFactors
    }
}

export const objectsearch = (items) => {
    return {
        type: ACTIONS.OBJECTSEARCH,
        items
    }
}

export const documents = items => {
    return {
        type: ACTIONS.DOCUMENTS,
        items
    }
}