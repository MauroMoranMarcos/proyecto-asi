import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import staff from '../../staff';

import {Container} from "@mui/material";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
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
