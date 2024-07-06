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
  const maxSizes = {
    button: { width: 200, height: 50 },
    text: { width: 300, height: 100 },
    image: { width: 400, height: 300 },
  }

  const suggestions = []
  const updatedItems = []
  const oversizedElements = []

  droppedItems.forEach((item) => {
    const maxSize = maxSizes[item.type] || { width: 100, height: 100 }

    if (item.width > maxSize.width || item.height > maxSize.height) {
      suggestions.push({
        ...item,
        width: Math.min(item.width, maxSize.width),
        height: Math.min(item.height, maxSize.height),
      })

      oversizedElements.push(item.type)
    } else {
      updatedItems.push(item)
    }
  })

  if (suggestions.length > 0) {
    const elementList = oversizedElements.join(", ")
    return [
      {
        items: [...updatedItems, ...suggestions],
        suggestion: `The following elements are too large: ${elementList}. Consider reducing their size.`,
        suggestionLink: "https://material.io/design/layout/understanding-layout.html",
      },
    ]
  }

  return []
}

const generateFontSizeSuggestions = (droppedItems) => {
  const minFontSize = 12
  const maxFontSize = 36
  const suggestedFontSize = 14 // Placeholder for
  const fontSizeSuggestions = []
  const updatedItems = []

  droppedItems.forEach((item) => {
    if (item.type === "text" && item.fontSize) {
      if (item.fontSize < minFontSize) {
        fontSizeSuggestions.push({
          ...item,
          fontSize: minFontSize,
        })
      } else if (item.fontSize > maxFontSize) {
        fontSizeSuggestions.push({
          ...item,
          fontSize: maxFontSize,
        })
      } else {
        updatedItems.push(item)
      }
    } else {
      updatedItems.push(item)
    }
  })

  if (fontSizeSuggestions.length > 0) {
    const oversizedItems = fontSizeSuggestions.filter((item) => item.fontSize >= maxFontSize)
    const undersizedItems = fontSizeSuggestions.filter((item) => item.fontSize <= minFontSize)

    const oversizedElementList = oversizedItems
      .map((item) => item.type + " " + (item.text || item.alt || item.id))
      .join(", ")
    const undersizedElementList = undersizedItems
      .map((item) => item.type + " " + (item.text || item.alt || item.id))
      .join(", ")

    const suggestions = []

    if (oversizedItems.length > 0) {
      const suggestedOversizedItems = oversizedItems.map((item) => ({
        ...item,
        fontSize: suggestedFontSize,
      }))
      suggestions.push({
        items: [...updatedItems, ...suggestedOversizedItems],
        suggestion: `The following elements have a font size that is too large: ${oversizedElementList}. Consider reducing their font size to ${maxFontSize}px.`,
        suggestionLink: "https://material.io/design/typography/the-type-system.html",
      })
    }

    if (undersizedItems.length > 0) {
      const suggestedUndersizedItems = undersizedItems.map((item) => ({
        ...item,
        fontSize: suggestedFontSize,
      }))
      suggestions.push({
        items: [...updatedItems, ...suggestedUndersizedItems],
        suggestion: `The following elements have a font size that is too small: ${undersizedElementList}. Consider increasing their font size to ${minFontSize}px.`,
        suggestionLink: "https://material.io/design/typography/the-type-system.html",
      })
    }

    return suggestions
  }

  return []
}

// const resolveOverlaps = (droppedItems) => {
//   const spacing = 10 // Define the minimum spacing between elements
//   const suggestions = [...droppedItems]

//   const isOverlapping = (item1, item2) => {
//     return (
//       item1.x < item2.x + item2.width &&
//       item1.x + item1.width > item2.x &&
//       item1.y < item2.y + item2.height &&
//       item1.y + item1.height > item2.y
//     )
//   }

//   for (let i = 0; i < suggestions.length; i++) {
//     for (let j = i + 1; j < suggestions.length; j++) {
//       const item1 = suggestions[i]
//       const item2 = suggestions[j]

//       if (isOverlapping(item1, item2)) {
//         // Adjust item2 position to resolve overlap
//         item2.y = item1.y + item1.height + spacing

//         // Recheck for overlaps after adjustment
//         for (let k = 0; k < suggestions.length; k++) {
//           if (k !== j && isOverlapping(suggestions[k], item2)) {
//             item2.x = suggestions[k].x + suggestions[k].width + spacing
//           }
//         }
//       }
//     }
//   }

//   return suggestions
// }

// const generateOverlapSuggestions = (droppedItems) => {
//   const adjustedItems = resolveOverlaps([...droppedItems])
//   return JSON.stringify(droppedItems) !== JSON.stringify(adjustedItems)
//     ? [
//         {
//           items: adjustedItems,
//           suggestion: "Some elements are overlapping. Adjusted their positions to avoid overlaps.",
//           suggestionLink: "https://material.io/design/layout/spacing-alignment.html",
//         },
//       ]
//     : []
// }

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
          fontSize: 14,
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

  // Suggestion 5: Suggest increasing font size for better readability
  const fontSizeSuggestions = generateFontSizeSuggestions(droppedItems)
  if (fontSizeSuggestions.length > 0) {
    suggestions.push(...fontSizeSuggestions)
  }

  // Suggestion 5: Suggest resolving overlaps
  // const overlapSuggestions = generateOverlapSuggestions(droppedItems)
  // if (overlapSuggestions.length > 0) {
  //   suggestions.push(...overlapSuggestions)
  // }

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
