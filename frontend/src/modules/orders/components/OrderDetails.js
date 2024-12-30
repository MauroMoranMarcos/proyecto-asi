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
    MenuItem,
    FormHelperText,
    IconButton,
    DialogActions,
    Dialog,
    useMediaQuery,
    Card,
    CardActionArea,
    CardMedia,
    CardContent, CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as itemsSelectors from "../../items/selectors";
import {FormattedMessage, useIntl} from "react-intl";
import * as actions from "../actions";
import * as itemsActions from "../../items/actions";
import {BackButton, Errors} from "../../common";
import {useNavigate, useParams} from "react-router-dom";
import Boxes from "./Boxes";
import DeleteIcon from "@mui/icons-material/Delete";
import Items from "../../items/components/Items";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Item from "../../items/components/Item";

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

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order = useSelector(selectors.getOrder);
    const orderBoxes = useSelector(selectors.getOrderBoxes);
    const items = useSelector(itemsSelectors.getItems);
    const suppliers = useSelector(itemsSelectors.getSuppliers);
    const supplier = useSelector(itemsSelectors.getSupplier);
    const itemsFromSupplier = useSelector(itemsSelectors.getItemsFromSupplier);
    const [supplierSelectedId, setSupplierSelectedId] = useState(null);
    const [openAddBoxDialog, setOpenAddBoxDialog] = useState(false);
    const [openSelectSupplierDialog, setOpenSelectSupplierDialog] = useState(false);
    const [openSelectItemDialog, setOpenSelectItemDialog] = useState(false);
    const [openDeleteOrderDialog, setOpenDeleteOrderDialog] = useState(false);
    const [openSendOrderDraftDialog, setOpenSendOrderDraftDialog] = useState(false);
    const [selectingItem, setSelectingItem] = useState(false);
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
        dispatch(actions.findOrderById(orderId));

    }, []);

    useEffect(() => {

        dispatch(itemsActions.findAllSuppliers());

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
                    resetFormFields();
                },
                errors => setBackendErrors(errors)));

        }
    };

    const resetFormFields = () => {

        setItemId(null);
        setNumBoxes(null);
        setNumItemsInBox(null);

    }

    const handleOpenAddBoxDialog = () => {
        setOpenAddBoxDialog(true);
    };

    const handleCloseAddBoxDialog = () => {
        setOpenAddBoxDialog(false);
    };

    const handleOpenSelectSupplierDialog = () => {
        setOpenSelectSupplierDialog(true);
    };

    const handleCloseSelectSupplierDialog = () => {
        setOpenSelectSupplierDialog(false);
        setSupplierSelectedId(null);
    };

    const handleSelectSupplier = () => {

        setSelectingItem(true);
        dispatch(itemsActions.findSupplierById(supplierSelectedId));
        dispatch(itemsActions.findItemsFromSupplier({supplierId: supplierSelectedId, page: 0},
            () => {
                handleOpenSelectItemDialog();
            }));

    }

    const handleOpenSelectItemDialog = () => {

        setOpenSelectItemDialog(true);

    }

    const handleCloseSelectItemDialog = () => {

        setOpenSelectItemDialog(false);
        dispatch(itemsActions.clearSupplier());
        dispatch(itemsActions.clearFindItemsFromSupplier());
        setSelectingItem(false);

    }

    const handleSelectItem = (itemId) => {

        setItemId(itemId);
        handleCloseSelectItemDialog();
        handleCloseSelectSupplierDialog();
        handleOpenAddBoxDialog();
        setSelectingItem(false);

    }

    const handleDeleteOrder = () => {

        dispatch(actions.deleteOrderById(order.id,
            () => {
                navigate("/orders/findorders");
            }));

    }

    const handleOpenDeleteOrderDialog = () => {

        setOpenDeleteOrderDialog(true);

    }

    const handleCloseDeleteOrderDialog = () => {

        setOpenDeleteOrderDialog(false);

    }

    const handleSendOrderDraft = () => {

        dispatch(actions.sendOrderToAdmins(orderId,
            () => {
                handleCloseSendOrderDraftDialog();
                dispatch(actions.findOrderById(orderId));
            }));

    }

    const handleOpenSendOrderDraftDialog = () => {

        setOpenSendOrderDraftDialog(true);

    }

    const handleCloseSendOrderDraftDialog = () => {

        setOpenSendOrderDraftDialog(false);

    }


    if (!order || !orderBoxes || !suppliers || (selectingItem && (!itemsFromSupplier || !supplier))) {
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
                            {order.id + '. '}
                        </Typography>
                        <Typography variant="h2" sx={{ mt: 0.5, mb: 0.5, ml: 0.5, color: 'text.secondary' }}>
                            <FormattedMessage id="project.orders.OrderDetails.orderState"></FormattedMessage>
                            {order.state === 0 &&
                                <FormattedMessage id="project.orders.OrderDetails.draftState"></FormattedMessage>
                            }
                            {order.state === 1 &&
                                <FormattedMessage id="project.orders.OrderDetails.sentToAdmin"></FormattedMessage>
                            }
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
                                gap: 1
                            }}
                        >
                            {order.state === 0 &&
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpenSelectSupplierDialog}
                                >
                                    <FormattedMessage id="project.orders.OrderDetails.button.addBox" />
                                </Button>
                            }
                            {order.state === 0 &&
                                <Button
                                    variant="contained"
                                    color="alertRed"
                                    onClick={handleOpenDeleteOrderDialog}
                                >
                                    <FormattedMessage id="project.orders.OrderDetails.button.DeleteOrder" />
                                </Button>
                            }
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
                            <Boxes boxes={orderBoxes} orderId={orderId}/>
                        </Box>
                    }
                    <Dialog
                        fullScreen={fullScreen}
                        open={openSelectSupplierDialog}
                        onClose={handleCloseSelectSupplierDialog}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                {<FormattedMessage id="project.orders.OrderDetails.selectSupplier.title" />}
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
                                        <FormattedMessage id="project.global.fields.supplier" />
                                    </InputLabel>
                                    <Select
                                        value={supplierSelectedId || ''}
                                        label={<FormattedMessage id="project.global.fields.supplier" />}
                                        onChange={(e) => {
                                            setSupplierSelectedId(e.target.value);
                                        }}
                                    >
                                        {suppliers && suppliers.map(supplier =>
                                            <MenuItem key={supplier.id} value={supplier.id}>
                                                <Typography>
                                                    {supplier.name}
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
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                disabled={!supplierSelectedId}
                                onClick={(e) => handleSelectSupplier(e)}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.CheckSupplierCatalog"></FormattedMessage>
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                color="alertRed"
                                onClick={handleCloseSelectSupplierDialog}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                </Typography>
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        fullScreen={true}
                        open={openSelectItemDialog}
                        onClose={handleCloseSelectItemDialog}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                {<FormattedMessage id="project.orders.OrderDetails.selectItem.title" />}
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
                                {(itemsFromSupplier && itemsFromSupplier.result.items.length === 0) ?
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
                                                <FormattedMessage id="project.items.ItemsFromSupplier.noItems" />
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
                                        <Box sx={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                                            gap: 2,
                                            justifyContent: "center",
                                            alignItems: "start",
                                            mt: 1,
                                            mb: 1,
                                        }}>
                                            {itemsFromSupplier && itemsFromSupplier.result.items.map(item => (
                                                <Card sx={{ maxWidth: 340, m: "auto", border: `1px solid ${theme.palette.primary.main}` }}>
                                                    <CardActionArea onClick={() => handleSelectItem(item.id)}>
                                                        <CardMedia
                                                            component="img"
                                                            height="200"
                                                            src={`data:image/jpeg;base64,${item.imgFile}`}
                                                            alt="item image">
                                                        </CardMedia>
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h2" component="div">
                                                                {item.itemName}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                                                                {item.referenceCode}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <CardActions>
                                                        <Button size="small" color="primary">
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            ))}
                                        </Box>
                                        {itemsFromSupplier && (itemsFromSupplier.result.existMoreItems || itemsFromSupplier.criteria.page > 0) &&
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mt: 1,
                                                    mb: 1,
                                                }}>
                                                <ButtonGroup color="primary" size="small" variant="contained" aria-label="Basic button group">
                                                    <Button
                                                        disabled={itemsFromSupplier.criteria.page < 1}
                                                        onClick={() => dispatch(itemsActions.previousFindItemsFromSupplierResultPage(itemsFromSupplier.criteria))}>
                                                        <WestIcon />
                                                    </Button>
                                                    <Button
                                                        disabled={!itemsFromSupplier.result.existMoreItems}
                                                        onClick={() => dispatch(itemsActions.nextFindItemsFromSupplierResultPage(itemsFromSupplier.criteria))}>
                                                        <EastIcon />
                                                    </Button>
                                                </ButtonGroup>
                                            </Box>
                                        }
                                    </Box>
                                }
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="alertRed"
                                onClick={handleCloseSelectItemDialog}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                </Typography>
                            </Button>
                        </DialogActions>
                    </Dialog>
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
                                        disabled={true}
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
                    <Dialog
                        fullScreen={fullScreen}
                        open={openDeleteOrderDialog}
                        onClose={handleCloseDeleteOrderDialog}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                {<FormattedMessage id="project.orders.OrderDetails.deleteOrder.title" />}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                {<FormattedMessage id="project.orders.OrderDetails.deleteOrder.text" />}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={(e) => handleDeleteOrder(e)}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                color="alertRed"
                                onClick={handleCloseDeleteOrderDialog}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                </Typography>
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {order.state === 0 &&
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mt: "auto",
                                ml: 2,
                                mr: 2,
                                mb: 1,
                            }}>
                            <Button
                                disabled={orderBoxes.length === 0}
                                onClick={handleOpenSendOrderDraftDialog}
                                variant="contained"
                                sx={{ mb: 1 }}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.SendOrderDraft"></FormattedMessage>
                                </Typography>
                            </Button>
                        </Box>
                    }
                    <Dialog
                        fullScreen={fullScreen}
                        open={openSendOrderDraftDialog}
                        onClose={handleCloseSendOrderDraftDialog}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                {<FormattedMessage id="project.orders.OrderDetails.sendOrderDraft.title" />}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                {<FormattedMessage id="project.orders.OrderDetails.sendOrderDraft.text" />}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={(e) => handleSendOrderDraft(e)}
                                sx={{mt: 1, mb: 1}}>
                                <Typography>
                                    <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                color="alertRed"
                                onClick={handleCloseSendOrderDraftDialog}
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
