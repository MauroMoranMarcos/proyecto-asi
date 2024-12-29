import React, {useEffect, useState} from "react";
import {
    Container,
    Box,
    Button,
    Typography,
    Paper,
    Grid,
    useTheme,
    Alert,
    ButtonGroup,
    DialogTitle,
    DialogContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem, FormHelperText, IconButton, DialogActions, Dialog, useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as itemsSelectors from "../../items/selectors";
import {FormattedMessage, useIntl} from "react-intl";
import * as actions from "../actions";
import * as itemsActions from "../../items/actions";
import {BackButton, Errors} from "../../common";
import {useParams} from "react-router-dom";
import Boxes from "./Boxes";

const StyledBox = styled(Box)(({theme}) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const OrderDetails = () => {


    const dispatch = useDispatch();
    const orderBoxes = useSelector(selectors.getOrderBoxes);
    const items = useSelector(itemsSelectors.getItems);
    const [openAddBoxDialog, setOpenAddBoxDialog] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const theme = useTheme();
    const intl = useIntl();

    const {id} = useParams();
    const orderId = Number(id);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [itemName, setItemName] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [numBoxes, setNumBoxes] = useState(null);
    const [numItemsInBox, setNumItemsInBox] = useState(null);

    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        numBoxes: false,
        numberOfItemsInBox: false,
        itemName: false,
    });

    useEffect(() => {

        dispatch(actions.findBoxesInOrder(orderId, () => {}, errors => setBackendErrors(errors)));

    }, []);

    useEffect(() => {

        dispatch(itemsActions.findAllItems(() => {}, errors => setBackendErrors(errors)));

    }, []);

    const handleAddBox = (event) => {

        const newRequiredAlerts = {
            numBoxes: numBoxes === '',
            numberOfItemsInBox: numItemsInBox === '',
            itemName: itemName === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.itemName && !newRequiredAlerts.numBoxes
            && !newRequiredAlerts.numberOfItemsInBox;
        setIsFormValid(newIsFormValid);

        if (newIsFormValid) {

            dispatch(actions.addBoxToOrder(orderId,
                itemId,
                numBoxes,
                numItemsInBox,
                () => {
                    handleCloseAddBoxDialog();
                },
                errors => setBackendErrors(errors)));

        }
    };

    const handleOpenAddBoxDialog = () => {
        setOpenAddBoxDialog(true);
    };

    const handleCloseAddBoxDialog = () => {
        setOpenAddBoxDialog(false);
    };

    if (!orderBoxes) {
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
                            <FormattedMessage id="project.orders.OrderDetails.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mb: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenAddBoxDialog}
                            >
                                <FormattedMessage id="project.orders.OrderDetails.button.addBox" />
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                    </Box>
                    {orderBoxes.length === 0 ?
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
                                    <FormattedMessage id="project.orders.OrderDetails.noBoxes" />
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
                            <Boxes boxes={orderBoxes}/>
                        </Box>
                    }
                    <Dialog
                        fullScreen={fullScreen}
                        open={openAddBoxDialog}
                        onClose={handleCloseAddBoxDialog}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                {<FormattedMessage id="project.orders.OrderDetails.addBox.title" />}
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
                                <FormControl fullWidth error={requiredAlertMessages.supplier}>
                                    <InputLabel id="demo-simple-select-helper-label">
                                        <FormattedMessage id="project.global.fields.item" />
                                    </InputLabel>
                                    <Select
                                        value={itemId || ''} // Cambia a itemId como valor del Select
                                        label={<FormattedMessage id="project.global.fields.item" />}
                                        onChange={(e) => {
                                            const selectedItemId = e.target.value; // Obtiene el id seleccionado
                                            const selectedItem = items.find(item => item.id === selectedItemId); // Encuentra el ítem por id
                                            setItemId(selectedItemId); // Establece el id del ítem
                                            setItemName(selectedItem ? selectedItem.itemName : ''); // Establece el nombre del ítem correspondiente
                                        }}
                                    >
                                        {items && items.map(item =>
                                            <MenuItem key={item.id} value={item.id}>
                                                <Typography>
                                                    {item.itemName}
                                                </Typography>
                                            </MenuItem>
                                        )}
                                    </Select>
                                    <FormHelperText color="alertRed">
                                        {requiredAlertMessages.item &&
                                            <FormattedMessage id="project.global.validator.required" />}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    m: 1
                                }}>
                                <TextField
                                    value={numBoxes}
                                    onChange={(e) => setNumBoxes(e.target.value)}
                                    name="numBoxes"
                                    required
                                    fullWidth
                                    id="numBoxes"
                                    label={<FormattedMessage id="project.global.fields.numBoxes" />}
                                    autoFocus
                                    error={requiredAlertMessages.numBoxes}
                                    helperText={requiredAlertMessages.numBoxes &&
                                        <FormattedMessage id="project.global.validator.required" />}
                                    type="number"
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    m: 1
                                }}>
                                <TextField
                                    value={numItemsInBox}
                                    onChange={(e) => setNumItemsInBox(e.target.value)}
                                    name="numItemsInBox"
                                    required
                                    fullWidth
                                    id="numItemsInBox"
                                    label={<FormattedMessage id="project.global.fields.numItemsInBox" />}
                                    autoFocus
                                    error={requiredAlertMessages.numberOfItemsInBox}
                                    helperText={requiredAlertMessages.numberOfItemsInBox &&
                                        <FormattedMessage id="project.global.validator.required" />}
                                    type="number"
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={(e) => handleAddBox(e)}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.AddBox"></FormattedMessage>
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                color="alertRed"
                                onClick={handleCloseAddBoxDialog}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                </Typography>
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Box>
        </Container>
    )
}
export default OrderDetails;
