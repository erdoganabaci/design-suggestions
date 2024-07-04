import React from "react"
import { useDrag } from "react-dnd"
import { Button, Typography, Box } from "@mui/material"
import SmartHomeSwitch from "./SmartHomeSwitch" // Ensure this is imported correctly

const DraggableElementCanvas = ({ type, text, src, alt, color, textColor, id, x, y, checked, onDoubleClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, text, src, alt, id, x, y }, // Include all properties
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Function to determine and render rich elements
  const renderElement = () => {
    switch (type) {
      case "button":
        return (
          <Button variant="contained" style={{ backgroundColor: color, color: textColor ? textColor : "black" }}>
            {text}
          </Button>
        )
      case "text":
        return <Typography variant="body1">{text}</Typography>
      case "image":
        return <Box component="img" src={src} alt={alt} sx={{ width: "100px", height: "100px", marginTop: 1 }} />
      case "switch":
        return <SmartHomeSwitch label={text ? text : alt} checked={checked} />
      default:
        return <Typography color="error">Unsupported element type</Typography>
    }
  }

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
      onDoubleClick={onDoubleClick}
    >
      {renderElement()}
    </div>
  )
}

export default DraggableElementCanvas
