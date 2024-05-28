import { useState, useEffect } from "react"
import { Grid, Paper, Typography, IconButton, Tooltip, Box } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { Button } from "@mui/material"
import { useAtom } from "jotai"
import { canvasDroppedItemsAtom } from "../store/droppedItems.atom"
import { displaySuggestionsAtom } from "../store/displaySuggestions.atom"
import FirstScenario from "./scenarios/firstScenario"
import SecondScenario from "./scenarios/secondScenario"
import ThirdScenario from "./scenarios/thirdScenario"
import ForthScenario from "./scenarios/forthScenario"
import FifthScenario from "./scenarios/fifthScenario"
import SixthScenario from "./scenarios/sixthScenario"

const DesignSuggestions = () => {
  // const [suggestions, setSuggestions] = useState([]) // Array to store your suggestions
  const [displaySuggestions, setDisplaySuggestions] = useAtom(displaySuggestionsAtom)
  const [canvasDroppedItems, setCanvasDroppedItems] = useAtom(canvasDroppedItemsAtom)

  // Fetch or generate suggestions upon relevant changes
  // (e.g., items dropped on the canvas)
  // useEffect(
  //   () => {
  //     const newSuggestions = generateSuggestions() // Replace with your suggestion logic
  //     setSuggestions(newSuggestions)
  //   },
  //   [
  //     /* Dependencies for your suggestion logic */
  //   ],
  // )
  console.log("canvasDroppedItems design suggestion", canvasDroppedItems)

  console.log("displaySuggestions", displaySuggestions)
  useEffect(() => {
    const containsAtLeastThreeDistinctButtons =
      canvasDroppedItems.filter((elem) => elem.type === "button" && elem.text !== "Button").length >= 3
    const sameDarkColorSecondScenario =
      canvasDroppedItems.filter((elem) => elem.type === "button" && elem.text !== "Button" && elem.color === "#004cc8")
        .length >= 3
    console.log("sameDarkColorSecondScenario", sameDarkColorSecondScenario)
    console.log("containsAtLeastThreeDistinctButtons", containsAtLeastThreeDistinctButtons)
    if (containsAtLeastThreeDistinctButtons && !displaySuggestions.isManual && displaySuggestions.scenario === 1) {
      setDisplaySuggestions({
        scenario: 1,
        display: true,
        isManual: false,
      })
    }
    if (sameDarkColorSecondScenario && displaySuggestions.scenario === 1) {
      setDisplaySuggestions({
        scenario: 2,
        display: true,
        isManual: false,
      })
    }
  }, [setDisplaySuggestions, canvasDroppedItems, displaySuggestions.isManual, displaySuggestions.scenario])

  // const generateSuggestions = () => {
  //   // Placeholder - Your logic to analyze canvas state and generate suggestions
  //   return [
  //     {
  //       title: "Spacing Adjustment",
  //       description: "Consider increasing margin...",
  //       image: "https://placehold.co/600x400/black/white", // Replace with your image path
  //       headerText: "Light1 Header",
  //       buttonText: "Light2",
  //     },
  //     {
  //       title: "Color Contrast",
  //       description: "Check accessibility ratios...",
  //       image: "https://placehold.co/600x400/black/white", // Replace with your image path
  //       headerText: "Light2 Header",
  //       buttonText: "Light2",
  //     },
  //     {
  //       title: "Color Contrast",
  //       description: "Resize image ...",
  //       image: "https://placehold.co/600x400/black/white", // Replace with your image path
  //       headerText: "Light3 Header",
  //       buttonText: "Light3",
  //     },
  //     // {
  //     //   title: "Color Contrast",
  //     //   description: "Check accessibility ratios...",
  //     //   image: "/path/to/preview2.jpg", // Replace with your image path
  //     // },
  //     // Add more suggestions here
  //   ]
  // }

  return (
    <Box sx={{ overflowY: "auto", width: "100%" }}>
      <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline" }}>
        Suggestions
      </Typography>
      {displaySuggestions.display && displaySuggestions.scenario === 1 && (
        <Grid container direction="column">
          <FirstScenario />
        </Grid>
      )}
      {displaySuggestions.display && displaySuggestions.scenario === 2 && (
        <Grid container direction="column">
          <SecondScenario />
        </Grid>
      )}
      {displaySuggestions.display && displaySuggestions.scenario === 3 && (
        <Grid container direction="column">
          <ThirdScenario />
        </Grid>
      )}
      {displaySuggestions.display && displaySuggestions.scenario === 4 && (
        <Grid container direction="column">
          <ForthScenario />
        </Grid>
      )}
      {displaySuggestions.display && displaySuggestions.scenario === 5 && (
        <Grid container direction="column">
          <FifthScenario />
        </Grid>
      )}
      {displaySuggestions.display && displaySuggestions.scenario === 6 && (
        <Grid container direction="column">
          <SixthScenario />
        </Grid>
      )}
    </Box>
  )
}

export default DesignSuggestions
