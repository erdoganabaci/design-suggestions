import { useState, useRef } from "react"
import { Paper, Typography, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useDrop } from "react-dnd"
import { useAtom } from "jotai"
import { canvasDroppedItemsAtom } from "../store/droppedItems.atom"
import EditElementDialog from "./EditElementDialog"
import DraggableElementCanvas from "./DraggableElementCanvas"

const Device = styled("div")(({ theme }) => ({
  border: "2px solid #000000",
  padding: "20px 24px 15px",
  borderRadius: "40px",
  minWidth: "768px",
  [theme.breakpoints.down("md")]: {
    minWidth: "300px",
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
    minWidth: "300px",
  },
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
  const [editingItem, setEditingItem] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [canvasDroppedItems, setCanvasDroppedItems] = useAtom(canvasDroppedItemsAtom)

  const handleDrop = (item, monitor) => {
    if (!monitor) {
      console.log("Drop attempted without a monitor object")
      return
    }

    const didDrop = monitor.didDrop()
    if (didDrop) {
      console.log("Item already dropped")
      return
    }

    const clientOffset = monitor.getClientOffset()
    const componentRect = dropRef.current.getBoundingClientRect()
    if (clientOffset) {
      const x = clientOffset.x - componentRect.left
      const y = clientOffset.y - componentRect.top

      // Check if the item already exists in the canvasDroppedItems
      const existingItemIndex = canvasDroppedItems.findIndex((droppedItem) => droppedItem.id === item.id)

      if (existingItemIndex !== -1) {
        // Update the position of the existing item
        const updatedItems = [...canvasDroppedItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          x,
          y,
        }
        setCanvasDroppedItems(updatedItems)
      } else {
        // Add the new item with its properties and unique ID
        const newItemId = uniqueId()
        const newItem = {
          ...item,
          color: "#dde8fa",
          textColor: "black",
          id: newItemId,
          x,
          y,
        }
        setCanvasDroppedItems([...canvasDroppedItems, newItem])
      }
    }
  }

  const handleItemDrop = (id, x, y) => {
    const updatedItems = canvasDroppedItems.map((item) => (item.id === id ? { ...item, x, y } : item))
    setCanvasDroppedItems(updatedItems)
  }

  const [{ isOver }, drop] = useDrop({
    accept: ["button", "text", "image", "switch"],
    drop: (item, monitor) => handleDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  drop(dropRef)

  const handleDoubleClick = (item) => {
    setEditingItem(item)
    setEditDialogOpen(true)
  }

  const handleTextChange = (newText) => {
    setEditingItem({ ...editingItem, text: newText })
  }

  const handleColorChange = (newColor) => {
    setEditingItem({ ...editingItem, color: newColor })
  }

  const handleTextColorChange = (newColor) => {
    setEditingItem({ ...editingItem, textColor: newColor })
  }

  const handleSaveDialog = () => {
    setEditDialogOpen(false)
    if (editingItem) {
      const updatedItems = canvasDroppedItems.map((item) =>
        item.id === editingItem.id
          ? { ...item, text: editingItem.text, color: editingItem.color, textColor: editingItem.textColor }
          : item,
      )
      setCanvasDroppedItems(updatedItems)
    }
    setEditingItem(null)
  }

  const handleRemoveItem = (itemId) => {
    setCanvasDroppedItems(canvasDroppedItems.filter((item) => item.id !== itemId))
    setEditDialogOpen(false)
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
              {canvasDroppedItems.map((item) => (
                <DraggableElementCanvas
                  key={item.id}
                  type={item.type}
                  text={item.text}
                  src={item.src}
                  alt={item.alt}
                  color={item.color}
                  textColor={item.textColor}
                  id={item.id}
                  x={item.x}
                  y={item.y}
                  checked={item.checked}
                  onDoubleClick={() => handleDoubleClick(item)}
                />
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
        onTextColorChange={handleTextColorChange}
        onRemove={handleRemoveItem}
      />
    </>
  )
}

export default Canvas
