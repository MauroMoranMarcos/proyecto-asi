import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

import store from './store';
import {App} from './modules/app';
import backend from './backend';
import {NetworkError} from './backend';
import app from './modules/app';
import {initReactIntl} from './i18n';
import './styles.css';

import {createTheme, ThemeProvider} from "@mui/material";

/* Configure backend proxy. */
backend.init(error => store.dispatch(app.actions.error(new NetworkError())));

/* Configure i18n. */
const {locale, messages} = initReactIntl();

/* Render application. */
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#376FC3',
        },
        secondary: {
            main: '#D74C11',
        },
        alertRed: {
            main: '#FF3700'
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: '1.1rem',
            fontWeight: 400,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: '0.8rem',
            fontWeight: 400,
            lineHeight: 1.2,
        },
    },
});

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <IntlProvider locale={locale} messages={messages}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </IntlProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>);

export default theme;
