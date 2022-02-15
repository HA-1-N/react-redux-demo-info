import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchUserFailure, fetchUserRequest, fetchUsers, fetchUserSuccess } from '../redux/user/userActions';
import '../css/userContainer.css'

export interface IUser {
    user: any,
}

const UserContainer = () => {

    const dispatch = useDispatch();

    const users = useSelector((store: any) => store.user.users);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        dispatch(fetchUserRequest);
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            // const response = await axios.get('https://jsonplaceholder.typicode.com/phótos');
            const users = response.data;

            users.forEach((user: any) => {
                user.emailDraff = user.email
            });

            console.log(users);

            users.map((user: any) => {
                user.phoneDraff = user.phone;
            });
            console.log(users);

            dispatch(fetchUserSuccess(users));
        } catch (error) {
            dispatch(fetchUserFailure(error));
        }
    };

    const changeEmail = (index: number, value: string) => {
        const newUsersTemp = users;
        newUsersTemp[index].emailDraff = value;
        dispatch(fetchUserSuccess(newUsersTemp));
    }

    const changePhone = (index: number, value: string) => {
        const newUserTemp = users;
        newUserTemp[index].phoneDraff = value;
        dispatch(fetchUserSuccess(newUserTemp));
    }

    const confirm = () => {
        const newUsersTemp = users.map((user: any) => ({ ...user, email: user.emailDraff, phone: user.phoneDraff }));
        dispatch(fetchUserSuccess(newUsersTemp));
    }

    const reset = () => {
        const newUsersTemp = users.map((user: any) => ({ ...user, emailDraff: user.email, phoneDraff: user.phone }));
        dispatch(fetchUserSuccess(newUsersTemp));
    }

    return (
        <>
            <div className='btn-wrap'>
                <button className='btn btn-confirm' onClick={confirm}>Confirm</button>
                <button className='btn btn-reset' onClick={reset}>Reset</button>
            </div>
            {users?.map((user: any, index: number) => (
                <div className='userInfo' key={user.id}>
                    <h2 className='userId'>{user.id}</h2>
                    <h2 className='userName'>{user.name}</h2>
                    <label className='userLabel'>
                        Phone:
                        <input type='text' id={user.id} className='userInput'
                            value={user.phoneDraff}
                            onChange={(e) => changePhone(index, e.target.value)} />
                    </label>

                    <label className='userLabel'>
                        Email:
                        <input
                            type="text" id={user.id} className='userInput'
                            value={user.emailDraff}
                            onChange={(e) => changeEmail(index, e.target.value)}
                        />
                    </label>
                </div>
            ))}
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userData: state.user,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);