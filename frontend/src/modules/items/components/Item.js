import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, useTheme} from "@mui/material";

const Item = ({ item }) => {

    const theme = useTheme();

    return(
        <Card sx={{ maxWidth: 340, m: "auto", border: `1px solid ${theme.palette.primary.main}` }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    src={`data:image/jpeg;base64,${item.imgFile}`}
                    alt="item image">
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h2" component="div">
                        {item.itemName}
                    </Typography>
                    <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                        {item.referenceCode}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                </Button>
            </CardActions>
        </Card>
    )

}

export default Item;