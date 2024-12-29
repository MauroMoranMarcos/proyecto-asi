import {useNavigate} from "react-router-dom";

import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, useTheme} from "@mui/material";

const Box = ({ box }) => {

    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Card sx={{maxWidth: 340, m: "auto", border: `1px solid ${theme.palette.primary.main}`}}>
            <CardContent>
                <Typography gutterBottom variant="h2" component="div">
                    {box.itemName}
                </Typography>
                <Typography gutterBottom variant="h3" sx={{color: 'text.secondary'}}>
                    Number of boxes: {box.numBoxes}
                </Typography>
                <Typography gutterBottom variant="h3" sx={{color: 'text.secondary'}}>
                    Number of items per box: {box.numItemsInBox}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                </Button>
            </CardActions>
        </Card>
    )

}

export default Box;