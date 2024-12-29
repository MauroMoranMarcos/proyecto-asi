import { Box } from "@mui/material";
import OrderBox from "./Box";

const Boxes = ({ boxes }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "flex-start",
                alignItems: "stretch",
                mt: 1,
                mb: 1,
                width: "100%",
            }}
        >
            {boxes.map((box, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        marginBottom: 1,
                    }}
                >
                    <OrderBox box={box} />
                </Box>
            ))}
        </Box>
    );
}

export default Boxes;
