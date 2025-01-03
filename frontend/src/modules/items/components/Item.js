import {useNavigate} from "react-router-dom";

import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, useTheme} from "@mui/material";

const Item = ({ item, fromSupplier }) => {

    const navigate = useNavigate();
    const theme = useTheme();

    const handleSeeItemDetails = (itemId) => {

        navigate(`/items/checkinventory/${itemId}`);

    }

    return(
        <Card sx={{ maxWidth: 340, m: "auto", border: `1px solid ${theme.palette.primary.main}` }}>
            <CardActionArea onClick={() => handleSeeItemDetails(item.id)}>
                {!fromSupplier &&
                    <CardMedia
                        component="img"
                        height="200"
                        src={`data:image/jpeg;base64,${item.imgFile}`}
                        alt="item image">
                    </CardMedia>
                }
                <CardContent>
                    <Typography gutterBottom variant="h2" component="div">
                        {item.itemName}
                    </Typography>
                    <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                        {item.referenceCode}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

export default Item;