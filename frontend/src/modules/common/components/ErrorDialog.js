import PropTypes from 'prop-types';
import {useIntl, FormattedMessage} from 'react-intl';

import {NetworkError} from '../../../backend';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const ErrorDialog = ({error, onClose}) => {

    const intl = useIntl();

    if (error == null) {
        return null;
    }

    const modalStyle = {display: 'block'}; 
    const message = error instanceof NetworkError ?
        intl.formatMessage({id: 'project.global.exceptions.NetworkError'}) :
        error.message;

    return (

        <Dialog open={!!error} onClose={onClose} aria-labelledby="error-dialog-title">
            <DialogTitle id="error-dialog-title">
                <FormattedMessage id="project.common.ErrorDialog.title" />
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" color="textSecondary">
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    <FormattedMessage id="project.global.buttons.Close" />
                </Button>
            </DialogActions>
        </Dialog>

    );

};

ErrorDialog.propTypes = {
    error: PropTypes.object,
    onClose: PropTypes.func.isRequired
}

export default ErrorDialog;
