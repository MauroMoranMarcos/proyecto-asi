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

const OrderHistory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderHistory = useSelector(selectors.getOrders);
    const [backendErrors, setBackendErrors] = useState(null);
    const theme = useTheme();

    useEffect(() => {

        dispatch(actions.findOrderHistory({page: 0}));

    }, []);

    const handleSeeOrderInDetails = (orderFromHistory) => {

        navigate(`/orders/${orderFromHistory}`);

    }

    const formatOrderDate = (isoDate) => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };


    if (!orderHistory) {
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
                            <FormattedMessage id="project.orders.OrderHistory.title"></FormattedMessage>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            ml: 1,
                            mr: 1,
                        }}>
                    </Box>
                    {orderHistory.result.items.length === 0 ?
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
                                    <FormattedMessage id="project.orders.OrderHistory.noOrdersInHistory" />
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
                                {orderHistory.result.items.map(order => (
                                    <Card sx={{ maxWidth: 340, minWidth: 200, m: "auto", border: `1px solid ${theme.palette.secondary.main}` }}>
                                        <CardActionArea onClick={() => handleSeeOrderInDetails(order.id)}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h2" component="div">
                                                    <FormattedMessage id="project.orders.OrderDrafts.orderDraftWithId" />
                                                    {order.id}
                                                </Typography>
                                                <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                                                    <FormattedMessage id="project.orders.OrderDrafts.orderState" />
                                                    {order.state === 0 &&
                                                        <FormattedMessage id="project.orders.OrderDrafts.thisOrderIsADraft" />
                                                    }
                                                    {order.state === 1 &&
                                                        <FormattedMessage id="project.orders.OrderDrafts.thisOrderIsSentToAdmin" />
                                                    }
                                                    {order.state === 2 &&
                                                        <FormattedMessage id="project.orders.OrderDrafts.thisOrderIsDone" />
                                                    }
                                                    {order.state === 3 &&
                                                        <FormattedMessage id="project.orders.OrderDrafts.thisOrderIsStored" />
                                                    }
                                                </Typography>
                                                <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                                                    <FormattedMessage id="project.orders.OrderHistory.orderDate" />
                                                    {order.orderDate && formatOrderDate(order.orderDate)}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </Box>
                            {(orderHistory.result.existMoreItems || orderHistory.criteria.page > 0) &&
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
                                            disabled={orderHistory.criteria.page < 1}
                                            onClick={() => dispatch(actions.previousFindOrderHistoryResultPage(orderHistory.criteria))}>
                                            <WestIcon />
                                        </Button>
                                        <Button
                                            disabled={!orderHistory.result.existMoreItems}
                                            onClick={() => dispatch(actions.nextFindOrderHistoryResultPage(orderHistory.criteria))}>
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

export default OrderHistory;