import { ACTIONS } from "./action";

//const token = localStorage.getItem('token')
// const userToken = JSON.parse(token)
// console.log(userToken)

const initialState = {
    token: '',
    expire: '',
    isAuth: false,
    usedCompanyCount: '',
    companyLimit: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.LOG_IN:
            return {
                ...state, 
                token: action.payload,
                expire: action.payload,
                isAuth: true
            }
        case ACTIONS.LOG_OUT:
            localStorage.removeItem('token')
            localStorage.removeItem('expire')
            return {
                ...state,
                token: '',
                expire: '',
                isAuth: false
            }
        case ACTIONS.GET_INFO:
            return{
                ...state,
                usedCompanyCount: action.payload,
                companyLimit: action.payload,
            }
        default: 
            return state
    }
}

export default reducer;