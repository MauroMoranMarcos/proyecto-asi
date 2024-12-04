import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {BackButton, Errors} from '../../common';
import * as actions from '../actions';

import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const CreateWarehouse = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [warehouseName, setWarehouseName] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [requiredAlertMessages, setRequiredAlertMessages] = useState({
        warehouseName: false,
    });
    const theme = useTheme();

    let form;

    const handleSubmit = event => {

        event.preventDefault();

        handleValidation();

        if (form.checkValidity()) {

            dispatch(actions.createWarehouse(
                warehouseName,
                () => {
                    dispatch(actions.findAllWarehouses());
                    navigate('/');
                },
                errors => setBackendErrors(errors),
            ));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const handleValidation = () => {
        const newRequiredAlerts = {
            warehouseName: warehouseName === '',
        };
        setRequiredAlertMessages(newRequiredAlerts);
    };

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
                            <FormattedMessage id="project.admin.CreateWarehouse.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box component="form" ref={node => form = node} noValidate onSubmit={handleSubmit}
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
                                    value={warehouseName}
                                    onChange={(e) => setWarehouseName(e.target.value)}
                                    name="warehouseName"
                                    required
                                    fullWidth
                                    id="warehouseName"
                                    label={<FormattedMessage id="project.global.fields.warehouseName" />}
                                    autoFocus
                                    error={requiredAlertMessages.warehouseName}
                                    helperText={requiredAlertMessages.warehouseName &&
                                        <FormattedMessage id="project.global.validator.required" />}
                                />
                            </Grid>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    ml: "auto",
                                    mr: "auto",
                                    mb: 1,
                                }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}>
                                    <Typography>
                                        <FormattedMessage id="project.global.buttons.CreateWarehouse"></FormattedMessage>
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )


}

export default CreateWarehouse;