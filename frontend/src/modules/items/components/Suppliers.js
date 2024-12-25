import {Box} from "@mui/material";
import Supplier from "./Supplier";

const Suppliers = ({ suppliers }) => {

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
            {suppliers.map(supplier => (
                <Supplier supplier={supplier}></Supplier>
            ))}
        </Box>

    );

}

export default Suppliers;