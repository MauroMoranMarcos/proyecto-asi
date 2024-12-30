import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";

import staff from '../../staff';
import admin from "../../admin";

import {
    Box, Button, Card, CardActions, CardContent,
    Container,
    Paper,
    Typography, useTheme
} from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import InventoryIcon from '@mui/icons-material/Inventory';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ListAltIcon from '@mui/icons-material/ListAlt';
import * as orderActions from "../../orders/actions";
import {useState} from "react";
import DrawIcon from '@mui/icons-material/Draw';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(staff.selectors.isLoggedIn);
    const isAdmin = useSelector(staff.selectors.isAdmin);
    const isWarehouseStaff = useSelector(staff.selectors.isWarehouseStaff);
    const allWarehouses = useSelector(admin.selectors.getAllWarehouses);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();

    const handleCreateWarehouse = event => {
        event.preventDefault();

        navigate('/admin/createWarehouse');
    }

    const handleAddItemsToWarehouse = event => {
        event.preventDefault();

        navigate('/items/createitem');
    }

    const handleCheckInventory = event => {
        event.preventDefault();

        navigate('/items/checkinventory');
    }

    const handleSeeSuppliersCatalog = event => {
        event.preventDefault();

        navigate('/items/supplierscatalog');
    }

    const handleCreateOrder = event => {
        event.preventDefault();

        dispatch(orderActions.createOrder(
            order => {
                navigate(`/orders/${order.id}`);
            }, errors => setBackendErrors(errors)));

    }

    const handleSeeOrderDrafts = event => {
        event.preventDefault();

        navigate('/orders/findorders');
    }

    if (!allWarehouses) {
        return null;
    }

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
                            <FormattedMessage id="project.app.Home.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 1,
                            ml: 2,
                            mr: 2,
                            mb: 1,
                        }}>
                        {isLoggedIn && isWarehouseStaff &&
                            <Box sx={{ minWidth: '99%' }}>
                                <Card variant="outlined" sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Typography variant="h3" sx={{ mt: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                                            <FormattedMessage id="project.app.Home.InventoryAdministration" />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            onClick={e => handleAddItemsToWarehouse(e)}
                                            color="secondary"
                                            startIcon={<WidgetsIcon />}
                                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                            <Typography textAlign="center">
                                                <FormattedMessage id="project.global.buttons.AddItems"></FormattedMessage>
                                            </Typography>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={e => handleCheckInventory(e)}
                                            color="secondary"
                                            startIcon={<InventoryIcon />}
                                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                            <Typography textAlign="center">
                                                <FormattedMessage id="project.global.buttons.CheckInventory"></FormattedMessage>
                                            </Typography>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        }
                        {isLoggedIn && isAdmin &&
                            <Box sx={{ minWidth: '99%' }}>
                                <Card variant="outlined" sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Typography variant="h3" sx={{ mt: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                                            <FormattedMessage id="project.app.Home.WarehouseAdministration" />
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                                            <FormattedMessage id="project.app.Home.ActiveWarehouses" />
                                        </Typography>
                                        {allWarehouses.map(warehouse =>
                                            <Typography>
                                                {warehouse.name}
                                            </Typography>
                                        )}
                                    </CardContent>
                                    <CardActions>
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
                                    </CardActions>
                                </Card>
                            </Box>
                        }
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 1,
                            ml: 2,
                            mr: 2,
                            mb: 1,
                        }}>
                        {isLoggedIn &&
                            <Box sx={{ minWidth: '99%' }}>
                                <Card variant="outlined" sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Typography variant="h3" sx={{ mt: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                                            <FormattedMessage id="project.app.Home.Suppliers" />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            onClick={e => handleSeeSuppliersCatalog(e)}
                                            color="secondary"
                                            startIcon={<PrecisionManufacturingIcon />}
                                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                            <Typography textAlign="center">
                                                <FormattedMessage id="project.global.buttons.SuppliersCatalog"></FormattedMessage>
                                            </Typography>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        }
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 1,
                            ml: 2,
                            mr: 2,
                            mb: 1,
                        }}>
                        {isLoggedIn &&
                            <Box sx={{ minWidth: '99%' }}>
                                <Card variant="outlined" sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                    <CardContent>
                                        <Typography variant="h3" sx={{ mt: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                                            <FormattedMessage id="project.app.Home.Orders" />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {isLoggedIn && isWarehouseStaff &&
                                            <Button
                                                variant="contained"
                                                onClick={e => handleCreateOrder(e)}
                                                color="secondary"
                                                startIcon={<ListAltIcon />}
                                                style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                                <Typography textAlign="center">
                                                    <FormattedMessage id="project.global.buttons.CreateOrder"></FormattedMessage>
                                                </Typography>
                                            </Button>
                                        }
                                        {isLoggedIn && isWarehouseStaff &&
                                            <Button
                                                variant="contained"
                                                onClick={e => handleSeeOrderDrafts(e)}
                                                color="secondary"
                                                startIcon={<DrawIcon />}
                                                style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                                                <Typography textAlign="center">
                                                    <FormattedMessage id="project.global.buttons.SeeOrderDrafts"></FormattedMessage>
                                                </Typography>
                                            </Button>
                                        }
                                    </CardActions>
                                </Card>
                            </Box>
                        }
                    </Box>
                </Paper>
            </Box>
        </Container>
    )

}

export default Home;