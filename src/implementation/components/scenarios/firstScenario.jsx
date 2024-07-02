import { Grid, Paper, Typography, IconButton, Tooltip, Box, Button } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { canvasDroppedItemsAtom } from "../../store/droppedItems.atom"
import { useAtom } from "jotai"
import { displaySuggestionsAtom } from "../../store/displaySuggestions.atom"

const firstScenarioSuggestions = [
  {
    type: "button",
    text: "TV",
    color: "#dde8fa",
    id: "0z9y289c3",
    x: 338,
    y: 322,
  },
  {
    type: "button",
    text: "TV LIGHT",
    color: "#dde8fa",
    id: "tmtqqasmi",
    x: 330,
    y: 132,
  },
  {
    type: "button",
    text: "CEILING LIGHT",
    color: "#dde8fa",
    id: "qmxnfyqra",
    x: 307,
    y: 77,
  },
]

const secondScenarioSuggestions = [
  {
    type: "button",
    text: "TV",
    color: "#dde8fa",
    id: "0z9y289c3",
    x: 338,
    y: 322,
  },
  {
    type: "button",
    text: "CEILING LIGHT",
    color: "#dde8fa",
    id: "qmxnfyqra",
    x: 307,
    y: 77,
  },
  {
    type: "button",
    text: "TV LIGHT",
    color: "#dde8fa",
    id: "ruvrw27py",
    x: 318,
    y: 278,
  },
]

const FirstScenario = () => {
  const [canvasDroppedItems, setCanvasDroppedItems] = useAtom(canvasDroppedItemsAtom)
  const [displaySuggestions, setDisplaySuggestions] = useAtom(displaySuggestionsAtom)

  const onHandleFirstSuggeestionApply = () => {
    console.log("First suggestion applied")
    setCanvasDroppedItems(firstScenarioSuggestions)
    setDisplaySuggestions({
      scenario: 1,
      display: false,
      isManual: true,
    })
  }

  const onHandleSecondSuggeestionApply = () => {
    console.log("Second suggestion applied")
    setCanvasDroppedItems(secondScenarioSuggestions)
    setDisplaySuggestions({
      scenario: 1,
      display: false,
      isManual: true,
    })
  }

  return (
    <>
      <Grid item key={1} sx={{ padding: "10px" }}>
        <Paper elevation={3} sx={{ padding: "2px" }}>
          {/* <Typography fontSize={"10px"} gutterBottom>
            Group buttons with similar functionality
          </Typography> */}
          <Box mb={1}>
            <Button
              sx={{
                fontSize: "10px",
                color: "black",
                backgroundColor: "#dde8fa",
                ":hover": {
                  backgroundColor: "#dde8fa",
                },
              }}
              variant="contained"
            >
              Ceiling Light
            </Button>
          </Box>

          <Box mb={"30px"}>
            <Button
              sx={{
                fontSize: "10px",
                color: "black",
                backgroundColor: "#dde8fa",
                ":hover": {
                  backgroundColor: "#dde8fa",
                },
              }}
              variant="contained"
            >
              Tv Light
            </Button>
          </Box>

          <Box mb={1}>
            <Button
              sx={{
                fontSize: "10px",
                color: "black",
                backgroundColor: "#dde8fa",
                ":hover": {
                  backgroundColor: "#dde8fa",
                },
              }}
              variant="contained"
            >
              Tv
            </Button>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Tooltip
              title={
                <>
                  Group buttons with similar functionality
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

          <Box display={"flex"} gap={"5px"} margin={"5px"} justifyContent={"center"}>
            <Button
              onClick={onHandleFirstSuggeestionApply}
              sx={{
                width: "1px",
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
                width: "1px",
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

      <Grid item key={1} sx={{ padding: "10px" }}>
        <Paper elevation={3} sx={{ padding: "2px" }}>
          {/* <Typography variant="h6" gutterBottom>
            Light1 Header
          </Typography> */}
          <Box mb={"30px"}>
            <Button
              sx={{
                fontSize: "10px",
                color: "black",
                backgroundColor: "#dde8fa",
                ":hover": {
                  backgroundColor: "#dde8fa",
                },
              }}
              variant="contained"
            >
              Ceiling Light
            </Button>
          </Box>

          <Box mb={1}>
            <Button
              sx={{
                fontSize: "10px",
                color: "black",
                backgroundColor: "#dde8fa",
                ":hover": {
                  backgroundColor: "#dde8fa",
                },
              }}
              variant="contained"
            >
              Tv Light
            </Button>
          </Box>

          <Box mb={1}>
            <Button
              sx={{
                fontSize: "10px",
                color: "black",
                backgroundColor: "#dde8fa",
                ":hover": {
                  backgroundColor: "#dde8fa",
                },
              }}
              variant="contained"
            >
              Tv
            </Button>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Tooltip
              title={
                <>
                  Group buttons with similar functionality
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

          <Box display={"flex"} gap={"5px"} margin={"5px"} justifyContent={"center"}>
            <Button
              onClick={onHandleSecondSuggeestionApply}
              sx={{
                width: "1px",
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
                width: "1px",
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
    </>
  )
}

export default FirstScenario
