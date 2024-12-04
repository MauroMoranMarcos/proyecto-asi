import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import AppGlobalComponents from "./AppGlobalComponents";

import staff from '../../staff';

import {SignUp} from '../../staff';
import {Login} from '../../staff';
import {Logout} from '../../staff';
import {CreateWarehouse} from "../../admin";

const Body = () => {

    const isLoggedIn = useSelector(staff.selectors.isLoggedIn);
    const isAdmin = useSelector(staff.selectors.isAdmin);

    return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Routes>
                {!isLoggedIn && <Route path="/staff/signup" element={<SignUp/>}/>}
                {!isLoggedIn && <Route path="/staff/login" element={<Login/>}/>}
                {isLoggedIn && <Route path="/staff/logout" element={<Logout/>}/>}
                {isLoggedIn && isAdmin && <Route path="/admin/createwarehouse" element={<CreateWarehouse/>}/>}
            </Routes>
        </div>

    );

}

export default Body;