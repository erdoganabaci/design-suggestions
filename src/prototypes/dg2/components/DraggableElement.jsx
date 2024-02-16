import React from "react"
import { useDrag } from "react-dnd"
import { Button, Typography, Box } from "@mui/material" // Import other MUI components as needed

const DraggableElement = ({ type, text, src, alt }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, text, src, alt }, // Include all properties
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Function to determine and render rich elements
  const renderElement = () => {
    switch (type) {
      case "button":
        return <Button variant="contained">{text}</Button>
      case "text":
        return <Typography variant="body1">{text}</Typography>
      case "image":
        return <Box component="img" src={src} alt={alt} width={"100px"} height={"100px"} />
      default:
        return <div>Unsupported element type</div> // Handle unknown types
    }
  }

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {renderElement()}
    </div>
  )
}

export default DraggableElement
