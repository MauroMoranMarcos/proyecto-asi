import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import AppGlobalComponents from "./AppGlobalComponents";

import staff from '../../staff';

import {SignUp} from '../../staff';
import {Login} from '../../staff';
import {Logout} from '../../staff';
import {CreateWarehouse} from "../../admin";
import {CheckInventory, CreateItem, ItemDetails, ItemsFromSupplier, SuppliersCatalog} from "../../items";
import Home from "./Home";
import {OrderDetails} from "../../orders";
import {OrderDrafts} from "../../orders";

const Body = () => {

    const isLoggedIn = useSelector(staff.selectors.isLoggedIn);
    const isAdmin = useSelector(staff.selectors.isAdmin);
    const isWarehouseStaff = useSelector(staff.selectors.isWarehouseStaff);

    return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Routes>
                <Route path="/" element={<Home/>} />
                {!isLoggedIn && <Route path="/staff/signup" element={<SignUp/>}/>}
                {!isLoggedIn && <Route path="/staff/login" element={<Login/>}/>}
                {isLoggedIn && <Route path="/staff/logout" element={<Logout/>}/>}
                {isLoggedIn && isAdmin && <Route path="/admin/createwarehouse" element={<CreateWarehouse/>}/>}
                {isLoggedIn && isWarehouseStaff && <Route path="/items/createitem" element={<CreateItem/>}/>}
                {isLoggedIn && isWarehouseStaff && <Route path="/items/checkinventory" element={<CheckInventory/>}/>}
                {isLoggedIn && isWarehouseStaff && <Route path="/items/checkinventory/:id" element={<ItemDetails/>}/>}
                {isLoggedIn && <Route path="/items/supplierscatalog" element={<SuppliersCatalog/>}/>}
                {isLoggedIn && <Route path="/items/supplierscatalog/:id/itemsfromsupplier" element={<ItemsFromSupplier/>}/>}
                {isLoggedIn && isWarehouseStaff && <Route path="/orders/orderdrafts" element={<OrderDrafts/>}/>}
                {isLoggedIn && isWarehouseStaff && <Route path="/orders/:id" element={<OrderDetails/>}/>}
            </Routes>
        </div>

    );

}

export default Body;