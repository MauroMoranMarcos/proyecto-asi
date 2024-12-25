import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Grid,
    Container,
    InputAdornment,
    IconButton, useTheme
} from "@mui/material";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail]  = useState('');
    const [role, setRole] = useState('WAREHOUSE_STAFF');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        userName: false,
        password: false,
        confirmPassword: false,
        email: false,
    });
    const theme = useTheme();

    let form;
    let confirmPasswordInput;

    const handleSubmit = event => {

        event.preventDefault();

        handleValidation();

        setIncorrectEmail(!validateEmail(email));

        if (form.checkValidity() && checkConfirmPassword()) {

            dispatch(actions.signUp(
                {userName: userName.trim(),
                    password: password,
                    email: email.trim(),
                    role: role.trim()},
                () =>navigate('/'),
                errors => setBackendErrors(errors),
                () => {
                }
            ));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const handleValidation = () => {
        const newRequiredAlerts = {
            userName: userName === '',
            password: password === '',
            confirmPassword: confirmPassword === '',
            email: email === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
    };

    const checkConfirmPassword = () => {

        if (password !== confirmPassword) {

            confirmPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmPasswordChange = value => {

        confirmPasswordInput.setCustomValidity('');
        setConfirmPassword(value);
        setPasswordsDoNotMatch(false);

    }

    const handleClickShowPassword = () => {

        setShowPassword((show) => !show);

    }

    const handleMouseDownPassword = (event) => {

        event.preventDefault();

    };

    // Function to validate an email adress
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <Container component="main" maxWidth="lg" disableGutters={true}
                   sx={{
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                       padding: 0,
                       minHeight: '65vh',
                   }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "column" },
                    justifyContent: "center",
                    gap: 0,
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '4px',
                    flexGrow: 1,
                }}>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <Paper elevation={24}
                       sx={{
                           minHeight: '65vh',
                           display: 'flex',
                           flexDirection: 'column',
                       }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            borderBottom: `1px solid ${theme.palette.primary.main}`,
                        }}>
                        <Typography variant="h2" sx={{ mt: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                            <FormattedMessage id="project.staff.SignUp.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box component="form" ref={node => form = node} noValidate onSubmit={handleSubmit}
                         sx={{
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center",
                             mt: 1,
                             ml: 2,
                             mr: 2,
                             mb: 1,
                         }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label={<FormattedMessage id="project.global.fields.userName" />}
                                    autoFocus
                                    error={requiredAlertMessages.userName}
                                    helperText={requiredAlertMessages.userName &&
                                        <FormattedMessage id="project.global.validator.required" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                    required
                                    fullWidth
                                    id="password"
                                    label={<FormattedMessage id="project.global.fields.password" />}
                                    error={requiredAlertMessages.password}
                                    helperText={requiredAlertMessages.password &&
                                        <FormattedMessage id="project.global.validator.required" />}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={node => confirmPasswordInput = node}
                                    value={confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    label={<FormattedMessage id="project.global.fields.confirmPassword" />}
                                    error={requiredAlertMessages.confirmPassword || passwordsDoNotMatch}
                                    helperText={passwordsDoNotMatch ?
                                        <FormattedMessage id="project.global.validator.passwordsDoNotMatch" />
                                        :
                                        requiredAlertMessages.confirmPassword &&
                                        <FormattedMessage id="project.global.validator.required" />}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    type="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label={<FormattedMessage id="project.global.fields.email" />}
                                    error={requiredAlertMessages.email || incorrectEmail}
                                    helperText={requiredAlertMessages.email ?
                                        <FormattedMessage id="project.global.validator.required" />
                                        :
                                        incorrectEmail &&
                                        <FormattedMessage id="project.global.validator.incorrectEmail" />}></TextField>
                            </Grid>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    ml: "auto",
                                    mr: "auto",
                                    mb: 1,
                                }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.SignUp"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )

}

export default SignUp;