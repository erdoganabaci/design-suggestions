import { useState, useRef } from "react"
import { Paper } from "@mui/material"
import { useDrop } from "react-dnd"
import { Button, Typography, Box } from "@mui/material" // Import other MUI components as needed
import { styled } from "@mui/material/styles"

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

const Canvas = () => {
  const [droppedItems, setDroppedItems] = useState([])
  const dropRef = useRef(null)

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
      setDroppedItems([...droppedItems, { ...item, x, y }])
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
    </>
  )
}

export default Canvas
