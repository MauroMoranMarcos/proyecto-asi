import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import * as actions from '../actions';
import * as selectors from '../selectors';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider, Link,
    Typography,
    useTheme
} from "@mui/material";
import Items from "./Items";
import {FormattedMessage} from "react-intl";

const Supplier = ({ supplier }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [itemsFromSupplier, setItemsFromSupplier] = useState(null);
    const theme = useTheme();

    useEffect(() => {

        if (supplier && supplier.id) {
            dispatch(actions.findItemsFromSupplier({supplierId: supplier.id, page: 0},
                itemsFromSupplier => setItemsFromSupplier(itemsFromSupplier)));
        }

    }, [supplier, supplier.id]);

    const handleSeeAllItemsFromSupplier = () => {

        dispatch(actions.findItemsFromSupplier({supplierId: supplier.id, page: 0},
            () => {
                navigate(`/items/supplierscatalog/${supplier.id}/itemsfromsupplier`);
            }));

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
                    <Divider sx={{ m: "auto" }}></Divider>
                    <Items items={itemsFromSupplier.items} fromSupplier={true} />
                    {itemsFromSupplier.existMoreItems &&
                        <Box>
                            <Link
                                component="button"
                                variant="h3"
                                onClick={() => {
                                    handleSeeAllItemsFromSupplier();
                                }}
                            >
                                <FormattedMessage id="project.items.SuppliersCatalog.seeAllItemsFromSupplier" />
                            </Link>
                        </Box>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

export default Supplier;