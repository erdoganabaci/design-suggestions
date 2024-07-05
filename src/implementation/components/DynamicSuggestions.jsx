import React, { useEffect } from "react"
import { Grid, Paper, IconButton, Tooltip, Box, Button, Typography } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { canvasDroppedItemsAtom } from "../store/droppedItems.atom"
import { useAtom } from "jotai"
// import { displaySuggestionsAtom } from "../../store/displaySuggestions.atom";

const isColorDark = (color) => {
  const hex = color.replace("#", "")
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}

const lightenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

const generateSizeSuggestions = (droppedItems) => {
  const maxSize = 100 // Define the maximum acceptable size
  const suggestions = []
  droppedItems.forEach((item) => {
    if (item.width > maxSize || item.height > maxSize) {
      suggestions.push({
        ...item,
        width: Math.min(item.width, maxSize),
        height: Math.min(item.height, maxSize),
      })
    }
  })

  return suggestions.length > 0
    ? [
        {
          items: suggestions,
          suggestion: "Some elements are too large. Consider reducing their size.",
          suggestionLink: "https://material.io/design/layout/spacing-alignment.html",
        },
      ]
    : []
}

const generateSuggestions = (droppedItems) => {
  const suggestions = []
  // Suggestion 1: If there is no title text item between y-coordinate 7-116, add a title item
  const hasTitleText = droppedItems.some((item) => item.type === "text" && item.y > 7 && item.y < 116)
  const suggestion1 = !hasTitleText
    ? [
        {
          type: "text",
          text: "Title of page",
          color: "#dde8fa",
          textColor: "black",
          id: "0ivbii7gm",
          x: 350,
          y: 23,
        },
        ...droppedItems,
      ]
    : []

  // Suggestion 2: Change text color to white if both text color and background are dark
  const suggestion2 = droppedItems.some((item) => isColorDark(item.textColor) && isColorDark(item.color))
    ? droppedItems.map((item) =>
        isColorDark(item.textColor) && isColorDark(item.color)
          ? {
              ...item,
              textColor: "white",
            }
          : item,
      )
    : []

  // Suggestion 3: Lighten background color if background is dark
  const suggestion3 = droppedItems.some((item) => isColorDark(item.color) && !isColorDark(item.textColor))
    ? droppedItems.map((item) =>
        isColorDark(item.color) && !isColorDark(item.textColor)
          ? {
              ...item,
              color: lightenColor(item.color, 40),
            }
          : item,
      )
    : []

  if (suggestion1.length > 0) {
    suggestions.push({
      items: suggestion1,
      suggestion: "Add title text item",
      suggestionLink: "https://material.io/design/typography/the-type-system.html",
    })
  }

  if (suggestion2.length > 0) {
    suggestions.push({
      items: suggestion2,
      suggestion: "Change text color to white",
      suggestionLink: "https://material.io/design/color/the-color-system.html",
    })
  }

  if (suggestion3.length > 0) {
    suggestions.push({
      items: suggestion3,
      suggestion: "Lighten background color",
      suggestionLink: "https://material.io/design/color/color-usage.html",
    })
  }

  // Suggestion 4: Suggest resizing elements that are too large
  const sizeSuggestions = generateSizeSuggestions(droppedItems)

  if (sizeSuggestions.length > 0) {
    suggestions.push(...sizeSuggestions)
  }

  return suggestions
}

const DynamicSuggestions = () => {
  const [canvasDroppedItems, setCanvasDroppedItems] = useAtom(canvasDroppedItemsAtom)
  //   const [displaySuggestions, setDisplaySuggestions] = useAtom(displaySuggestionsAtom);

  const [suggestions, setSuggestions] = React.useState([[], []])
  console.log("suggestions", suggestions)
  useEffect(() => {
    setSuggestions(generateSuggestions(canvasDroppedItems))
  }, [canvasDroppedItems])

  const onHandleSuggestionApply = (suggestionSet) => {
    console.log("Suggestion applied", suggestionSet)
    setCanvasDroppedItems(suggestionSet)
  }

  const displaySuggestedItems = (suggestionItem) => {
    if (suggestionItem.type === "text") {
      return (
        <Typography
          key={suggestionItem.id}
          sx={{
            fontSize: "10px",
            color: suggestionItem.textColor,
            // backgroundColor: suggestionItem.color,
            margin: "5px 0",
            ":hover": {
              backgroundColor: suggestionItem.color,
            },
          }}
        >
          {suggestionItem.text}
        </Typography>
      )
    } else if (suggestionItem.type === "button") {
      return (
        <Button
          key={suggestionItem.id}
          sx={{
            fontSize: "10px",
            color: suggestionItem.textColor,
            backgroundColor: suggestionItem.color,
            width: "60px",
            ":hover": {
              backgroundColor: suggestionItem.color,
            },
          }}
          variant="contained"
        >
          {suggestionItem.text}
        </Button>
      )
    } else if (suggestionItem.type === "image") {
      return (
        <Box
          key={suggestionItem.id}
          component="img"
          src={suggestionItem.src}
          alt={suggestionItem.alt}
          sx={{ width: "80%", height: "80%" }}
        />
      )
    }
  }

  return (
    <Grid container>
      {suggestions.length > 0 &&
        suggestions.map(
          (suggestionSet, index) =>
            suggestionSet &&
            suggestionSet.items &&
            suggestionSet.items.length > 0 && (
              <Grid item key={index} sx={{ padding: "10px", width: "100%" }}>
                <Paper elevation={3} sx={{ padding: "2px" }}>
                  <Box mb={1}>
                    <Typography variant="h6" gutterBottom>
                      Preview {index + 1}:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        margin: 1,
                        rowGap: 1.5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {suggestionSet.items.map((suggestedItem) => displaySuggestedItems(suggestedItem))}

                      {/* {displaySuggestedItems(suggestions)} */}
                      {/* {canvasDroppedItems.map((item) => (
                        <Button
                          key={item.id}
                          sx={{
                            fontSize: "10px",
                            color: item.textColor,
                            backgroundColor: item.color,
                            margin: "5px 0",
                            ":hover": {
                              backgroundColor: item.color,
                            },
                          }}
                          variant="contained"
                        >
                          {item.text}
                        </Button>
                      ))}
                      {suggestionSet.items.map((suggestion) => (
                        <Button
                          key={suggestion.id}
                          sx={{
                            fontSize: "10px",
                            color: suggestion.textColor,
                            backgroundColor: suggestion.color,
                            margin: "5px 0",
                            ":hover": {
                              backgroundColor: suggestion.color,
                            },
                          }}
                          variant="contained"
                        >
                          {suggestion.text}
                        </Button>
                      ))} */}
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="flex-end">
                    <Tooltip
                      title={
                        <>
                          {suggestionSet.suggestion}
                          <br />
                          <a href={suggestionSet.suggestionLink} target="_blank" style={{ color: "skyblue" }}>
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

                  <Box display={"flex"} gap={"5px"} margin={"5px"} justifyContent={"center"}>
                    <Button
                      onClick={() => onHandleSuggestionApply(suggestionSet.items)}
                      sx={{
                        width: "60px",
                        fontSize: "10px",
                        color: "black",
                        backgroundColor: "#d9e7d6",
                        ":hover": {
                          backgroundColor: "#d9e7d6",
                        },
                      }}
                      variant="contained"
                    >
                      Apply
                    </Button>
                    <Button
                      color="error"
                      sx={{
                        width: "60px",
                        fontSize: "10px",
                        color: "black",
                        backgroundColor: "#f1d0cd",
                        ":hover": {
                          backgroundColor: "#f1d0cd",
                        },
                      }}
                      variant="contained"
                    >
                      Hide
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ),
        )}
    </Grid>
  )
}

export default DynamicSuggestions
