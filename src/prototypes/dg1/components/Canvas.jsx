import { useState, useRef } from "react"
import { Paper } from "@mui/material"
import { useDrop } from "react-dnd"
import { Button, Typography, Box } from "@mui/material" // Import other MUI components as needed
import { styled } from "@mui/material/styles"

// iPad-like styles
const Device = styled("div")(({ theme }) => ({
  border: "2px solid #ccc",
  padding: "20px 24px 15px",
  borderRadius: "40px",
  width: "768px",
  height: "85vh",
  boxSizing: "content-box",
}))

const Camera = styled("div")({
  height: "12px",
  width: "12px",
  margin: "0 auto 3px",
  border: "2px solid #ccc",
  borderRadius: "12px",
})

const Screen = styled("div")({
  height: "75vh",
  width: "768px",
  border: "1px solid #ccc",
  backgroundColor: "#000",
  overflow: "hidden",
  borderRadius: "3px",
})

const ButtonCircle = styled("div")({
  margin: "15px auto 0",
  height: "45px",
  width: "45px",
  border: "2px solid #ccc",
  borderRadius: "60px",
})

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
    <>
      <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline", color: "black", textAlign: "center" }}>
        Canvas
      </Typography>
      <Device id={"device"}>
        <Camera />
        <Screen id={"screen"}>
          <Paper ref={dropRef} elevation={0} sx={{ height: "100%", bgcolor: "white" }}>
            <Box sx={{ position: "relative" }}>{droppedItems.map((item) => renderDroppedItem(item))}</Box>
          </Paper>
        </Screen>
        <ButtonCircle />
      </Device>
    </>
  )
}

export default Canvas
