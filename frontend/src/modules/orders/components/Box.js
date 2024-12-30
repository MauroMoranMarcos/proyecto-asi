import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as actions from "../actions";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const Box = ({ box, orderId }) => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const intl = useIntl();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [openEditBoxDialog, setOpenEditBoxDialog] = useState(false);
    const [numBoxes, setNumBoxes] = useState(box.numBoxes);

    const handleDeleteBox = () => {
        dispatch(actions.deleteBoxInOrder(orderId, box.id, () => {}, () => {}));
    };

    const handleUpdateNumBoxes = () => {
        dispatch(actions.updateNumBoxesInOrder(orderId, box.id, numBoxes, handleCloseEditDialog, () => {}));
    };

    const handleOpenEditDialog = () => {
        setOpenEditBoxDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditBoxDialog(false);
    };

    return (
        <>
            <Card sx={{ maxWidth: 340, m: "auto", border: `1px solid ${theme.palette.primary.main}` }}>
                <CardContent>
                    <Typography gutterBottom variant="h2" component="div">
                        {box && box.itemName}
                    </Typography>
                    <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                        <FormattedMessage id="project.orders.Box.numberOfBoxes" />
                        {box && box.numBoxes}
                    </Typography>
                    <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                        <FormattedMessage id="project.orders.Box.numberOfItemsPerBox" />
                        {box && box.numItemsInBox}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        aria-label="update"
                        color=""
                        variant="contained"
                        onClick={handleOpenEditDialog}
                        sx={{ mt: 1, mb: 1.5, ml: "auto" }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="remove"
                        color=""
                        variant="contained"
                        onClick={handleDeleteBox}
                        sx={{ mt: 1, mb: 1.5, ml: "auto" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Dialog
                fullScreen={fullScreen}
                open={openEditBoxDialog}
                onClose={handleCloseEditDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        {intl.formatMessage({ id: "project.orders.OrderDetails.UpdateNumBoxes.title" }) + box.itemName}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={numBoxes}
                        onChange={(e) => setNumBoxes(e.target.value)}
                        name="numBoxes"
                        required
                        fullWidth
                        id="numBoxes"
                        label={<FormattedMessage id="project.global.fields.numBoxes" />}
                        autoFocus
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleUpdateNumBoxes}
                        sx={{ mt: 1, mb: 1 }}
                    >
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Update" />
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="alertRed"
                        onClick={handleCloseEditDialog}
                        sx={{ mt: 1, mb: 1 }}
                    >
                        <Typography>
                            <FormattedMessage id="project.global.buttons.Cancel" />
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Box;
