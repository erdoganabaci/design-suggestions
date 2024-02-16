import React, { useState, useRef } from "react"
import { Paper } from "@mui/material"
import { useDrop } from "react-dnd"
import { Button, Typography, Box, Popover } from "@mui/material" // Import other MUI components as needed

const CustomPopover = ({ open, anchorEl, onClose, content }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2 }}>{content}</Typography>
    </Popover>
  )
}

const Canvas = () => {
  const [droppedItems, setDroppedItems] = useState([])
  const canvasRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)
  // const open = Boolean(anchorEl)
  const [open, setOpen] = useState(false) // State to control the visibility of the popover

  const handleClick = (event) => {
    // Set the current item as the anchor element and open the popover
    setAnchorEl(event.currentTarget)
    setOpen(true)
    // setCurrentItem(item);
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const [{ isOver }, dropRef] = useDrop({
    accept: ["button", "text", "image"], // Update accepted types if needed
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const handleDrop = (item) => {
    setDroppedItems([...droppedItems, item])
    setTimeout(() => setOpen(true), 1000)
  }

  // Render a dropped item based on its type
  const renderDroppedItem = (item) => {
    switch (item.type) {
      case "button":
        return (
          <Box mt={1}>
            <Button variant="contained" onClick={handleClick}>
              {item.text}
            </Button>
            <CustomPopover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              content={`Increasing sizing for ${item.text}`}
            />
          </Box>
        )
      case "text":
        return (
          <Box mt={1}>
            <Typography key={item.text} variant="body1" onClick={handleClick}>
              {item.text}
            </Typography>
            <CustomPopover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              content={`Increasing sizing for ${item.text}`}
            />
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
    <Paper ref={dropRef} style={{ minHeight: "400px", width: "300px", marginRight: 10 }}>
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
