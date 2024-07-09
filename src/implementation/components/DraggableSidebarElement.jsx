import React from "react"
import { useDrag } from "react-dnd"
import { Button, Typography, Box, Switch, FormControlLabel } from "@mui/material"

const DraggableElement = ({ type, text, src, alt }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, text, src, alt },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const renderElement = () => {
    switch (type) {
      case "button":
        return (
          <Button
            sx={{
              color: "black",
              backgroundColor: "#dde8fa",
              ":hover": {
                backgroundColor: "#dde8fa",
              },
            }}
            variant="contained"
          >
            {text}
          </Button>
        )
      case "text":
        return <Typography variant="body1">{text}</Typography>
      case "image":
        return <Box component="img" src={src} alt={alt} width={"100px"} height={"100px"} />
      case "switch":
        return (
          <FormControlLabel
            control={
              <Switch
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#00008B",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 139, 0.08)",
                    },
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#00008B",
                  },
                }}
              />
            }
            label={text}
            labelPlacement="start"
            sx={{ ml: -0.5, color: "black" }}
          />
        )
      default:
        return <div>Unsupported element type</div>
    }
  }

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {renderElement()}
    </div>
  )
}

export default DraggableElement
