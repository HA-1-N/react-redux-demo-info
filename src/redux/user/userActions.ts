import axios from "axios"
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userTypes"

export const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

export const fetchUserSuccess = (users: any) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    }
}

export const fetchUserFailure = (error: any) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    }
}

export const fetchUsers = () => {
    return (dispatch: any) => {
        dispatch(fetchUserRequest);
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
                const users = response.data
                dispatch(fetchUserSuccess(users))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(fetchUserFailure(errorMessage))
            })
    }
}
