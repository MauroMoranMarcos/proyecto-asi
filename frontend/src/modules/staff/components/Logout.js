import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import staff from '../../staff';

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(staff.actions.logout());
        navigate('/');
    });

    return null;

}

export default Logout;