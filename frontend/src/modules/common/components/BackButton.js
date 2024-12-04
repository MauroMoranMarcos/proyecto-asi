import {useNavigate} from "react-router-dom";

import {IconButton} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

const BackButton = () => {

    const navigate = useNavigate();

    return(
        <IconButton color="secondary" onClick={() => navigate(-1)} style={{ alignSelf: 'flex-start' }}>
            <ArrowBackIosNewOutlinedIcon />
        </IconButton>
    )

}

export default BackButton;