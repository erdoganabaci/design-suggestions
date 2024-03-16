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
        headerText: "Light1 Header",
        buttonText: "Light2",
      },
      {
        title: "Color Contrast",
        description: "Check accessibility ratios...",
        image: "https://placehold.co/600x400/black/white", // Replace with your image path
        headerText: "Light2 Header",
        buttonText: "Light2",
      },
      {
        title: "Color Contrast",
        description: "Resize image ...",
        image: "https://placehold.co/600x400/black/white", // Replace with your image path
        headerText: "Light3 Header",
        buttonText: "Light3",
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
          {/* {suggestions.map((suggestion, index) => (
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
          ))} */}

          <Grid item key={1} sx={{ padding: "16px" }}>
            <Paper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Light1 Header
              </Typography>
              <Box mb={1}>
                <Button
                  sx={{ width: "1px", fontSize: "10px", backgroundColor: "purple", color: "white" }}
                  variant="contained"
                >
                  Light1
                </Button>
              </Box>
              <img
                src={"https://placehold.co/600x400/black/white"}
                alt={`Preview ${1}`}
                style={{ width: "100%", height: "50px" }}
              />
              <Box display="flex" justifyContent="flex-end">
                <Tooltip
                  title={
                    <>
                      Consider increasing margin...
                      <br />
                      <a
                        href="https://material.io/design/layout/spacing-methods.html#baseline-grids"
                        target="_blank"
                        // rel="noopener noreferrer"
                        style={{ color: "skyblue" }}
                      >
                        Read more
                      </a>
                    </>
                  }
                  placement="right"
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>

          <Grid item key={2} sx={{ padding: "16px" }}>
            <Paper elevation={3}>
              <img
                src={"https://placehold.co/600x400/black/white"}
                alt={`Preview ${2}`}
                style={{ width: "100%", height: "50px" }}
              />
              <Box mb={1}>
                <Button sx={{ width: "1px", fontSize: "10px" }} variant="contained">
                  Light2
                </Button>
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <Tooltip
                  title={
                    <>
                      Accessibility and structure tip: Headers should be placed at the top for clear content hierarchy.
                      <a
                        href="https://material.io/design/typography/understanding-typography.html#usage"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "skyblue" }}
                      >
                        Learn more
                      </a>
                    </>
                  }
                  placement="right"
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="h6" gutterBottom>
                Light2 Header
              </Typography>
            </Paper>
          </Grid>

          <Grid item key={3} sx={{ padding: "16px" }}>
            <Paper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Light3 Header
              </Typography>
              <img
                src={"https://placehold.co/600x400/black/white"}
                alt={`Preview ${3}`}
                style={{ width: "100%", height: "50px" }}
              />
              <Box mb={1}>
                <Button
                  sx={{ width: "1px", fontSize: "10px", backgroundColor: "yellow", color: "white" }}
                  variant="contained"
                >
                  Light3
                </Button>
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <Tooltip
                  title={
                    <>
                      Accessibility tip: Ensure black text contrasts well with background.
                      <a
                        href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "skyblue" }}
                      >
                        Learn more
                      </a>
                    </>
                  }
                  placement="right"
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default DesignSuggestions
