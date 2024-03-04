import { useState, useRef } from "react"
import { Paper } from "@mui/material"
import { useDrop } from "react-dnd"
import { Button, Typography, Box } from "@mui/material" // Import other MUI components as needed
import { styled } from "@mui/material/styles"
import EditElementDialog from "./EditElementDialog"
// iPad-like styles
const Device = styled("div")(({ theme }) => ({
  border: "2px solid #000000",
  padding: "20px 24px 15px",
  borderRadius: "40px",
  minWidth: "768px",
  [theme.breakpoints.down("md")]: {
    // Adjust for screens smaller than 1200px
    minWidth: "300px", // Set minimum width to 300px for smaller screens
  },
  height: "85vh",
  boxSizing: "content-box",
}))

const Camera = styled("div")({
  height: "12px",
  width: "12px",
  margin: "0 auto 3px",
  border: "2px solid #000000",
  borderRadius: "12px",
})

const Screen = styled("div")(({ theme }) => ({
  height: "75vh",
  minWidth: "768px",
  [theme.breakpoints.down("md")]: {
    // Adjust for screens smaller than 1200px
    minWidth: "300px", // Set minimum width to 300px for smaller screens
  },
  // width: "100%",
  border: "1px solid #000000",
  backgroundColor: "#000",
  overflow: "hidden",
  borderRadius: "3px",
}))

const ButtonCircle = styled("div")({
  margin: "15px auto 0",
  height: "45px",
  width: "45px",
  border: "2px solid #000000",
  borderRadius: "60px",
})

const uniqueId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const Canvas = () => {
  const dropRef = useRef(null)
  const [droppedItems, setDroppedItems] = useState([])
  const [editingItem, setEditingItem] = useState(null) // To track the currently editing item
  const [editDialogOpen, setEditDialogOpen] = useState(false) // To track if the edit dialog is open

  const handleDrop = (item, monitor) => {
    if (!monitor) {
      console.log("Drop attempted without a monitor object")
      return
    }

    const didDrop = monitor.didDrop()
    console.log("Item didDrop", didDrop)

    if (didDrop) {
      console.log("Item already dropped")
      return
    }

    const clientOffset = monitor.getClientOffset()
    const componentRect = dropRef.current.getBoundingClientRect()

    if (clientOffset) {
      // Convert the drop coordinates to be relative to the canvas
      const x = clientOffset.x - componentRect.left
      const y = clientOffset.y - componentRect.top

      console.log("Dropping item at:", x, y)

      // Generate a unique ID for the new item
      const newItemId = uniqueId()

      // Create the new item with its properties and add it to the droppedItems array
      const newItem = {
        ...item,
        id: newItemId, // Assign a unique ID to the new item
        x: x,
        y: y,
      }

      setDroppedItems([...droppedItems, newItem])
    }
  }

  const [{ isOver }, drop] = useDrop({
    accept: ["button", "text", "image"], // Update accepted types if needed
    drop: (item, monitor) => handleDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  drop(dropRef) // Attach the drop ref here

  // Handler to open dialog for editing
  const handleDoubleClick = (item) => {
    setEditingItem(item)
    setEditDialogOpen(true)
  }

  // Handler to update text
  const handleTextChange = (newText) => {
    setEditingItem({ ...editingItem, text: newText })
  }

  // Handler to update color (for buttons)
  const handleColorChange = (newColor) => {
    setEditingItem({ ...editingItem, color: newColor })
  }

  // Handler to close the dialog and update the item in droppedItems
  const handleSaveDialog = () => {
    setEditDialogOpen(false)
    if (editingItem) {
      const updatedItems = droppedItems.map((item) =>
        item.id === editingItem.id ? { ...item, text: editingItem.text, color: editingItem.color } : item,
      )
      setDroppedItems(updatedItems)
    }
    setEditingItem(null) // Reset the editing item
  }

  const handleRemoveItem = (itemId) => {
    setDroppedItems(droppedItems.filter((item) => item.id !== itemId))
    setEditDialogOpen(false) // Close the dialog after removing the item
  }

  // Render a dropped item based on its type
  const renderDroppedItem = (item) => {
    switch (item.type) {
      case "button":
        return (
          <Box mt={1} onDoubleClick={() => handleDoubleClick(item)}>
            <Button variant="contained" key={item.text} style={{ backgroundColor: item.color }}>
              {item.text}
            </Button>
          </Box>
        )
      case "text":
        return (
          <Typography key={item.text} variant="body1" onDoubleClick={() => handleDoubleClick(item)}>
            {item.text}
          </Typography>
        )
      case "image":
        return (
          <Box
            key={item.src}
            component="img"
            src={item.src}
            alt={item.alt}
            sx={{ width: "100px", height: "100px", marginTop: 1 }}
            onDoubleClick={() => handleDoubleClick(item)}
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
    <>
      <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline", color: "black", textAlign: "center" }}>
        Canvas
      </Typography>
      <Device id={"device"}>
        <Camera />
        <Screen id={"screen"}>
          <Paper ref={dropRef} elevation={0} sx={{ height: "100%", bgcolor: "white" }}>
            <Box sx={{ position: "relative" }}>
              {droppedItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    // any other styling for positioning
                  }}
                >
                  {renderDroppedItem(item)}
                </div>
              ))}
            </Box>
          </Paper>
        </Screen>
        <ButtonCircle />
      </Device>

      <EditElementDialog
        open={editDialogOpen}
        onClose={handleSaveDialog}
        element={editingItem}
        onTextChange={handleTextChange}
        onColorChange={handleColorChange}
        onRemove={handleRemoveItem}
      />
    </>
  )
}

export default Canvas
