import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import staff from '../../staff';

import {AppBar, Drawer, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CssBaseline from "@mui/material/CssBaseline";

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector(staff.selectors.getUser);
    const isLoggedIn = useSelector(staff.selectors.isLoggedIn);
    const userName = useSelector(staff.selectors.getUserName);

    const handleSignUp = (event) => {
        event.preventDefault();

        navigate('/staff/signUp');
    }

    if (isLoggedIn && (!user || !userName)) {
        return null;
    }

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {isLoggedIn &&
                        <Typography
                            variant="h12"
                            sx={{ my: 2, mr: 2, textAlign: "left", fontWeight: 'bold' }}>
                            <FormattedMessage id="project.app.Header.HermenegildoEHijos" />
                            {userName}
                        </Typography>
                    }
                    {!isLoggedIn &&
                        <Box sx={{ display: {xs: 'none', md: 'block'}, flexDirection: 'row', alignItems: 'center' }}>
                            <Button
                                sx={{ ml: 1 }}
                                variant="contained"
                                onClick={e => handleSignUp(e)}
                                color="secondary"
                                startIcon={<AssignmentIndIcon />}
                                style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                <Typography textAlign="center">
                                    <FormattedMessage id="project.global.buttons.SignUpHeader"></FormattedMessage>
                                </Typography>
                            </Button>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>

    )

}

export default Header;