import React, { useState, useEffect } from "react"
import { Box, IconButton, Typography, Alert, AlertTitle, Button } from "@mui/material"
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

  const handleAcceptSuggestion = (suggestion) => {
    console.log("Accepted suggestion:", suggestion)
    // Here you would handle the acceptance of the suggestion,
    // such as applying the suggestion to the design.
  }

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
      <IconButton onClick={() => setIsOpen(!isOpen)} color="primary" size="large">
        {isOpen ? <CloseIcon /> : <PersonIcon />}
      </IconButton>
      {isOpen && (
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            marginTop: 1,
            boxShadow: 3,
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6">Design Suggestions:</Typography>
          {suggestions.map((suggestion, index) => (
            <Alert
              key={index}
              severity="warning"
              action={
                <Button color="inherit" size="small" onClick={() => handleAcceptSuggestion(suggestion)}>
                  ACCEPT
                </Button>
              }
              sx={{ marginBottom: 2 }}
            >
              <AlertTitle>Warning</AlertTitle>
              {suggestion}
            </Alert>
          ))}

          <DesignSuggestions />
        </Box>
      )}
    </Box>
  )
}

export default Chatbot
