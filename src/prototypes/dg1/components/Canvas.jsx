import React, { useState, useRef } from "react"
import { Paper } from "@mui/material"
import { useDrop } from "react-dnd"
import { Button, Typography, Box } from "@mui/material" // Import other MUI components as needed

const Canvas = () => {
  const [droppedItems, setDroppedItems] = useState([])
  const canvasRef = useRef(null)

  const [{ isOver }, dropRef] = useDrop({
    accept: ["button", "text", "image"], // Update accepted types if needed
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const handleDrop = (item) => {
    setDroppedItems([...droppedItems, item])
  }

  // Render a dropped item based on its type
  const renderDroppedItem = (item) => {
    switch (item.type) {
      case "button":
        return (
          <Box mt={1}>
            <Button variant="contained" key={item.text}>
              {item.text}
            </Button>
          </Box>
        )
      case "text":
        return (
          <Box mt={1}>
            <Typography key={item.text} variant="body1">
              {item.text}
            </Typography>
          </Box>
        )
      case "image":
        return (
          <Box
            key={item.src}
            component="img"
            src={item.src}
            alt={item.alt}
            sx={{ width: "100px", height: "100px", marginTop: 1 }}
          />
        )
      default:
        return (
          <Typography key="unsupported" color="error">
            Unsupported element type
          </Typography>
        ) // More visible feedback
    }
  }
  return (
    <Paper ref={dropRef} style={{ minHeight: "400px", width: "300px" }}>
      <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline" }}>
        Canvas
      </Typography>
      <Box style={{ position: "relative" }}>
        {/* For potential positioning */}
        {droppedItems.map((item) => renderDroppedItem(item))}
      </Box>
    </Paper>
  )
}

export default Canvas
