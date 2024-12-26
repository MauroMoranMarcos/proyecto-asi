import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as actions from '../actions';
import * as selectors from '../selectors';

import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    useTheme
} from "@mui/material";
import Items from "./Items";

const Supplier = ({ supplier }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [itemsFromSupplier, setItemsFromSupplier] = useState(null);
    const theme = useTheme();

    useEffect(() => {

        if (supplier && supplier.id) {
            dispatch(actions.findItemsFromSupplier(supplier.id, 0,
                itemsFromSupplier => setItemsFromSupplier(itemsFromSupplier)));
        }

    }, [supplier, supplier.id]);

    const handleSeeItemDetails = (itemId) => {

        navigate(`/items/checkinventory/${itemId}`);

    }

    if (!itemsFromSupplier) {
        return null;
    }

    return(
        <Card sx={{ maxWidth: 340, minWidth: 200, m: "auto", border: `1px solid ${theme.palette.secondary.main}` }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h2" component="div">
                        {supplier.name}
                    </Typography>
                    <Typography gutterBottom variant="h3" sx={{ color: 'text.secondary' }}>
                        {supplier.id}
                    </Typography>
                    <Divider sx={{ m: "auto" }}></Divider>
                    <Items items={itemsFromSupplier.items} fromSupplier={true} />
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

export default Supplier;