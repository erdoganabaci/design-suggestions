import { useState } from "react"
import { Box, IconButton } from "@mui/material"

import DesignSuggestions from "./DesignSuggestions"
import CloseIcon from "@mui/icons-material/Close"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
const DialogRectangleBox = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        size="large"
        sx={{
          position: "absolute",
          top: "15%",
          left: "70%",
          zIndex: 2,
          color: "black",
        }}
      >
        {isOpen ? null : <ChatBubbleIcon />}
      </IconButton>
      {isOpen && (
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
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            size="small"
            sx={{
              width: "1px",
              height: "1px",
              marginLeft: "17rem",
              position: "relative",
              color: "black",
              zIndex: 2,
            }}
          >
            {<CloseIcon />}
          </IconButton>
          <Box sx={{ overflow: "auto", height: 220, mt: "-1rem" }}>
            <DesignSuggestions />
          </Box>
        </Box>
      )}
    </>
  )
}

export default DialogRectangleBox
