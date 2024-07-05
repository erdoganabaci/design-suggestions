import React from "react"
import { List, ListItem, ListItemText, Button } from "@mui/material"
import DraggableElement from "./DraggableSidebarElement" // Import other drag/drop components as needed

const Sidebar = () => {
  const elements = [
    { type: "button", text: "Button" },
    { type: "text", text: "Heading" },
    { type: "image", src: "https://placehold.co/600x400/black/white", alt: "Image description" },
    // Add more elements as needed
  ]

  return (
    <List>
      {elements.map((element) => (
        <ListItem key={element.type}>
          <DraggableElement type={element.type} text={element.text} src={element.src} alt={element.alt} />
        </ListItem>
      ))}
    </List>
  )
}

export default Sidebar
