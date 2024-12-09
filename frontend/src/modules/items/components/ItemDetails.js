import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";

import * as selectors from '../selectors';
import * as actions from '../actions';
import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Container, Dialog, DialogActions,
    DialogContent, DialogTitle,
    Link, List, ListItem, ListItemButton, ListItemText,
    Paper, TextField,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import {BackButton, Errors} from "../../common";

const ItemDetails = () => {

    const dispatch = useDispatch();
    const item = useSelector(selectors.getItem);
    const [numBoxes, setNumBoxes] = useState(null);
    const [boxes, setBoxes] = useState(null);
    const [openSeeBoxesDialog, setOpenSeeBoxesDialog] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    const {id} = useParams();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {

        const itemBoxId = Number(id);

        if (!Number.isNaN(itemBoxId)) {

            dispatch(actions.findItemBoxById(itemBoxId));
            dispatch(actions.countNumBoxesOfItemBoxId(itemBoxId,
                numBoxes => setNumBoxes(numBoxes)));
            dispatch(actions.findAllBoxesOfItemBoxId(itemBoxId,
                boxes => setBoxes(boxes)));

        }

        return () => {
            dispatch(actions.clearItem());
        }

    }, [id, dispatch]);

    const handleOpenSeeBoxesDialog = () => {

        setOpenSeeBoxesDialog(true);

    }

    const handleCloseSeeBoxesDialog = () => {

        setOpenSeeBoxesDialog(false);

    }

    if (!item || !numBoxes || !boxes) {
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
                                {': ' + numBoxes + '. '}
                                <FormattedMessage id="project.items.ItemDetails.allBoxes" />
                                <Link
                                    component="button"
                                    variant="h3"
                                    onClick={() => {
                                        handleOpenSeeBoxesDialog();
                                    }}
                                >
                                    <FormattedMessage id="project.items.ItemDetails.allBoxesLink" />
                                </Link>
                                {'.'}
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
                            <Dialog
                                fullScreen={fullScreen}
                                open={openSeeBoxesDialog}
                                onClose={handleCloseSeeBoxesDialog}
                                aria-labelledby="responsive-dialog-title">
                                <DialogTitle id="responsive-dialog-title">
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                        {numBoxes + ' '}
                                        {<FormattedMessage id="project.items.ItemDetails.seeBoxes.title" />}
                                        {' ' + item.itemName}
                                    </Typography>
                                </DialogTitle>
                                <DialogContent>
                                    <List
                                        sx={{bgcolor: 'background.paper', width: '100%' }}>
                                        {boxes.map(box =>
                                            <ListItem disablePadding key={box.id} sx={{ mb: 0.2, border: `1px solid ${theme.palette.primary.main}`, borderRadius: '4px' }}>
                                                <ListItemButton>
                                                    <ListItemText primary={<Typography>
                                                        <FormattedMessage id="project.items.ItemDetails.box" />
                                                        {' ' + box.id}
                                                    </Typography>} secondary={<Typography>
                                                        {box.numItems + ' '}
                                                        <FormattedMessage id="project.items.ItemDetails.numItemsInBox" />
                                                    </Typography>}/>
                                                </ListItemButton>
                                            </ListItem>
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
                </Paper>
            </Box>
        </Container>
    )


}

export default ItemDetails;