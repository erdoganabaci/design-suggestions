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

// const generateSuggestions = (droppedItems) => {
//   const suggestions = []
//   //   1- text color to white ,background keep the same (dark), if you see dark text and dark background then suggested
//   //   2- keep the text color, propose depending on color. Background changes to lighter version.
//   const suggestion1 = droppedItems
//     .map((item) => {
//       if (isColorDark(item.textColor)) {
//         return {
//           ...item,
//           text: `${item.text}`,
//           textColor: "white",
//           suggestion: "(Suggestion: Change text color to white)",
//           suggestionLink: "https://material.io/design/color/the-color-system.html",
//         }
//       }
//       return undefined
//     })
//     .filter((item) => item !== undefined) // Filter out undefined values

//   const suggestion2 = droppedItems
//     .map((item) => {
//       if (isColorDark(item.color)) {
//         return {
//           ...item,
//           text: `${item.text}`,
//           color: lightenColor(item.color, 40),
//           suggestion: "(Suggestion: Lighten background color)",
//           suggestionLink: "https://material.io/design/color/color-usage.html",
//         }
//       }
//       return undefined
//     })
//     .filter((item) => item !== undefined) // Filter out undefined values

//   suggestions.push(suggestion1, suggestion2)
//   return suggestions
// }

const generateSuggestions = (droppedItems) => {
  const suggestions = []

  // Suggestion 1: Change text color to white if both text color and background are dark
  const suggestion1 = droppedItems.some((item) => isColorDark(item.textColor) && isColorDark(item.color))
    ? droppedItems.map((item) =>
        isColorDark(item.textColor) && isColorDark(item.color)
          ? {
              ...item,
              textColor: "white",
            }
          : item,
      )
    : []

  // Suggestion 2: Lighten background color if background is dark
  const suggestion2 = droppedItems.some((item) => isColorDark(item.color) && !isColorDark(item.textColor))
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
      suggestion: "Change text color to white",
      suggestionLink: "https://material.io/design/color/the-color-system.html",
    })
  }

  if (suggestion2.length > 0) {
    suggestions.push({
      items: suggestion2,
      suggestion: "Lighten background color",
      suggestionLink: "https://material.io/design/color/color-usage.html",
    })
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
    // setCanvasDroppedItems((prevItems) => [...prevItems, ...suggestionSet])
    // after applied remove the old value
    setSuggestions((prevSuggestions) =>
      prevSuggestions.map((set) =>
        set.filter((item) => !suggestionSet.some((appliedItem) => appliedItem.id === item.id)),
      ),
    )

    // setDisplaySuggestions({
    //   display: false,
    //   isManual: true,
    // });
  }

  return (
    <Grid container>
      {suggestions.length > 0 &&
        suggestions.map(
          (suggestionSet, index) =>
            suggestionSet &&
            suggestionSet.items &&
            suggestionSet.items.length > 0 && (
              <Grid item key={index} sx={{ padding: "10px" }}>
                <Paper elevation={3} sx={{ padding: "2px" }}>
                  <Box mb={1}>
                    <Typography variant="h6" gutterBottom>
                      Preview {index + 1}:
                    </Typography>
                    <Box>
                      {canvasDroppedItems.map((item) => (
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
                      ))}
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
