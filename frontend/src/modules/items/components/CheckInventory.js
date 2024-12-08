import {FormattedMessage} from "react-intl";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as selectors from '../selectors';
import * as actions from '../actions';

import {
    Alert,
    AlertTitle,
    Box, Button, ButtonGroup,
    Collapse,
    Container, Dialog, DialogActions, DialogContent, FormControl, FormHelperText,
    Grid,
    IconButton, InputLabel, MenuItem,
    Paper, Select,
    TextField,
    Typography, useTheme
} from "@mui/material";
import {BackButton, Errors} from "../../common";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Items from "./Items";

const CheckInventory = () => {

    const dispatch = useDispatch();
    const items = useSelector(selectors.getItems);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();

    useEffect(() => {

        dispatch(actions.checkInventory({page: 0}));

    }, []);

    if (!items) {
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
                            <FormattedMessage id="project.items.CheckInventory.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                    </Box>
                    {items.result.items.length === 0 ?
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
                                    <FormattedMessage id="project.items.CheckInventory.noItems" />
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
                            <Items items={items.result.items}/>
                            {(items.result.existMoreItems || items.criteria.page > 0) &&
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
                                            disabled={items.criteria.page < 1}
                                            onClick={() => dispatch(actions.previousCheckInventoryResultPage(items.criteria))}>
                                            <WestIcon />
                                        </Button>
                                        <Button
                                            disabled={!items.result.existMoreItems}
                                            onClick={() => dispatch(actions.nextCheckInventoryResultPage(items.criteria))}>
                                            <EastIcon />
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            }
                        </Box>
                    }
                </Paper>
            </Box>
        </Container>
    )


}

export default CheckInventory;