import { useState, useEffect } from "react"
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"

const DesignSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]) // Array to store your suggestions
  const [openInfo, setOpenInfo] = useState({ index: null, open: false })

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

  const handleInfoClick = (index) => {
    setOpenInfo({ index, open: true })
  }

  const handleCloseInfo = () => {
    setOpenInfo({ index: null, open: false })
  }

  const generateSuggestions = () => {
    // Placeholder - Your logic to analyze canvas state and generate suggestions
    return [
      { title: "Spacing Adjustment", description: "Consider increasing margin..." },
      { title: "Color Contrast", description: "Check accessibility ratios..." },
    ]
  }

  return (
    <Grid container spacing={2}>
      {suggestions.map((suggestion, index) => (
        <Grid item xs={4} key={index}>
          <Card>
            <CardHeader
              title={suggestion.title}
              action={
                <IconButton onClick={() => handleInfoClick(index)}>
                  <InfoIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2">{suggestion.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Dialog open={openInfo.open} onClose={handleCloseInfo}>
        <DialogTitle>{suggestions[openInfo.index]?.title}</DialogTitle>
        <DialogContent>
          <Typography>
            {suggestions[openInfo.index]?.description}
            {/* Add more detailed rationale in the future  */}
          </Typography>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default DesignSuggestions
