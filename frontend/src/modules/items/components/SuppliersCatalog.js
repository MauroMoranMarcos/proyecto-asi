import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import * as selectors from "../selectors";
import * as actions from "../actions";

import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Container, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Paper, TextField,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import {FormattedMessage, useIntl} from "react-intl";
import {BackButton, Errors} from "../../common";
import Suppliers from "./Suppliers";

const SuppliersCatalog = () => {

    const dispatch = useDispatch();
    const suppliers = useSelector(selectors.getSuppliers);
    const [supplierName, setSupplierName] = useState('');
    const [openCreateSupplierDialog, setOpenCreateSupplierDialog] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        supplierName: false,
    });

    useEffect(() => {

        dispatch(actions.findAllSuppliers());

    }, []);

    const handleCreateSupplier = () => {

        const newRequiredAlerts = {
            supplierName: supplierName <= 0,
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.supplierName;

        if (newIsFormValid) {
            dispatch(actions.createSupplier(supplierName,
                () => {
                    dispatch(actions.findAllSuppliers());
                    handleCloseCreateSupplierDialog();
                    resetFormFields();
                }));
        }

    }

    const handleOpenCreateSupplierDialog = () => {

        setOpenCreateSupplierDialog(true);

    }

    const handleCloseCreateSupplierDialog = () => {

        setOpenCreateSupplierDialog(false);
        resetFormFields();

    }

    const resetFormFields = () => {

        setSupplierName('');

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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 1,
                            ml: 2,
                            mr: 2,
                            mb: 1,
                        }}>
                        <Button
                            onClick={handleOpenCreateSupplierDialog}
                            variant="contained"
                            sx={{ mb: 1 }}>
                            <Typography>
                                <FormattedMessage id="project.global.buttons.CreateSupplier"></FormattedMessage>
                            </Typography>
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openCreateSupplierDialog}
                            onClose={handleCloseCreateSupplierDialog}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                    {<FormattedMessage id="project.items.SuppliersCatalog.createSupplier.title" />}
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Box
                                    sx={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        m: 1
                                    }}>
                                    <TextField
                                        value={supplierName}
                                        onChange={(e) => setSupplierName(e.target.value)}
                                        name="supplierName"
                                        type="text"
                                        required
                                        fullWidth
                                        id="supplierName"
                                        label={<FormattedMessage id="project.global.fields.supplierName" />}
                                        error={requiredAlertMessages.supplierName}
                                        helperText={requiredAlertMessages.supplierName &&
                                            <FormattedMessage id="project.global.validator.required" />}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={() => handleCreateSupplier()}
                                    sx={{ mt: 1, mb: 1 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="alertRed"
                                    onClick={handleCloseCreateSupplierDialog}
                                    sx={{ mt: 1, mb: 1 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>
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