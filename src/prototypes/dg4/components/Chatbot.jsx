import React, { useState, useEffect } from "react"
import { Box, IconButton, Typography } from "@mui/material"
// import ChatIcon from "@mui/icons-material/Chat"
import PersonIcon from "@mui/icons-material/Person"
import CloseIcon from "@mui/icons-material/Close"
import DesignSuggestions from "./DesignSuggestions"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  console.log("chatbot rendered")
  useEffect(() => {
    // Predefined rules or suggestions the chatbot would offer
    const predefinedSuggestions = [
      "Ensure text is legible and contrasts well against the background.",
      "Use consistent spacing and alignment for a clean layout.",
      "Consider the principles of visual hierarchy to guide the user's eye.",
    ]

    setSuggestions(predefinedSuggestions)
  }, [])

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
      <IconButton onClick={() => setIsOpen(!isOpen)} color="primary" size="large">
        {isOpen ? <CloseIcon /> : <PersonIcon />}
      </IconButton>
      {isOpen && (
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2, marginTop: 1, boxShadow: 3 }}>
          <Typography variant="h6">Design Suggestions:</Typography>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <Typography variant="body1">{suggestion}</Typography>
              </li>
            ))}
          </ul>

          <DesignSuggestions />
        </Box>
      )}
    </Box>
  )
}

export default Chatbot

{
  /* <Stack sx={{ width: '100%' }} spacing={2}>
<Alert severity="success">
  <AlertTitle>Success</AlertTitle>
  This is a success Alert with an encouraging title.
</Alert>
<Alert severity="info">
  <AlertTitle>Info</AlertTitle>
  This is an info Alert with an informative title.
</Alert>
<Alert severity="warning">
  <AlertTitle>Warning</AlertTitle>
  This is a warning Alert with a cautious title.
</Alert>
<Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  This is an error Alert with a scary title.
</Alert>
</Stack> */
}
