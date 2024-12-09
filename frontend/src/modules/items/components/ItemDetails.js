import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Alert, Box, Button, ButtonGroup, Container, Paper, Typography, useTheme} from "@mui/material";
import {BackButton, Errors} from "../../common";

const ItemDetails = () => {

    const dispatch = useDispatch();
    const item = useSelector(selectors.getItem);
    const [backendErrors, setBackendErrors] = useState(null);
    const {id} = useParams();
    const theme = useTheme();

    useEffect(() => {

        const itemBoxId = Number(id);

        if (!Number.isNaN(itemBoxId)) {

            dispatch(actions.findItemBoxById(itemBoxId));

        }

        return () => {
            dispatch(actions.clearItem());
        }

    }, [id, dispatch]);

    if (!item) {
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
                                {': '}
                            </Typography>
                            <Typography gutterBottom variant="h3">
                                <FormattedMessage id="project.items.ItemDetails.fields.numItems" />
                                {': ' + item.numItems}
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
                                {': ' + item.supplier}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )


}

export default ItemDetails;