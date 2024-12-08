import {
    Box,
} from "@mui/material";
import Item from "./Item";

const Items = ({ items }) => {

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 2,
            justifyContent: "center",
            alignItems: "start",
            mt: 1,
            mb: 1,
        }}>
            {items.map(item => (
                <Item item={item}></Item>
            ))}
        </Box>

    );

}

export default Items;