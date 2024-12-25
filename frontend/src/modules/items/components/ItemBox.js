import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";

import * as actions from "../actions";

import admin from "../../admin";

import {
    Box, Button, Dialog, DialogActions, DialogContent,
    DialogTitle,
    Fab, FormControl, FormHelperText,
    IconButton, InputLabel,
    ListItem,
    ListItemButton,
    ListItemText, MenuItem, Select, TextField, Tooltip,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ItemBox = ({ itemBox, itemId }) => {

    const dispatch = useDispatch();
    const warehouses = useSelector(admin.selectors.getAllWarehouses);
    const [numItems, setNumItems] = useState(itemBox.numItems);
    const [numItemsToAdd, setNumItemsToAdd] = useState(null);
    const [numItemsToRemove, setNumItemsToRemove] = useState(null);
    const [warehouseName, setWarehouseName] = useState(null);
    const [openAddItemsToBoxDialog, setOpenAddItemsToBoxDialog] = useState(false);
    const [openRemoveItemsFromBoxDialog, setOpenRemoveItemsFromBoxDialog] = useState(false);
    const [openDeleteItemBoxDialog, setOpenDeleteItemBoxDialog] = useState(false);
    const [openEditItemBoxDialog, setOpenEditItemBoxDialog] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        numItems: false,
        warehouseName: false,
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const intl = useIntl();

    useEffect(() => {

        const warehouse = warehouses.find(w => w.id === itemBox.warehouseId);

        if (warehouse) {
            setWarehouseName(warehouse.name);
        }

    }, [warehouses, itemBox.warehouseId]);

    const handleDeleteItemBox = (itemBoxId) => {

        dispatch(actions.deleteItemBox(itemBoxId,
            () => {
                dispatch(actions.countNumBoxesOfItemId(itemId));
                dispatch(actions.findAllBoxesOfItemId(itemId));
                handleCloseDeleteItemBoxDialog();
            }, errors => setBackendErrors(errors)));

    }

    const handleEditItemBox = (itemBoxId) => {

        const newRequiredAlerts = {
            numItems: numItems <= 0,
            warehouseName: warehouseName === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.numItems && !newRequiredAlerts.warehouseName;

        if (newIsFormValid) {

            dispatch(actions.modifyItemBox(itemBoxId, numItems, warehouseName,
                () => {
                    dispatch(actions.findAllBoxesOfItemId(itemId));
                    handleCloseEditItemBoxDialog();
                }, errors => setBackendErrors(errors)));

        }

    }

    const handleAddItemsToBox = (itemBoxId) => {

        const newRequiredAlerts = {
            numItemsToAdd: numItemsToAdd <= 0,
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.numItemsToAdd;

        if (newIsFormValid) {

            dispatch(actions.addItemsToBox(itemBoxId, numItemsToAdd,
                () => {
                    dispatch(actions.findAllBoxesOfItemId(itemId));
                    handleCloseAddItemsToBoxDialog();
                }, errors => setBackendErrors(errors)));

        }

    }

    const handleRemoveItemsFromBox = (itemBoxId) => {

        const newRequiredAlerts = {
            numItemsToRemove: numItemsToRemove <= 0,
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.numItemsToRemove;

        if (newIsFormValid) {

            dispatch(actions.removeItemsFromBox(itemBoxId, numItemsToRemove,
                () => {
                    dispatch(actions.findAllBoxesOfItemId(itemId));
                    handleCloseRemoveItemsFromBoxDialog();
                }, errors => setBackendErrors(errors)));

        }

    }

    const handleOpenRemoveItemsFromBoxDialog = () => {

        setOpenRemoveItemsFromBoxDialog(true);

    }

    const handleCloseRemoveItemsFromBoxDialog = () => {

        setOpenRemoveItemsFromBoxDialog(false);

    }

    const handleOpenAddItemsToBoxDialog = () => {

        setOpenAddItemsToBoxDialog(true);

    }

    const handleCloseAddItemsToBoxDialog = () => {

        setOpenAddItemsToBoxDialog(false);

    }

    const handleOpenDeleteItemBoxDialog = () => {

        setOpenDeleteItemBoxDialog(true);

    }

    const handleCloseDeleteItemBoxDialog = () => {

        setOpenDeleteItemBoxDialog(false);

    }

    const handleOpenEditItemBoxDialog = () => {

        setOpenEditItemBoxDialog(true);

    }

    const handleCloseEditItemBoxDialog = () => {

        setOpenEditItemBoxDialog(false);

    }

    if (!warehouseName) {
        return null;
    }

    return(
        <ListItem disablePadding key={itemBox.id} sx={{ mb: 0.2, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '4px' }}>
            <ListItemButton>
                <ListItemText primary={<Typography variant="h3">
                    <FormattedMessage id="project.items.ItemDetails.box" />
                    {' ' + itemBox.id}
                </Typography>} secondary={<Typography sx={{ color: 'text.secondary' }}>
                    {itemBox.numItems + ' '}
                    <FormattedMessage id="project.items.ItemDetails.boxCapacity" />
                    {' (' + itemBox.currentNumItems + ' '}
                    <FormattedMessage id="project.items.ItemDetails.currentItems" />
                    {')'}
                </Typography>}/>
                <Box sx={{ m: 2, p: 1 }}>
                    <Typography sx={{ color: 'text.secondary' }}>{warehouseName}</Typography>
                </Box>
            </ListItemButton>
            <Box
                sx={{ mr: 0.5, ml: 1 }}>
                <Tooltip title={intl.formatMessage({ id: "project.items.ItemDetails.addItemsToBox.title" })} arrow>
                    <Fab
                        sx={{ zIndex: 0 }}
                        size="small"
                        color="success"
                        onClick={handleOpenAddItemsToBoxDialog}
                    >
                        <AddCircleOutlineIcon />
                    </Fab>
                </Tooltip>
            </Box>
            <Box
                sx={{ mr: 3, ml: 0.5 }}>
                <Tooltip title={intl.formatMessage({ id: "project.items.ItemDetails.removeItemsFromBox.title" })} arrow>
                    <Fab
                        sx={{ zIndex: 0 }}
                        size="small"
                        color="error"
                        onClick={handleOpenRemoveItemsFromBoxDialog}
                    >
                        <RemoveCircleOutlineIcon />
                    </Fab>
                </Tooltip>
            </Box>
            <Box
                sx={{ mr: 0.5, ml: 0.5 }}>
                <Fab
                    sx={{ zIndex: 0 }}
                    size="small"
                    color="primary"
                    onClick={handleOpenEditItemBoxDialog}
                >
                    <EditIcon />
                </Fab>
            </Box>
            <Box
                sx={{ mr: 0.5, ml: 0.5 }}>
                <Fab
                    sx={{ zIndex: 0 }}
                    size="small"
                    color="alertRed"
                    onClick={handleOpenDeleteItemBoxDialog}
                >
                    <DeleteForeverIcon />
                </Fab>
            </Box>
            <Dialog
                fullScreen={fullScreen}
                open={openDeleteItemBoxDialog}
                onClose={handleCloseDeleteItemBoxDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        {<FormattedMessage id="project.items.ItemDetails.deleteItemBox.title" />}
                    </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDeleteItemBoxDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseOutlinedIcon color="primary" />
                </IconButton>
                <DialogContent>
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Typography>
                            <FormattedMessage id="project.items.ItemDetails.deleteItemBox.text"></FormattedMessage>
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => handleDeleteItemBox(itemBox.id)}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="alertRed"
                        onClick={handleCloseDeleteItemBoxDialog}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                open={openAddItemsToBoxDialog}
                onClose={handleCloseAddItemsToBoxDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        {<FormattedMessage id="project.items.ItemDetails.addItemsToBox.title" />}
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
                            value={numItemsToAdd}
                            onChange={(e) => setNumItemsToAdd(e.target.value)}
                            name="numItemsToAdd"
                            type="number"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                            required
                            fullWidth
                            id="numItemsToAdd"
                            label={<FormattedMessage id="project.global.fields.numItemsToAdd" />}
                            error={requiredAlertMessages.numItemsToAdd}
                            helperText={requiredAlertMessages.numItemsToAdd &&
                                <FormattedMessage id="project.global.validator.required" />}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => handleAddItemsToBox(itemBox.id)}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="alertRed"
                        onClick={handleCloseAddItemsToBoxDialog}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                open={openRemoveItemsFromBoxDialog}
                onClose={handleCloseRemoveItemsFromBoxDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        {<FormattedMessage id="project.items.ItemDetails.removeItemsFromBox.title" />}
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
                            value={numItemsToRemove}
                            onChange={(e) => setNumItemsToRemove(e.target.value)}
                            name="numItemsToRemove"
                            type="number"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                            required
                            fullWidth
                            id="numItemsToRemove"
                            label={<FormattedMessage id="project.global.fields.numItemsToRemove" />}
                            error={requiredAlertMessages.numItemsToRemove}
                            helperText={requiredAlertMessages.numItemsToRemove &&
                                <FormattedMessage id="project.global.validator.required" />}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => handleRemoveItemsFromBox(itemBox.id)}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="alertRed"
                        onClick={handleCloseRemoveItemsFromBoxDialog}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                open={openEditItemBoxDialog}
                onClose={handleCloseEditItemBoxDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        {<FormattedMessage id="project.items.ItemBox.editItemBox.title" />}
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
                        <FormControl fullWidth error={requiredAlertMessages.warehouseName}>
                            <InputLabel id="demo-simple-select-helper-label">
                                <FormattedMessage id="project.global.fields.warehouseName" />
                            </InputLabel>
                            <Select
                                value={warehouseName}
                                label={<FormattedMessage id="project.global.fields.warehouseName" />}
                                onChange={(e) => setWarehouseName(e.target.value)}>
                                {warehouses.map(warehouse =>
                                    <MenuItem value={warehouse.name}>
                                        <Typography>
                                            {warehouse.name}
                                        </Typography>
                                    </MenuItem>
                                )}
                            </Select>
                            <FormHelperText color="alertRed">
                                {requiredAlertMessages.warehouseName &&
                                    <FormattedMessage id="project.global.validator.required" />}
                            </FormHelperText>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => handleEditItemBox(itemBox.id)}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="alertRed"
                        onClick={handleCloseEditItemBoxDialog}
                        sx={{ mt: 1, mb: 1 }}>
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    )

}

export default ItemBox;