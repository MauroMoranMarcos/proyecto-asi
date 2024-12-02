import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {Alert, AlertTitle, Box, IconButton} from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Errors = ({errors, onClose}) => {

    const intl = useIntl();

    if (!errors) {
        return null;
    }

    let globalError;
    let fieldErrors;

    if (errors.globalError) {
        globalError = errors.globalError;
    } else if (errors.fieldErrors) {
        fieldErrors = [];
        errors.fieldErrors.forEach(e => {
            let fieldName = intl.formatMessage({id: `project.global.fields.${e.fieldName}`});
            fieldErrors.push(`${fieldName}: ${e.message}`)
        });

    }

    return (
        <Box>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => onClose()}
                    >
                        <CloseOutlinedIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {globalError && <AlertTitle>Error</AlertTitle>}
                {globalError && globalError}
                {fieldErrors && (
                    <ul style={{ margin: 0 }}>
                        {fieldErrors.map((fieldError, index) => (
                            <li key={index}>{fieldError}</li>
                        ))}
                    </ul>
                )}
            </Alert>
        </Box>
    );

}

Errors.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClose: PropTypes.func.isRequired
};

export default Errors;
