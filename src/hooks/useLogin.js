import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';

function useLogin(defaultValue = '') {
    const navigate = useNavigate();
    const disptach = useDispatch();

    const [email, setEmail] = useState(defaultValue);
    const [password, setPassword] = useState(defaultValue);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        disptach(asyncSetAuthUser({ email, password }));

        navigate('/');
    };

    return [email, onChangeEmail, password, onChangePassword, onSubmitHandler];
}

export default useLogin;