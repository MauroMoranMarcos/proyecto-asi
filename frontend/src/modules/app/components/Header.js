import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import staff from '../../staff';

import {AppBar, Drawer, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CssBaseline from "@mui/material/CssBaseline";

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector(staff.selectors.getUser);
    const isLoggedIn = useSelector(staff.selectors.isLoggedIn);
    const isAdmin = useSelector(staff.selectors.isAdmin);
    const isWarehouseStaff = useSelector(staff.selectors.isWarehouseStaff);
    const userName = useSelector(staff.selectors.getUserName);

    const handleSignUp = (event) => {
        event.preventDefault();

        navigate('/staff/signUp');
    }

    const handleLogin = (event) => {
        event.preventDefault();

        navigate('/staff/login');
    }

    const handleLogout = event => {
        event.preventDefault();

        navigate('/staff/logout');
    }

    const handleCreateWarehouse = event => {
        event.preventDefault();

        navigate('/admin/createWarehouse');
    }

    const handleAddItemsToWarehouse = event => {
        event.preventDefault();

        navigate('/items/additemstowarehouse');
    }

    if (isLoggedIn && (!user || !userName)) {
        return null;
    }

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/logo-hermenegildo.png"
                            alt="Logo"
                            style={{ height: '70px', marginRight: '16px' }}
                        />
                        {isLoggedIn &&
                            <Typography
                                variant="h12"
                                sx={{ my: 2, mr: 2, textAlign: "left", fontWeight: 'bold' }}>
                                <FormattedMessage id="project.app.Header.HermenegildoEHijos" />
                                {userName}
                            </Typography>
                        }
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!isLoggedIn &&
                            <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
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
                        {!isLoggedIn &&
                            <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Button
                                    sx={{ ml: 1 }}
                                    variant="contained"
                                    onClick={e => handleLogin(e)}
                                    color="secondary"
                                    startIcon={<LoginIcon />}
                                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                    <Typography textAlign="center">
                                        <FormattedMessage id="project.global.buttons.Login"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </Box>
                        }
                        {isLoggedIn && isAdmin &&
                            <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Button
                                    sx={{ ml: 1 }}
                                    variant="contained"
                                    onClick={e => handleCreateWarehouse(e)}
                                    color="secondary"
                                    startIcon={<WarehouseIcon />}
                                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                    <Typography textAlign="center">
                                        <FormattedMessage id="project.global.buttons.CreateWarehouse"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </Box>
                        }
                        {isLoggedIn && isWarehouseStaff &&
                            <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Button
                                    sx={{ ml: 1 }}
                                    variant="contained"
                                    onClick={e => handleAddItemsToWarehouse(e)}
                                    color="secondary"
                                    startIcon={<WidgetsIcon />}
                                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                    <Typography textAlign="center">
                                        <FormattedMessage id="project.global.buttons.AddItems"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </Box>
                        }
                        {isLoggedIn &&
                            <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Button
                                    sx={{ ml: 1 }}
                                    variant="contained"
                                    onClick={e => handleLogout(e)}
                                    color="secondary"
                                    startIcon={<ExitToAppIcon />}
                                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                    <Typography textAlign="center">
                                        <FormattedMessage id="project.global.buttons.Logout"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </Box>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>

    )

}

export default Header;