import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as actions from "../actions";
import * as selectors from "../selectors";
import {Alert, Box, Button, ButtonGroup, Container, Paper, Typography, useTheme} from "@mui/material";
import {BackButton, Errors} from "../../common";
import {FormattedMessage} from "react-intl";
import Items from "./Items";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";


const ItemsFromSupplier = () => {

    const dispatch = useDispatch();
    const supplier = useSelector(selectors.getSupplier);
    const itemsFromSupplier = useSelector(selectors.getItemsFromSupplier);
    const [backendErrors, setBackendErrors] = useState(null);
    const {id} = useParams();
    const theme = useTheme();

    useEffect(() => {

        const supplierId = Number(id);

        if (!Number.isNaN(supplierId)) {

            dispatch(actions.findSupplierById(supplierId));

        }

        return () => {
            dispatch(actions.clearSupplier());
        }

    }, [id, dispatch]);

    if (!supplier || !itemsFromSupplier) {
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
                            <FormattedMessage id="project.items.ItemsFromSupplier.title"></FormattedMessage>
                            {': '}
                            {supplier.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                    </Box>
                    {itemsFromSupplier.result.items.length === 0 ?
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
                            <Items items={itemsFromSupplier.result.items}/>
                            {(itemsFromSupplier.result.existMoreItems || itemsFromSupplier.criteria.page > 0) &&
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
                                            onClick={() => dispatch(actions.previousFindItemsFromSupplierResultPage(itemsFromSupplier.criteria))}>
                                            <WestIcon />
                                        </Button>
                                        <Button
                                            disabled={!itemsFromSupplier.result.existMoreItems}
                                            onClick={() => dispatch(actions.nextFindItemsFromSupplierResultPage(itemsFromSupplier.criteria))}>
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

export default ItemsFromSupplier;