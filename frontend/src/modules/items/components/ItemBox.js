import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";

import * as actions from "../actions";

import admin from "../../admin";

import {
    Box, Button, Dialog, DialogActions, DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ItemBox = ({ itemBox, itemId }) => {

    const dispatch = useDispatch();
    const warehouses = useSelector(admin.selectors.getAllWarehouses);
    const [warehouseName, setWarehouseName] = useState(null);
    const [openDeleteItemBoxDialog, setOpenDeleteItemBoxDialog] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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

    const handleOpenDeleteItemBoxDialog = () => {

        setOpenDeleteItemBoxDialog(true);

    }

    const handleCloseDeleteItemBoxDialog = () => {

        setOpenDeleteItemBoxDialog(false);

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
                    <FormattedMessage id="project.items.ItemDetails.numItemsInBox" />
                </Typography>}/>
                <Box sx={{ m: 2, p: 1 }}>
                    <Typography sx={{ color: 'text.secondary' }}>{warehouseName}</Typography>
                </Box>
            </ListItemButton>
            <Box
                sx={{ mr: 0.5, ml: 0.5 }}>
                <Fab
                    sx={{ zIndex: 0 }}
                    size="small"
                    color="primary"
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
        </ListItem>
    )

}

export default ItemBox;