import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import admin from '../../admin';

import {BackButton, Errors} from '../../common';
import * as actions from '../actions';
import {
    Alert, AlertTitle,
    Box,
    Button, Collapse,
    Container, Dialog, DialogActions, DialogContent, FormControl, FormHelperText,
    Grid, IconButton,
    InputLabel, MenuItem,
    Paper, Select,
    TextField,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

const AddItemsToWarehouse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allWarehouses = useSelector(admin.selectors.getAllWarehouses);
    const [itemName, setItemName] = useState('');
    const [referenceCode, setReferenceCode] = useState('');
    const [numItems, setNumItems] = useState(0);
    const [barCode, setBarCode] = useState('');
    const [manufacturerRef, setManufacturerRef] = useState('');
    const [supplier, setSupplier] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [warehouseName, setWarehouseName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [openNumItemsBoxDialog, setOpenNumItemsBoxDialog] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [numItemsSuccess, setNumItemsSuccess] = useState(null);
    const [itemNameSuccess, setItemNameSuccess] = useState(null);
    const [warehouseNameSuccess, setWarehouseNameSuccess] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        itemName: false,
        referenceCode: false,
        numItems: false,
        barCode: false,
        manufacturerRef: false,
        supplier: false,
        warehouseName: false,
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleAddItemsToWarehouse = () => {

        const newRequiredAlerts = {
            itemName: itemName === '',
            referenceCode: referenceCode === '',
            numItems: numItems <= 0,
            barCode: barCode === '',
            manufacturerRef: manufacturerRef === '',
            supplier: supplier === '',
            warehouseName: warehouseName === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.itemName && !newRequiredAlerts.referenceCode &&
            !newRequiredAlerts.numItems && !newRequiredAlerts.barCode && !newRequiredAlerts.manufacturerRef &&
            !newRequiredAlerts.supplier && !newRequiredAlerts.warehouseName;
        setIsFormValid(newIsFormValid);

        if (newIsFormValid) {

            const formData = new FormData();

            formData.append('itemName', itemName.trim());
            formData.append('referenceCode', referenceCode.trim());
            formData.append('numItems', numItems.trim());
            formData.append('barCode', barCode.trim());
            formData.append('manufacturerRef', manufacturerRef.trim());
            formData.append('supplier', supplier.trim());
            formData.append('imgFile', imgFile);
            formData.append('warehouseName', warehouseName.trim());

            dispatch(actions.addItemBoxToWarehouse(
                formData,
                () => {
                    handleCloseSuccessMessage();
                    handleUpdateSuccessMessage(numItems);
                    handleCloseNumItemsBoxDialog();
                    setNumItems(0);
                },
                errors => setBackendErrors(errors)));

        }

    }

    const handleValidation = () => {
        const newRequiredAlerts = {
            itemName: itemName === '',
            referenceCode: referenceCode === '',
            numItems: numItems <= 0,
            barCode: barCode === '',
            manufacturerRef: manufacturerRef === '',
            supplier: supplier === '',
            warehouseName: warehouseName === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
    };

    const handleOpenNumItemsBoxDialog = () => {

        const newRequiredAlerts = {
            itemName: itemName === '',
            referenceCode: referenceCode === '',
            barCode: barCode === '',
            manufacturerRef: manufacturerRef === '',
            supplier: supplier === '',
            warehouseName: warehouseName === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.itemName && !newRequiredAlerts.referenceCode &&
            !newRequiredAlerts.barCode && !newRequiredAlerts.manufacturerRef && !newRequiredAlerts.supplier &&
            !newRequiredAlerts.warehouseName ;
        setIsFormValid(newIsFormValid);

        if (newIsFormValid) {
            setOpenNumItemsBoxDialog(true);
        }

    }

    const handleCloseNumItemsBoxDialog = () => {

        setOpenNumItemsBoxDialog(false);

    }

    const handleUpdateSuccessMessage = (numItemsInBox) => {

        setNumItemsSuccess(numItemsInBox);
        setItemNameSuccess(itemName);
        setWarehouseNameSuccess(warehouseName);
        setShowSuccessMessage(true);

    }

    const handleCloseSuccessMessage = () => {

        setShowSuccessMessage(false);

    }

    const handleRestoreFields = () => {

        handleRemoveImage();
        setItemName('');
        setReferenceCode('');
        setNumItems(0);
        setBarCode('');
        setManufacturerRef('');
        setSupplier('');
        setWarehouseName('');

    }

    const handleRemoveImage = () => {

        setImgFile(null);

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
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <Box>
                    <Collapse in={showSuccessMessage}>
                        <Alert
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setShowSuccessMessage(false);
                                    }}
                                >
                                    <CloseOutlinedIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            <AlertTitle><FormattedMessage id="project.items.AddItemsToWarehouse.success" /></AlertTitle>
                            <ul style={{ margin: 0 }}>
                                <FormattedMessage id="project.items.AddItemsToWarehouse.success1" />
                                {numItemsSuccess}
                                <FormattedMessage id="project.items.AddItemsToWarehouse.success2" />
                                {itemNameSuccess}
                                <FormattedMessage id="project.items.AddItemsToWarehouse.success3" />
                                {warehouseNameSuccess}
                                <FormattedMessage id="project.items.AddItemsToWarehouse.success4" />
                            </ul>
                        </Alert>
                    </Collapse>
                </Box>
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
                            <FormattedMessage id="project.items.AddItemsToWarehouse.title"></FormattedMessage>
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    name="itemName"
                                    required
                                    fullWidth
                                    id="itemName"
                                    label={<FormattedMessage id="project.global.fields.itemName" />}
                                    autoFocus
                                    error={requiredAlertMessages.itemName}
                                    helperText={requiredAlertMessages.itemName &&
                                        <FormattedMessage id="project.global.validator.required" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={referenceCode}
                                    onChange={(e) => setReferenceCode(e.target.value)}
                                    name="referenceCode"
                                    type='text'
                                    fullWidth
                                    required
                                    id="referenceCode"
                                    label={<FormattedMessage id="project.global.fields.referenceCode" />}
                                    error={requiredAlertMessages.referenceCode}
                                    helperText={requiredAlertMessages.referenceCode &&
                                        <FormattedMessage id="project.global.validator.required" />}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={barCode}
                                    onChange={(e) => setBarCode(e.target.value)}
                                    name="barCode"
                                    type='text'
                                    fullWidth
                                    required
                                    id="barCode"
                                    label={<FormattedMessage id="project.global.fields.barCode" />}
                                    error={requiredAlertMessages.barCode}
                                    helperText={requiredAlertMessages.barCode &&
                                        <FormattedMessage id="project.global.validator.required" />}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={manufacturerRef}
                                    onChange={(e) => setManufacturerRef(e.target.value)}
                                    name="manufacturerRef"
                                    type='text'
                                    fullWidth
                                    required
                                    id="manufacturerRef"
                                    label={<FormattedMessage id="project.global.fields.manufacturerRef" />}
                                    error={requiredAlertMessages.manufacturerRef}
                                    helperText={requiredAlertMessages.manufacturerRef &&
                                        <FormattedMessage id="project.global.validator.required" />}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    name="supplier"
                                    type='text'
                                    fullWidth
                                    required
                                    id="supplier"
                                    label={<FormattedMessage id="project.global.fields.supplier" />}
                                    error={requiredAlertMessages.supplier}
                                    helperText={requiredAlertMessages.supplier &&
                                        <FormattedMessage id="project.global.validator.required" />}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={requiredAlertMessages.warehouseName}>
                                    <InputLabel id="demo-simple-select-helper-label">
                                        <FormattedMessage id="project.global.fields.warehouseName" />
                                    </InputLabel>
                                    <Select
                                        value={warehouseName}
                                        label={<FormattedMessage id="project.global.fields.warehouseName" />}
                                        onChange={(e) => setWarehouseName(e.target.value)}>
                                        {allWarehouses.map(warehouse =>
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
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                m: 1
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    ml: "auto",
                                    mr: "auto",
                                    width: '100%'
                                }}>
                                <input
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={(e) => setImgFile(e.target.files[0])}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        sx={{ width: 225 }}
                                        component="span"
                                        startIcon={<ImageIcon />}>
                                        <FormattedMessage id="project.global.fields.imgFile" />
                                    </Button>
                                </label>
                                <IconButton
                                    aria-label="remove"
                                    disabled={!imgFile}
                                    color="alertRed"
                                    variant="contained"
                                    onClick={e => handleRemoveImage(e)}
                                    sx={{ mt: 1, mb: 1.5, ml: 0.5 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            {imgFile && (
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
                                        src={URL.createObjectURL(imgFile)}
                                        alt="Uploaded Image"
                                        style={{ maxWidth: '100%', maxHeight: 300 }}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openNumItemsBoxDialog}
                            onClose={handleCloseNumItemsBoxDialog}
                            aria-labelledby="responsive-dialog-title">
                            <DialogContent>
                                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                                <TextField
                                    value={numItems}
                                    onChange={(e) => setNumItems(e.target.value)}
                                    name="numItems"
                                    inputProps={{ type: 'number'}}
                                    required
                                    fullWidth
                                    id="numItems"
                                    label={<FormattedMessage id="project.global.fields.numItems" />}
                                    error={requiredAlertMessages.numItems}
                                    helperText={requiredAlertMessages.numItems &&
                                        <FormattedMessage id="project.global.validator.required" />}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={handleAddItemsToWarehouse}
                                    sx={{ mt: 1, mb: 1 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.AddBoxToWarehouse"></FormattedMessage>
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="alertRed"
                                    onClick={handleCloseNumItemsBoxDialog}
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            ml: "auto",
                            mr: "auto",
                            mb: 1,
                            gap: 1,
                        }}>
                        <Button
                            onClick={handleOpenNumItemsBoxDialog}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            <Typography>
                                <FormattedMessage id="project.global.buttons.AddItemsToWarehouseNext"></FormattedMessage>
                            </Typography>
                        </Button>
                        <Button
                            onClick={handleRestoreFields}
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            <Typography>
                                <FormattedMessage id="project.global.buttons.RestoreFields"></FormattedMessage>
                            </Typography>
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )


}

export default AddItemsToWarehouse;