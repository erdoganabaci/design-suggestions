import { Box } from "@mui/material"
import DesignSuggestions from "./DesignSuggestions"

const DialogRectangleBox = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "20%",
        left: "80%",
        transform: "translate(-50%, -50%)",
        width: 300,
        height: 220,
        backgroundColor: "white",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        "&:before": {
          content: '""',
          position: "absolute",
          top: "100%",
          left: "20px",
          width: 0,
          height: 0,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderTop: "20px solid black",
        },
      }}
    >
      <Box sx={{ overflow: "auto", height: 220 }}>
        <DesignSuggestions />
      </Box>
    </Box>
  )
}

export default DialogRectangleBox
