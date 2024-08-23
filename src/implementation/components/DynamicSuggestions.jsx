import { useEffect, useState } from "react"
import { Grid, Paper, IconButton, Tooltip, Box, Button, Typography, Switch, FormControlLabel } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { canvasDroppedItemsAtom } from "../store/droppedItems.atom"
import { useAtom } from "jotai"

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

const determineSizeSuggestionLink = () => {
  // randomly return link
  const links = [
    "https://m2.material.io/components/buttons#behavior",
    "https://m2.material.io/design/communication/imagery.html#usage",
  ]
  return links[Math.floor(Math.random() * links.length)]
}

const generateSizeSuggestions = (droppedItems, screenWidth, screenHeight) => {
  // https://m2.material.io/components/buttons#behavior
  // https://m2.material.io/design/communication/imagery.html#usage
  const maxSizes = {
    button: { width: screenWidth * 0.2, height: screenHeight * 0.1 }, // 20% of screen width and 10% of screen height
    image: { width: screenWidth * 0.6, height: screenHeight * 0.5 }, // 60% of screen width and 50% of screen height
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
        suggestionLink: determineSizeSuggestionLink(),
      },
    ]
  }

  return []
}
// https://matthewjamestaylor.com/responsive-font-size#:~:text=The%20consensus%20is%20mobile%20font,large%20devices%20is%2018px%20%2D%2020px.
// font calculation calc(15px + 0.390625vw)
const getSuggestedFontSize = (screenWidth) => {
  const convertViewPortPercentageToDecimal = 0.390625 / 100
  const calcFontSize = 15 + convertViewPortPercentageToDecimal * screenWidth
  return calcFontSize
}

const generateFontSizeSuggestions = (droppedItems) => {
  const canvasScreenWidth = 768
  const suggestedFontSize = getSuggestedFontSize(canvasScreenWidth)
  const fontSizeSuggestions = []
  const updatedItems = []

  droppedItems.forEach((item) => {
    if (item.type === "text" && item.fontSize) {
      if (item.fontSize !== suggestedFontSize) {
        fontSizeSuggestions.push({
          ...item,
          fontSize: suggestedFontSize,
        })
      } else {
        updatedItems.push(item)
      }
    } else {
      updatedItems.push(item)
    }
  })

  if (fontSizeSuggestions.length > 0) {
    const changedItemsList = fontSizeSuggestions
      .map((item) => item.type + " " + (item.text || item.alt || item.id))
      .join(", ")

    const suggestions = [
      {
        items: [...updatedItems, ...fontSizeSuggestions],
        suggestion: `The following elements have been adjusted to the suggested font size: ${changedItemsList}.`,
        suggestionLink:
          "https://matthewjamestaylor.com/responsive-font-size#:~:text=The%20consensus%20is%20mobile%20font,large%20devices%20is%2018px%20%2D%2020px.",
      },
    ]

    return suggestions
  }

  return []
}

const generateTextContentSuggestions = (droppedItems, screenWidth) => {
  const textContentSuggestions = []
  const updatedItems = []
  // average character width is a rough estimate commonly used in calculations where precise font metrics are not available.
  // https://www.math.utah.edu/~beebe/fonts/afm-widths.html
  const AVERAGE_CHAR_WIDTH = 10

  const maxTextLength = Math.floor((screenWidth * 0.9) / AVERAGE_CHAR_WIDTH) // Calculate maximum number of characters based on screen width
  const truncationLength = Math.floor(maxTextLength / 2) // Truncate to half the maximum length

  droppedItems.forEach((item) => {
    if (item.type === "text" && !item.text) {
      textContentSuggestions.push({
        ...item,
        text: "Placeholder text",
      })
    } else if (item.type === "text" && item.text.length > maxTextLength) {
      textContentSuggestions.push({
        ...item,
        text: item.text.slice(0, truncationLength) + "...",
      })
    } else {
      updatedItems.push(item)
    }
  })

  if (textContentSuggestions.length > 0) {
    return [
      {
        items: [...updatedItems, ...textContentSuggestions],
        suggestion: "Consider adding or shortening text for the following elements.",
        suggestionLink: "https://m2.material.io/design/usability/accessibility.html#writing",
      },
    ]
  }

  return []
}

const generateSpacingSuggestions = (droppedItems, screenWidth, screenHeight) => {
  const spacingSuggestions = []
  const updatedItems = [...droppedItems]

  // Define minimum distance and additional spacing based on screen dimensions
  const minDistance = Math.sqrt((screenWidth * 0.05) ** 2 + (screenHeight * 0.05) ** 2) // 5% of screen width and height
  const additionalSpacingX = screenWidth * 0.1 //  10% of screen width
  const additionalSpacingY = screenHeight * 0.05 //  5% of screen height

  // suggest adding spacing between elements that are too close
  for (let i = 0; i < droppedItems.length - 1; i++) {
    const item1 = droppedItems[i]
    const item2 = droppedItems[i + 1]
    const distance = Math.sqrt(Math.pow(item2.x - item1.x, 2) + Math.pow(item2.y - item1.y, 2))

    if (distance < minDistance) {
      const updatedItem2 = {
        ...item2,
        x: item1.x + additionalSpacingX,
        y: item1.y + additionalSpacingY,
      }
      spacingSuggestions.push(updatedItem2)

      // Update the items in the main list
      const index = updatedItems.findIndex((item) => item.id === item2.id)
      if (index !== -1) {
        updatedItems[index] = updatedItem2
      }
    }
  }

  if (spacingSuggestions.length > 0) {
    return [
      {
        items: updatedItems,
        suggestion: `Consider adding spacing between the following elements: ${spacingSuggestions
          .map((item) => item.type + " " + (item.text || item.alt || item.id))
          .join(", ")}.`,
        suggestionLink: "https://m1.material.io/layout/metrics-keylines.html#metrics-keylines-keylines-spacing",
      },
    ]
  }

  return []
}

const generateCombineSimilarElementsSuggestions = (droppedItems) => {
  const similarSuggestions = []
  const updatedItems = []
  const similarElements = new Set()

  // Check for similar elements (same type and similar properties)
  droppedItems.forEach((item, index) => {
    let isSimilar = false
    for (let i = index + 1; i < droppedItems.length; i++) {
      const otherItem = droppedItems[i]
      if (item.type === otherItem.type && !similarElements.has(otherItem.id)) {
        // Check if the items are of type 'text' and have different text properties
        if (item.type === "text" && item.text !== otherItem.text) {
          continue
        }
        // Check if the items are of type 'image' and have different src properties
        if (item.type === "image" && item.src !== otherItem.src) {
          continue
        }
        // Check if items have the same text or color property
        if (item.text && item.text === otherItem.text && item.color === otherItem.color) {
          isSimilar = true
          similarElements.add(otherItem.id)
          similarElements.add(item.id)
          break
        }
      }
    }
    if (isSimilar) {
      similarSuggestions.push({
        ...item,
        suggestion: "Consider combining similar elements.",
      })
    } else {
      updatedItems.push(item)
    }
  })

  if (similarSuggestions.length > 0) {
    const filteredItems = updatedItems.filter((item) => !similarElements.has(item.id))
    const suggestionItems = filteredItems.concat(similarSuggestions)
    return [
      {
        items: suggestionItems,
        suggestion: "Consider combining similar elements.",
        suggestionLink: "https://m2.material.io/design/layout/understanding-layout.html#composition",
      },
    ]
  }

  return []
}

const generateButtonLabelSuggestions = (droppedItems) => {
  const buttonLabelSuggestions = []
  const updatedItems = []

  droppedItems.forEach((item) => {
    if (item.type === "button" && !item.text) {
      buttonLabelSuggestions.push({
        ...item,
        text: "Button",
      })
    } else {
      updatedItems.push(item)
    }
  })

  if (buttonLabelSuggestions.length > 0) {
    return [
      {
        items: [...updatedItems, ...buttonLabelSuggestions],
        suggestion: "Ensure buttons have text labels for clarity.",
        suggestionLink: "https://material.io/design/components/buttons.html",
      },
    ]
  }

  return []
}

// const generateAspectRatioSuggestions = (droppedItems) => {
//   const aspectRatioSuggestions = []
//   const updatedItems = []

//   droppedItems.forEach((item) => {
//     if (item.type === "image" && item.width / item.height !== 4 / 3) {
//       aspectRatioSuggestions.push({
//         ...item,
//         width: item.height * (4 / 3),
//       })
//     } else {
//       updatedItems.push(item)
//     }
//   })

//   if (aspectRatioSuggestions.length > 0) {
//     return [
//       {
//         items: [...updatedItems, ...aspectRatioSuggestions],
//         suggestion: "Ensure images maintain a 4:3 aspect ratio.",
//         suggestionLink: "https://material.io/design/layout/spacing-methods.html",
//       },
//     ]
//   }

//   return []
// }

const generateCreativeSuggestions = (droppedItems) => {
  const suggestions = []
  const updatedItems = []

  droppedItems.forEach((item) => {
    if (item.type === "button") {
      // Suggest a switch button instead of a regular button
      suggestions.push({
        ...item,
        type: "switch",
        text: item.text || "Switch",
      })
    } else if (item.type === "switch") {
      // Suggest a regular button instead of a switch button
      suggestions.push({
        ...item,
        type: "button",
        text: item.text || "Button",
      })
    } else {
      updatedItems.push(item)
    }
  })

  if (suggestions.length > 0) {
    return [
      {
        items: [...updatedItems, ...suggestions],
        suggestion: "Consider using creative alternatives for your elements.",
        suggestionLink: "https://material.io/design/components/buttons.html",
      },
    ]
  }

  return []
}

const generateSuggestions = (droppedItems, screenWidth, screenHeight) => {
  const suggestions = []
  // Suggestion 1: If there is no title text item between y-coordinate 0-116, add a title item
  const hasTitleText = droppedItems.some((item) => item.type === "text" && item.y > 0 && item.y < 116)
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
          fontSize: 20,
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
  const sizeSuggestions = generateSizeSuggestions(droppedItems, screenWidth, screenHeight)

  if (sizeSuggestions.length > 0) {
    suggestions.push(...sizeSuggestions)
  }

  // Suggestion 5: Suggest increasing font size for better readability
  const fontSizeSuggestions = generateFontSizeSuggestions(droppedItems)
  if (fontSizeSuggestions.length > 0) {
    suggestions.push(...fontSizeSuggestions)
  }
  // Suggestion 6: Suggest shortening text content
  // https://m2.material.io/design/typography/the-type-system.html
  const textContentSuggestions = generateTextContentSuggestions(droppedItems, screenWidth)
  if (textContentSuggestions.length > 0) {
    suggestions.push(...textContentSuggestions)
  }

  // Suggestion 7: Suggest spacing for elements that are too close
  const spacingSuggestions = generateSpacingSuggestions(droppedItems, screenWidth, screenHeight)
  if (spacingSuggestions.length > 0) {
    suggestions.push(...spacingSuggestions)
  }

  // Suggestion 8: Suggest combine similar Elements Suggestions remove similar elements
  const combineSimilarElementsSuggestions = generateCombineSimilarElementsSuggestions(droppedItems)
  if (combineSimilarElementsSuggestions.length > 0) {
    suggestions.push(...combineSimilarElementsSuggestions)
  }

  // Suggestion 9: Suggest ensuring buttons have text labels for clarity.
  const buttonLabelSuggestions = generateButtonLabelSuggestions(droppedItems)
  if (buttonLabelSuggestions.length > 0) {
    suggestions.push(...buttonLabelSuggestions)
  }

  // //  Suggestion 10 Ensure images maintain a 4:3 aspect ratio
  // const aspectRatioSuggestions = generateAspectRatioSuggestions(droppedItems)
  // if (aspectRatioSuggestions.length > 0) {
  //   suggestions.push(...aspectRatioSuggestions)
  // }

  // Suggestion 10: Creative suggestions for buttons and switches
  const creativeSuggestions = generateCreativeSuggestions(droppedItems)
  if (creativeSuggestions.length > 0) {
    suggestions.push(...creativeSuggestions)
  }

  // Suggestion 5: Suggest resolving overlaps
  // const overlapSuggestions = generateOverlapSuggestions(droppedItems)
  // if (overlapSuggestions.length > 0) {
  //   suggestions.push(...overlapSuggestions)
  // }

  return suggestions
}

// Variable of canvas and preview dimensions
const CANVAS_WIDTH = 768 // actual canvas width
const CANVAS_HEIGHT = 75 * (window.innerHeight / 100) // 75% of the window height
const PREVIEW_WIDTH = 200 // actual preview width
const PREVIEW_HEIGHT = 200 // actual preview height

// Calculate projected properties without modifying original x, y, width, height, and fontSize
const calculateProjectedProperties = (items) => {
  const widthScale = PREVIEW_WIDTH / CANVAS_WIDTH
  const heightScale = PREVIEW_HEIGHT / CANVAS_HEIGHT

  return items.map((item) => ({
    ...item,
    projectedX: item.x * widthScale,
    projectedY: item.y * heightScale,
    projectedWidth: item.width * widthScale,
    projectedHeight: item.height * heightScale,
    projectedFontSize: item.fontSize ? item.fontSize * widthScale : undefined,
  }))
}

const DynamicSuggestions = () => {
  const [canvasDroppedItems, setCanvasDroppedItems] = useAtom(canvasDroppedItemsAtom)
  const [suggestions, setSuggestions] = useState([])
  const [hiddenSuggestions, setHiddenSuggestions] = useState([])
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setSuggestions(generateSuggestions(canvasDroppedItems, screenWidth, screenHeight))
  }, [canvasDroppedItems, screenWidth, screenHeight])

  const onHandleSuggestionApply = (suggestionSet) => {
    setCanvasDroppedItems(suggestionSet)
  }

  const onHandleSuggestionHide = (suggestionIndex) => {
    setHiddenSuggestions((prevHidden) => [...prevHidden, suggestionIndex])
  }

  const displaySuggestedItems = (suggestionItem) => {
    switch (suggestionItem.type) {
      case "text":
        return (
          <Typography
            key={suggestionItem.id}
            sx={{
              fontSize: `${suggestionItem.projectedFontSize + 5}px`,
              color: suggestionItem.textColor,
              position: "absolute",
              left: `${suggestionItem.projectedX}px`,
              top: `${suggestionItem.projectedY}px`,
              // backgroundColor: suggestionItem.color,
            }}
          >
            {suggestionItem.text}
          </Typography>
        )
      case "button":
        return (
          <Button
            key={suggestionItem.id}
            sx={{
              fontSize: "5px",
              // fontSize: `${suggestionItem.projectedFontSize}px`,
              padding: "10px",
              color: suggestionItem.textColor,
              backgroundColor: suggestionItem.color,
              position: "absolute",
              left: `${suggestionItem.projectedX}px`,
              top: `${suggestionItem.projectedY}px`,
              width: `${suggestionItem.projectedWidth}px`,
              height: `${suggestionItem.projectedHeight}px`,
              ":hover": {
                backgroundColor: "#DDE8F9",
              },
            }}
            variant="contained"
          >
            {suggestionItem.text}
          </Button>
        )
      case "image":
        return (
          <Box
            key={suggestionItem.id}
            component="img"
            src={suggestionItem.src}
            alt={suggestionItem.alt}
            sx={{
              position: "absolute",
              left: `${suggestionItem.projectedX}px`,
              top: `${suggestionItem.projectedY}px`,
              width: `${suggestionItem.projectedWidth}px`,
              height: `${suggestionItem.projectedHeight}px`,
            }}
          />
        )
      case "switch":
        return (
          <FormControlLabel
            key={suggestionItem.id}
            control={
              <Switch
                sx={{
                  // position: "absolute",
                  // left: `${suggestionItem.projectedX}px`,
                  // top: `${suggestionItem.projectedY}px`,
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
            label={suggestionItem.text}
            labelPlacement="start"
            sx={{
              color: "black",
              position: "absolute",
              left: `${suggestionItem.projectedX}px`,
              top: `${suggestionItem.projectedY}px`,
              width: `${suggestionItem.projectedWidth}px`,
              height: `${suggestionItem.projectedHeight}px`,
              // transform: `translateX(${suggestionItem.projectedWidth / 2}px)`,
            }}
          />
        )
      default:
        return <div>Unsupported element type</div>
    }
  }

  return (
    <Grid container>
      {suggestions.length > 0 &&
        suggestions.map(
          (suggestionSet, index) =>
            suggestionSet &&
            suggestionSet.items &&
            suggestionSet.items.length > 0 &&
            !hiddenSuggestions.includes(index) && (
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
                        position: "relative",
                        width: `${PREVIEW_WIDTH}px`,
                        height: `${PREVIEW_HEIGHT}px`,
                        // border: "1px solid black",
                      }}
                    >
                      {calculateProjectedProperties(suggestionSet.items).map((suggestedItem) =>
                        displaySuggestedItems(suggestedItem),
                      )}
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
                        width: "90px",
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
                      onClick={() => onHandleSuggestionHide(index)}
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
