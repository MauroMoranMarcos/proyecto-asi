import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import AppGlobalComponents from "./AppGlobalComponents";

import staff from '../../staff';

import {SignUp} from '../../staff';
import {Login} from '../../staff';
import {Logout} from '../../staff';

const Body = () => {

    const isLoggedIn = useSelector(staff.selectors.isLoggedIn);

    return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Routes>
                {!isLoggedIn && <Route path="/staff/signup" element={<SignUp/>}/>}
                {!isLoggedIn && <Route path="/staff/login" element={<Login/>}/>}
                {isLoggedIn && <Route path="/users/logout" element={<Logout/>}/>}
            </Routes>
        </div>

    );

}

export default Body;