import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useEffect, useState} from "react";
import {
    Alert,
    Box,
    Button, ButtonGroup, Card, CardActionArea, CardContent,
    Container,
    Paper,
    Typography, useTheme
} from "@mui/material";
import {BackButton, Errors} from "../../common";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

const OrdersSentToAdmins = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ordersSentToAdmins = useSelector(selectors.getOrders);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();

    useEffect(() => {

        dispatch(actions.findOrdersSentToAdmins({page: 0}));

    }, []);

    const handleSeeOrderInDetails = (orderSentToAdminId) => {

        navigate(`/orders/${orderSentToAdminId}`);

    }

    if (!ordersSentToAdmins) {
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
                            <FormattedMessage id="project.orders.OrdersSentToAdmins.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                    </Box>
                    {ordersSentToAdmins.result.items.length === 0 ?
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
                                    <FormattedMessage id="project.orders.OrdersSentToAdmins.noOrdersSentToAdmins" />
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
                                {ordersSentToAdmins.result.items.map(orderSentToAdmin => (
                                    <Card sx={{ maxWidth: 340, minWidth: 200, m: "auto", border: `1px solid ${theme.palette.secondary.main}` }}>
                                        <CardActionArea onClick={() => handleSeeOrderInDetails(orderSentToAdmin.id)}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h2" component="div">
                                                    <FormattedMessage id="project.orders.OrderDrafts.orderDraftWithId" />
                                                    {orderSentToAdmin.id}
                                                </Typography>
                                                <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                                                    <FormattedMessage id="project.orders.OrderDrafts.orderState" />
                                                    {orderSentToAdmin.state === 0 &&
                                                        <FormattedMessage id="project.orders.OrderDrafts.thisOrderIsADraft" />
                                                    }
                                                    {orderSentToAdmin.state === 1 &&
                                                        <FormattedMessage id="project.orders.OrderDrafts.thisOrderIsSentToAdmin" />
                                                    }
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </Box>
                            {(ordersSentToAdmins.result.existMoreItems || ordersSentToAdmins.criteria.page > 0) &&
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
                                            disabled={ordersSentToAdmins.criteria.page < 1}
                                            onClick={() => dispatch(actions.previousFindOrdersSentToAdminsResultPage(ordersSentToAdmins.criteria))}>
                                            <WestIcon />
                                        </Button>
                                        <Button
                                            disabled={!ordersSentToAdmins.result.existMoreItems}
                                            onClick={() => dispatch(actions.nextFindOrdersSentToAdminsResultPage(ordersSentToAdmins.criteria))}>
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

export default OrdersSentToAdmins;