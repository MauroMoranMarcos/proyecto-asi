import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";

import * as selectors from '../selectors';
import * as actions from '../actions';

import admin from "../../admin";

import {
    Box,
    Button,
    Container, Dialog, DialogActions,
    DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel,
    Link, List, MenuItem,
    Paper, Select, TextField,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import {BackButton, Errors} from "../../common";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import ItemBox from "./ItemBox";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

const ItemDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const item = useSelector(selectors.getItem);
    const numItemBoxes = useSelector(selectors.getNumItemBoxes);
    const itemBoxes = useSelector(selectors.getItemBoxes);
    const warehouses = useSelector(admin.selectors.getAllWarehouses);
    const supplier = useSelector(selectors.getSupplier);
    const suppliers = useSelector(selectors.getSuppliers);
    const [numItems, setNumItems] = useState(null);
    const [warehouseName, setWarehouseName] = useState('');
    const [openSeeBoxesDialog, setOpenSeeBoxesDialog] = useState(false);
    const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);
    const [openAddItemBoxDialog, setOpenAddItemBoxDialog] = useState(false);
    const [openModifyItemDialog, setOpenModifyItemDialog] = useState(false);
    const [itemName, setItemName] = useState(null);
    const [referenceCode, setReferenceCode] = useState(null);
    const [barCode, setBarCode] = useState(null);
    const [manufacturerRef, setManufacturerRef] = useState(null);
    //const [supplier, setSupplier] = useState(null);
    const [supplierName, setSupplierName] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [newImgFile, setNewImgfile] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        numItems: false,
        warehouseName: false,
    });
    const [requiredAlertMessagesEdit, setRequiredAlertMessagesEdit] = useState({
        itemName: false,
        referenceCode: false,
        barCode: false,
        manufacturerRef: false,
        supplier: false,
    });
    const {id} = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {

        const itemId = Number(id);

        if (!Number.isNaN(itemId)) {

            dispatch(actions.findItemById(itemId));
            dispatch(actions.countNumBoxesOfItemId(itemId));
            dispatch(actions.findAllBoxesOfItemId(itemId));

        }

        return () => {
            dispatch(actions.clearItem());
        }

    }, [id, dispatch]);

    useEffect(() => {

        if (item && item.warehouseId) {

            const warehouse = warehouses.find(w => w.id === item.warehouseId);

            if (warehouse) {
                setWarehouseName(warehouse.name);
            }

        }

    }, [warehouses, item]);

    useEffect(() => {

        if (item && item.itemName && item.referenceCode && item.barCode && item.manufacturerRef && item.imgFile) {

            setItemName(item.itemName);
            setReferenceCode(item.referenceCode);
            setBarCode(item.barCode);
            setManufacturerRef(item.manufacturerRef);
            setImgFile(item.imgFile);

        }

    }, [item]);

    useEffect(() => {

        if (item && item.supplierId) {

            dispatch(actions.findSupplierById(item.supplierId));
            dispatch(actions.findAllSuppliers());

        }

    }, [item]);

    useEffect(() => {

        if (numItemBoxes === 0) {
            handleCloseSeeBoxesDialog();
        }

    }, [numItemBoxes]);

    const handleDeleteItem = (itemId) => {

        dispatch(actions.deleteItem(itemId,
            () => {
                handleCloseDeleteItemDialog();
                navigate("/items/checkinventory");
            }, errors => setBackendErrors(errors)));

    }

    const handleAddItemBox = (itemId) => {

        const newRequiredAlerts = {
            numItems: numItems <= 0,
            warehouseName: warehouseName === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.numItems && !newRequiredAlerts.warehouseName;
        setIsFormValid(newIsFormValid);

        if (newIsFormValid) {

            dispatch(actions.addItemBoxToWarehouse(itemId, numItems, warehouseName,
                () => {
                    dispatch(actions.findAllBoxesOfItemId(itemId));
                    dispatch(actions.countNumBoxesOfItemId(itemId));
                    handleCloseAddItemBoxDialog();
                    restoreFormFields();
                }, errors => setBackendErrors(errors)));

        }

    }

    const handleModifyItem = (itemId) => {

        const newRequiredAlerts = {
            itemName: itemName === '',
            referenceCode: referenceCode === '',
            barCode: barCode === '',
            manufacturerRef: manufacturerRef === '',
            supplier: supplier === '',
        };
        setRequiredAlertMessagesEdit(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.itemName && !newRequiredAlerts.referenceCode
            && !newRequiredAlerts.barCode && !newRequiredAlerts.manufacturerRef && !newRequiredAlerts.supplier;
        setIsFormValid(newIsFormValid);

        if (newIsFormValid) {

            const formData = new FormData();

            formData.append('itemName', itemName.trim());
            formData.append('referenceCode', referenceCode.trim());
            formData.append('barCode', barCode.trim());
            formData.append('manufacturerRef', manufacturerRef.trim());
            formData.append('supplier', supplierName.trim());
            if (newImgFile) {
                formData.append('imgFile', newImgFile);
            }

            dispatch(actions.modifyItem(
                itemId,
                formData,
                () => {
                    dispatch(actions.findItemById(itemId));
                    handleCloseModifyItemDialog();
                },
                errors => setBackendErrors(errors)));

        }

    }

    const restoreFormFields = () => {

        setNumItems(null);
        setWarehouseName('');

    }

    const handleOpenSeeBoxesDialog = () => {

        setOpenSeeBoxesDialog(true);

    }

    const handleCloseSeeBoxesDialog = () => {

        setOpenSeeBoxesDialog(false);

    }

    const handleOpenDeleteItemDialog = () => {

        setOpenDeleteItemDialog(true);

    }

    const handleCloseDeleteItemDialog = () => {

        setOpenDeleteItemDialog(false);

    }

    const handleOpenAddItemBoxDialog = () => {

        setOpenAddItemBoxDialog(true);

    }

    const handleCloseAddItemBoxDialog = () => {

        restoreFormFields();
        setOpenAddItemBoxDialog(false);

    }

    const handleOpenModifyItemDialog = () => {

        setSupplierName(supplier.name);
        setOpenModifyItemDialog(true);

    }

    const handleCloseModifyItemDialog = () => {

        setItemName(item.itemName);
        setReferenceCode(item.referenceCode);
        setBarCode(item.barCode);
        setManufacturerRef(item.manufacturerRef);
        setSupplierName(supplier.name);
        setImgFile(item.imgFile);

        setOpenModifyItemDialog(false);

    }

    const handleRemoveImage = () => {

        if (imgFile && !newImgFile) {
            setImgFile(null);
        }

        if (newImgFile) {
            setNewImgfile(null);
        }

    }

    if (!item || !itemBoxes || !supplier || !suppliers || numItemBoxes === undefined) {
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
                            <FormattedMessage id="project.items.ItemDetails.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                m: 1,
                                borderTop: `1px solid ${theme.palette.primary.main}`,
                                borderBottom: `1px solid ${theme.palette.primary.main}`,
                                borderLeft: `1px solid ${theme.palette.primary.main}`,
                                borderRight: `1px solid ${theme.palette.primary.main}`,
                                borderRadius: '4px',
                                maxWidth: '40%'
                            }}>
                            <img
                                src={`data:image/jpeg;base64,${item.imgFile}`}
                                style={{maxWidth: '100%', maxHeight: 300}}>
                            </img>
                        </Box>
                        <Box
                            sx={{
                                display: "column",
                                alignItems: "center",
                                justifyContent: "start",
                                m: 1,
                                p: 2,
                                borderTop: `1px solid ${theme.palette.primary.main}`,
                                borderBottom: `1px solid ${theme.palette.primary.main}`,
                                borderLeft: `1px solid ${theme.palette.primary.main}`,
                                borderRight: `1px solid ${theme.palette.primary.main}`,
                                borderRadius: '4px',
                                width: '100%'
                            }}>
                            <Typography gutterBottom variant="h3">
                                <FormattedMessage id="project.global.fields.itemName" />
                                {': ' + item.itemName}
                            </Typography>
                            <Typography gutterBottom variant="h3">
                                <FormattedMessage id="project.global.fields.referenceCode" />
                                {': ' + item.referenceCode}
                            </Typography>
                            <Typography gutterBottom variant="h3">
                                <FormattedMessage id="project.items.ItemDetails.fields.numBoxes" />
                                {': ' + numItemBoxes}
                                {numItemBoxes > 0 && '. '}
                                {numItemBoxes > 0 &&
                                    <FormattedMessage id="project.items.ItemDetails.allBoxes" />
                                }
                                {numItemBoxes > 0 &&
                                    <Link
                                        component="button"
                                        variant="h3"
                                        onClick={() => {
                                            handleOpenSeeBoxesDialog();
                                        }}
                                    >
                                        <FormattedMessage id="project.items.ItemDetails.allBoxesLink" />
                                    </Link>
                                }
                                {numItemBoxes > 0 && '.'}
                            </Typography>
                            <Typography gutterBottom variant="h3">
                                <FormattedMessage id="project.global.fields.barCode" />
                                {': ' + item.barCode}
                            </Typography>
                            <Typography gutterBottom variant="h3">
                                <FormattedMessage id="project.global.fields.manufacturerRef" />
                                {': ' + item.manufacturerRef}
                            </Typography>
                            <Typography gutterBottom variant="h3">
                                <FormattedMessage id="project.global.fields.supplier" />
                                {': ' + supplier.name}
                            </Typography>
                            <Dialog
                                fullScreen={fullScreen}
                                open={openSeeBoxesDialog}
                                onClose={handleCloseSeeBoxesDialog}
                                aria-labelledby="responsive-dialog-title">
                                <DialogTitle id="responsive-dialog-title">
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                        {numItemBoxes + ' '}
                                        {<FormattedMessage id="project.items.ItemDetails.seeBoxes.title" />}
                                        {' ' + item.itemName}
                                    </Typography>
                                </DialogTitle>
                                <DialogContent>
                                    <List
                                        sx={{bgcolor: 'background.paper', width: '100%' }}>
                                        {itemBoxes.map(itemBox =>
                                            <ItemBox itemBox={itemBox} itemId={item.id}/>
                                        )}
                                    </List>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleCloseSeeBoxesDialog}
                                        sx={{ mt: 1, mb: 1 }}>
                                        <Typography>
                                            <FormattedMessage id="project.global.buttons.Close"></FormattedMessage>
                                        </Typography>
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            m: 2,
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Button
                            sx={{ m: 1 }}
                            variant="contained"
                            onClick={e => handleOpenAddItemBoxDialog(e)}
                            color="primary"
                            startIcon={<AddBoxIcon />}
                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                            <Typography textAlign="center">
                                <FormattedMessage id="project.global.buttons.AddBox"></FormattedMessage>
                            </Typography>
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openAddItemBoxDialog}
                            onClose={handleCloseAddItemBoxDialog}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                    {<FormattedMessage id="project.items.ItemDetails.addItemBox.title" />}
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
                                    <Typography>
                                        <FormattedMessage id="project.items.ItemDetails.addItemBox.text"></FormattedMessage>
                                    </Typography>
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
                                        value={numItems}
                                        onChange={(e) => setNumItems(e.target.value)}
                                        name="numItems"
                                        type="number"
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                        required
                                        fullWidth
                                        id="numItems"
                                        label={<FormattedMessage id="project.global.fields.numItems" />}
                                        error={requiredAlertMessages.numItems}
                                        helperText={requiredAlertMessages.numItems &&
                                            <FormattedMessage id="project.global.validator.required" />}
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
                                    onClick={() => handleAddItemBox(item.id)}
                                    sx={{ mt: 1, mb: 1 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="alertRed"
                                    onClick={handleCloseAddItemBoxDialog}
                                    sx={{ mt: 1, mb: 1 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button
                            sx={{ m: 1 }}
                            variant="contained"
                            onClick={e => handleOpenModifyItemDialog(e)}
                            color="primary"
                            startIcon={<EditIcon />}
                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                            <Typography textAlign="center">
                                <FormattedMessage id="project.global.buttons.ModifyItem"></FormattedMessage>
                            </Typography>
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openModifyItemDialog}
                            onClose={handleCloseModifyItemDialog}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                    {<FormattedMessage id="project.items.ItemDetails.modifyItem.title" />}
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
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                        name="itemName"
                                        required
                                        fullWidth
                                        id="itemName"
                                        label={<FormattedMessage id="project.global.fields.itemName" />}
                                        autoFocus
                                        error={requiredAlertMessagesEdit.itemName}
                                        helperText={requiredAlertMessagesEdit.itemName &&
                                            <FormattedMessage id="project.global.validator.required" />}
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
                                        value={referenceCode}
                                        onChange={(e) => setReferenceCode(e.target.value)}
                                        name="referenceCode"
                                        required
                                        fullWidth
                                        id="referenceCode"
                                        label={<FormattedMessage id="project.global.fields.referenceCode" />}
                                        autoFocus
                                        error={requiredAlertMessagesEdit.referenceCode}
                                        helperText={requiredAlertMessagesEdit.referenceCode &&
                                            <FormattedMessage id="project.global.validator.required" />}
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
                                        value={barCode}
                                        onChange={(e) => setBarCode(e.target.value)}
                                        name="barCode"
                                        required
                                        fullWidth
                                        id="barCode"
                                        label={<FormattedMessage id="project.global.fields.barCode" />}
                                        autoFocus
                                        error={requiredAlertMessagesEdit.barCode}
                                        helperText={requiredAlertMessagesEdit.barCode &&
                                            <FormattedMessage id="project.global.validator.required" />}
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
                                        value={manufacturerRef}
                                        onChange={(e) => setManufacturerRef(e.target.value)}
                                        name="manufacturerRef"
                                        required
                                        fullWidth
                                        id="manufacturerRef"
                                        label={<FormattedMessage id="project.global.fields.manufacturerRef" />}
                                        autoFocus
                                        error={requiredAlertMessagesEdit.manufacturerRef}
                                        helperText={requiredAlertMessagesEdit.manufacturerRef &&
                                            <FormattedMessage id="project.global.validator.required" />}
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
                                    <FormControl fullWidth error={requiredAlertMessages.supplier}>
                                        <InputLabel id="demo-simple-select-helper-label">
                                            <FormattedMessage id="project.global.fields.supplier" />
                                        </InputLabel>
                                        <Select
                                            value={supplierName}
                                            label={<FormattedMessage id="project.global.fields.supplier" />}
                                            onChange={(e) => setSupplierName(e.target.value)}>
                                            {suppliers.map(supplier =>
                                                <MenuItem value={supplier.name}>
                                                    <Typography>
                                                        {supplier.name}
                                                    </Typography>
                                                </MenuItem>
                                            )}
                                        </Select>
                                        <FormHelperText color="alertRed">
                                            {requiredAlertMessages.supplier &&
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
                                    <input
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={(e) => setNewImgfile(e.target.files[0])}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button
                                            variant="contained"
                                            sx={{width: 225}}
                                            component="span"
                                            startIcon={<ImageIcon/>}>
                                            <FormattedMessage id="project.global.fields.imgFile"/>
                                        </Button>
                                    </label>
                                    <IconButton
                                        aria-label="remove"
                                        disabled={!imgFile && !newImgFile}
                                        color="alertRed"
                                        variant="contained"
                                        onClick={e => handleRemoveImage(e)}
                                        sx={{mt: 1, mb: 1.5, ml: 0.5}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                                {imgFile && !newImgFile && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            ml: "auto",
                                            mr: "auto",
                                            mb: 1,
                                        }}>
                                        <img
                                            src={`data:image/jpeg;base64,${item.imgFile}`}
                                            alt="Uploaded Image"
                                            style={{ maxWidth: '100%', maxHeight: 300 }}
                                        />
                                    </Box>
                                )}
                                {newImgFile && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            ml: "auto",
                                            mr: "auto",
                                            mb: 1,
                                        }}>
                                        <img
                                            src={URL.createObjectURL(newImgFile)}
                                            alt="Uploaded Image"
                                            style={{ maxWidth: '100%', maxHeight: 300 }}
                                        />
                                    </Box>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={() => handleModifyItem(item.id)}
                                    sx={{mt: 1, mb: 1}}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Save"></FormattedMessage>
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="alertRed"
                                    onClick={handleCloseModifyItemDialog}
                                    sx={{mt: 1, mb: 1}}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button
                            sx={{m: 1}}
                            variant="contained"
                            onClick={e => handleOpenDeleteItemDialog(e)}
                            color="alertRed"
                            startIcon={<DeleteForeverIcon />}
                            style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                            <Typography textAlign="center">
                                <FormattedMessage id="project.global.buttons.DeleteItem"></FormattedMessage>
                            </Typography>
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openDeleteItemDialog}
                            onClose={handleCloseDeleteItemDialog}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                    {<FormattedMessage id="project.items.ItemDetails.deleteItem.title" />}
                                </Typography>
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseDeleteItemDialog}
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
                                        <FormattedMessage id="project.items.ItemDetails.deleteItem.text"></FormattedMessage>
                                    </Typography>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDeleteItem(item.id)}
                                    sx={{ mt: 1, mb: 1 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Confirm"></FormattedMessage>
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="alertRed"
                                    onClick={handleCloseDeleteItemDialog}
                                    sx={{ mt: 1, mb: 1 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.Cancel"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )


}

export default ItemDetails;