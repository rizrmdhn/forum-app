/* eslint-disable no-alert */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { asyncRegisterUser } from '../states/users/action';

function useRegister(defaultValue = '') {
    const navigate = useNavigate();
    const disptach = useDispatch();

    const [name, setName] = useState(defaultValue);
    const [email, setEmail] = useState(defaultValue);
    const [password, setPassword] = useState(defaultValue);


    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };



    const onSubmitHandler = async (event) => {
        event.preventDefault();
        disptach(asyncRegisterUser({ name, email, password }));

        navigate('/login');
    };

    return [
        name, onChangeName, email, onChangeEmail, password, onChangePassword, onSubmitHandler
    ];
}

export default useRegister;