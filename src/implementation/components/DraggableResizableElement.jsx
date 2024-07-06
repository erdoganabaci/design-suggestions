import React from "react"
import { useDrag } from "react-dnd"
import { Button, Typography, Box } from "@mui/material"
import { ResizableBox } from "react-resizable"
import SmartHomeSwitch from "./SmartHomeSwitch" // Ensure this is imported correctly
import "react-resizable/css/styles.css"

const DraggableResizableElement = ({
  type,
  text,
  src,
  alt,
  color,
  textColor,
  id,
  x,
  y,
  width,
  height,
  checked,
  onDoubleClick,
  onResizeStop,
  onDragStop,
  fontSize,
}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type,
    item: { type, text, src, alt, id, x, y, width, height }, // Include all properties
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Function to determine and render rich elements
  const renderElement = () => {
    switch (type) {
      case "button":
        return (
          <Button
            variant="contained"
            style={{ backgroundColor: color, color: textColor ? textColor : "black", width: "100%", height: "100%" }}
          >
            {text}
          </Button>
        )
      case "text":
        return (
          <Typography variant="body1" style={{ width: "100%", height: "100%", fontSize: fontSize + "px" }}>
            {text}
          </Typography>
        )
      case "image":
        return <Box component="img" src={src} alt={alt} sx={{ width: "100%", height: "100%" }} />
      case "switch":
        return <SmartHomeSwitch label={text ? text : alt} checked={checked} />
      default:
        return <Typography color="error">Unsupported element type</Typography>
    }
  }

  return (
    <div ref={dragPreview} style={{ position: "absolute", left: `${x}px`, top: `${y}px` }}>
      <ResizableBox
        width={width}
        height={height}
        onResizeStop={(e, data) => onResizeStop(id, data.size.width, data.size.height)}
        minConstraints={[50, 50]}
        maxConstraints={[500, 500]}
        style={{ position: "relative" }}
      >
        <div
          ref={drag}
          style={{ width: "100%", height: "100%", opacity: isDragging ? 0.5 : 1 }}
          onDoubleClick={onDoubleClick}
        >
          {renderElement()}
        </div>
      </ResizableBox>
    </div>
  )
}

export default DraggableResizableElement
