import { useState, useEffect } from "react"
import { Grid, Paper, Typography, IconButton, Tooltip, Box } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { Button } from "@mui/material"

const DesignSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]) // Array to store your suggestions
  const [displaySuggestions, setDisplaySuggestions] = useState(false)
  // Fetch or generate suggestions upon relevant changes
  // (e.g., items dropped on the canvas)
  useEffect(
    () => {
      const newSuggestions = generateSuggestions() // Replace with your suggestion logic
      setSuggestions(newSuggestions)
    },
    [
      /* Dependencies for your suggestion logic */
    ],
  )

  useEffect(() => {}, [setTimeout(() => setDisplaySuggestions(true), 3000)])

  const generateSuggestions = () => {
    // Placeholder - Your logic to analyze canvas state and generate suggestions
    return [
      {
        title: "Spacing Adjustment",
        description: "Consider increasing margin...",
        image: "https://placehold.co/600x400/black/white", // Replace with your image path
      },
      {
        title: "Color Contrast",
        description: "Check accessibility ratios...",
        image: "https://placehold.co/600x400/black/white", // Replace with your image path
      },
      {
        title: "Color Contrast",
        description: "Resize image ...",
        image: "https://placehold.co/600x400/black/white", // Replace with your image path
      },
      // {
      //   title: "Color Contrast",
      //   description: "Check accessibility ratios...",
      //   image: "/path/to/preview2.jpg", // Replace with your image path
      // },
      // Add more suggestions here
    ]
  }

  return (
    <Box sx={{ overflowY: "auto", width: "100%" }}>
      <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline" }}>
        Suggestions
      </Typography>
      {displaySuggestions && (
        <Grid container direction="column">
          {suggestions.map((suggestion, index) => (
            <Grid item key={index} sx={{ padding: "16px" }}>
              <Paper elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Preview {index}
                </Typography>
                <Box mb={1}>
                  <Button sx={{ width: "1px", fontSize: "10px" }} variant="contained">
                    Button
                  </Button>
                </Box>
                <img src={suggestion.image} alt={`Preview ${index}`} style={{ width: "100%", height: "50px" }} />
                <Box display="flex" justifyContent="flex-end">
                  <Tooltip title={suggestion.description} placement="right">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default DesignSuggestions
