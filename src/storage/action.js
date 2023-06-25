export const ACTIONS = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    GET_INFO: 'GET_INFO'
}

export const logIn = (token, expire) => {
    return{
        type: ACTIONS.LOG_IN,
        token,
        expire
    }
}

export const logOut = () => {
    return{
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