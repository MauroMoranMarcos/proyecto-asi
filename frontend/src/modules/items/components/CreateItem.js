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

const CreateItem = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allWarehouses = useSelector(admin.selectors.getAllWarehouses);
    const [itemName, setItemName] = useState('');
    const [referenceCode, setReferenceCode] = useState('');
    const [barCode, setBarCode] = useState('');
    const [manufacturerRef, setManufacturerRef] = useState('');
    const [supplier, setSupplier] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [imgFileRequired, setImgFileRequied] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [numItemsSuccess, setNumItemsSuccess] = useState(null);
    const [itemNameSuccess, setItemNameSuccess] = useState(null);
    const [warehouseNameSuccess, setWarehouseNameSuccess] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        itemName: false,
        referenceCode: false,
        barCode: false,
        manufacturerRef: false,
        supplier: false,
        imgFile: false,
    });
    const theme = useTheme();

    const handleCreateItem = () => {

        const newRequiredAlerts = {
            itemName: itemName === '',
            referenceCode: referenceCode === '',
            barCode: barCode === '',
            manufacturerRef: manufacturerRef === '',
            supplier: supplier === '',
            imgFile: imgFile === null,
        };
        setRequiredAlertMessages(newRequiredAlerts);
        const newIsFormValid = !newRequiredAlerts.itemName && !newRequiredAlerts.referenceCode
            && !newRequiredAlerts.barCode && !newRequiredAlerts.manufacturerRef && !newRequiredAlerts.supplier
            && !newRequiredAlerts.imgFile;
        setIsFormValid(newIsFormValid);

        if (newRequiredAlerts.imgFile) {
            setImgFileRequied(true);
        }

        if (newIsFormValid) {

            const formData = new FormData();

            formData.append('itemName', itemName.trim());
            formData.append('referenceCode', referenceCode.trim());
            formData.append('barCode', barCode.trim());
            formData.append('manufacturerRef', manufacturerRef.trim());
            formData.append('supplier', supplier.trim());
            formData.append('imgFile', imgFile);

            dispatch(actions.createItem(
                formData,
                item => {
                    handleCloseSuccessMessage();
                    navigate(`/items/checkinventory/${item.id}`)
                },
                errors => setBackendErrors(errors)));

        }

    }

    const handleCloseSuccessMessage = () => {

        setShowSuccessMessage(false);

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
                            {imgFileRequired &&
                                <Alert variant="outlined" severity="error" onClose={() => setImgFileRequied(false)}>
                                    <FormattedMessage id="project.global.validator.imageRequired" />
                                </Alert>
                            }
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
                            onClick={handleCreateItem}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            <Typography>
                                <FormattedMessage id="project.global.buttons.CreateItem"></FormattedMessage>
                            </Typography>
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )


}

export default CreateItem;