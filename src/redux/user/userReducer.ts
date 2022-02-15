
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userTypes";

const initState = {
    loading: true,
    data: [],
    error: '',
}
const userReducer = (state = initState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                error: '',
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                users: [],
                error: action.payload,
            }

        default: return state;
    }
}

export default userReducer;