import { Grid, Paper, IconButton, Tooltip, Box, Button } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { canvasDroppedItemsAtom } from "../../store/droppedItems.atom"
import { useAtom } from "jotai"
import { displaySuggestionsAtom } from "../../store/displaySuggestions.atom"
import LightOutlinedIcon from "@mui/icons-material/LightOutlined"
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined"
import SmartHomeSwitch from "../SmartHomeSwitch"
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined"

const firstScenarioSuggestions = [
  {
    type: "text",
    text: "Living Room Controller",
    color: "#dde8fa",
    id: "50vgyuj4r",
    x: 297.5,
    y: 33,
  },
  {
    type: "switch",
    text: "TV",
    checked: true,
    id: "0z9y282p3",
    x: 338,
    y: 322,
  },
  {
    type: "switch",
    text: "Tv Light",
    checked: true,
    id: "tmtqqasmi",
    x: 330,
    y: 132,
  },
  {
    type: "switch",
    text: "Ceiling Light",
    checked: true,
    id: "omxnfyptx",
    x: 307,
    y: 77,
  },
]

const secondScenarioSuggestions = [
  {
    type: "text",
    text: "Living Room Controller",
    color: "#dde8fa",
    id: "50vgyuj4r",
    x: 297.5,
    y: 33,
  },
  {
    type: "switch",
    icon: <LiveTvOutlinedIcon />,
    checked: true,
    id: "0z9y282p3",
    x: 338,
    y: 322,
  },
  {
    type: "switch",
    icon: <WbIncandescentOutlinedIcon />,
    checked: true,
    id: "tmtqqasmi",
    x: 330,
    y: 132,
  },
  {
    type: "switch",
    icon: <LightOutlinedIcon />,
    checked: true,
    id: "omxnfyptx",
    x: 330,
    y: 77,
  },
]

const ForthScenario = () => {
  const [canvasDroppedItems, setCanvasDroppedItems] = useAtom(canvasDroppedItemsAtom)
  const [displaySuggestions, setDisplaySuggestions] = useAtom(displaySuggestionsAtom)

  const onHandleFirstSuggeestionApply = () => {
    console.log("First suggestion applied")
    setCanvasDroppedItems(firstScenarioSuggestions)
    setDisplaySuggestions({
      scenario: 5, // go to 4rd scenario
      display: true,
      // isManual: true,
    })
  }

  const onHandleSecondSuggeestionApply = () => {
    console.log("Second suggestion applied")
    setCanvasDroppedItems(secondScenarioSuggestions)
    setDisplaySuggestions({
      scenario: 5,
      display: true,
      // isManual: true,
    })
  }

  return (
    <>
      <Grid item key={1} sx={{ padding: "10px" }}>
        <Paper elevation={3} sx={{ padding: "2px" }}>
          <Box mb={"-30px"}>
            <SmartHomeSwitch label="Ceiling Light" checked={true} />
          </Box>

          <Box mb={1}>
            <SmartHomeSwitch label="Tv Light" checked={true} />
          </Box>

          <Box mb={1}>
            {/* <Button
              sx={{
                fontSize: "10px",
                color: "black",
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "white",
                },
              }}
              variant="contained"
            >
              Tv
            </Button> */}
            <SmartHomeSwitch label="Tv" checked={true} />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Tooltip
              title={
                <>
                  Consider using toggle buttons
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
          <Box mb={"-30px"}>
            <SmartHomeSwitch icon={<LightOutlinedIcon />} checked={true} />
          </Box>

          <Box mb={1}>
            <SmartHomeSwitch icon={<WbIncandescentOutlinedIcon />} checked={true} />
          </Box>
          <Box mb={1}>
            <SmartHomeSwitch icon={<LiveTvOutlinedIcon />} checked={true} />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Tooltip
              title={
                <>
                  Consider using toggle buttons
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

export default ForthScenario
