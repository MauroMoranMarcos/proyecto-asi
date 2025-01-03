import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import staff from '../../staff';
import admin from "../../admin";
import items from "../../items";

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import {Container} from "@mui/material";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(staff.actions.tryLoginFromServiceToken(
            () => dispatch(staff.actions.logout())));

        dispatch(admin.actions.findAllWarehouses());
        //dispatch(items.actions.findAllSuppliers());

    });

    return (
        <Container>
            <Header/>
            <Body/>
            <Footer/>
        </Container>
    );

}
    
export default App;
