import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import {useEffect, useState} from "react";
import {Alert, Box, Button, ButtonGroup, Container, Paper, Typography, useTheme} from "@mui/material";
import {FormattedMessage, useIntl} from "react-intl";
import * as actions from "../actions";
import {BackButton, Errors} from "../../common";
import Suppliers from "./Suppliers";

const SuppliersCatalog = () => {

    const dispatch = useDispatch();
    const suppliers = useSelector(selectors.getSuppliers);
    const [supplierName, setSupplierName] = useState('');
    const [openCreateSupplierDialog, setOpenCreateSupplierDialog] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();
    const intl = useIntl();

    useEffect(() => {

        dispatch(actions.findAllSuppliers());

    }, []);

    const handleCreateSupplier = () => {

        dispatch(actions.createSupplier(supplierName,
            () => {
                handleCloseCreateSupplierDialog();
            }));

    }

    const handleOpenCreateSupplierDialog = () => {

        setOpenCreateSupplierDialog(true);

    }

    const handleCloseCreateSupplierDialog = () => {

        setOpenCreateSupplierDialog(false);

    }

    if (!suppliers) {
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
                            justifyContent: "flex-start",
                            mb: 1,
                            borderBottom: `1px solid ${theme.palette.primary.main}`,
                        }}>
                        <BackButton />
                        <Typography variant="h2" sx={{ mt: 0.5, mb: 0.5, fontWeight: 'bold' }}>
                            <FormattedMessage id="project.items.SuppliersCatalog.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                    </Box>
                    {suppliers.length === 0 ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "column" },
                                justifyContent: "center",
                                gap: 4,
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 1,
                                    mb: 1,
                                }}>
                                <Alert
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start',
                                        ml: 1,
                                        mr: 1,
                                        mb: 1,
                                        mt: 1
                                    }}
                                    variant="outlined" severity="warning">
                                    <FormattedMessage id="project.items.SuppliersCatalog.noSuppliers" />
                                </Alert>
                            </Box>
                        </Box>
                        :
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '97%',
                                ml: 1,
                                mr: 1,
                                mb: 1,
                            }}>
                            <Suppliers suppliers={suppliers}/>
                        </Box>
                    }
                </Paper>
            </Box>
        </Container>
    )


}

export default SuppliersCatalog;