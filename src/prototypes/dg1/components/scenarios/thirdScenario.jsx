import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import { canvasDroppedItemsAtom } from "../../store/droppedItems.atom"
import { useAtom } from "jotai"
import { displaySuggestionsAtom } from "../../store/displaySuggestions.atom"
import { blue } from "@mui/material/colors"

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
    type: "button",
    text: "TV",
    color: "#004cc8",
    textColor: "white",
    id: "0z9y289c3",
    x: 338,
    y: 322,
  },
  {
    type: "button",
    text: "TV LIGHT",
    color: "#004cc8",
    textColor: "white",
    id: "tmtqqasmi",
    x: 330,
    y: 132,
  },
  {
    type: "button",
    text: "CEILING LIGHT",
    color: "#004cc8",
    textColor: "white",
    id: "qmxnfyqra",
    x: 307,
    y: 77,
  },
]

const secondScenarioSuggestions = [
  {
    type: "button",
    text: "TV",
    color: "white",
    id: "0z9y289c3",
    x: 338,
    y: 322,
  },
  {
    type: "button",
    text: "CEILING LIGHT",
    color: "white",
    id: "qmxnfyqra",
    x: 307,
    y: 77,
  },
  {
    type: "button",
    text: "TV LIGHT",
    color: "white",
    id: "ruvrw27py",
    x: 318,
    y: 278,
  },
]

const SmartHomeSwitch = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: blue[600],
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              },
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: blue[600],
            },
          }}
        />
      }
      label={
        <Typography margin={0} fontSize={"12px"} variant="body2">
          {label}
        </Typography>
      }
      labelPlacement="start"
      sx={{ justifyContent: "space-between", margin: "10px 0", width: "100%", marginLeft: "0" }}
    />
  )
}

const ThirdScenario = () => {
  const [canvasDroppedItems, setCanvasDroppedItems] = useAtom(canvasDroppedItemsAtom)
  const [displaySuggestions, setDisplaySuggestions] = useAtom(displaySuggestionsAtom)

  const onHandleFirstSuggeestionApply = () => {
    console.log("First suggestion applied")
    setCanvasDroppedItems(firstScenarioSuggestions)
    setDisplaySuggestions({
      scenario: 4, // go to 4rd scenario
      display: true,
      // isManual: true,
    })
  }

  const onHandleSecondSuggeestionApply = () => {
    console.log("Second suggestion applied")
    setCanvasDroppedItems(secondScenarioSuggestions)
    setDisplaySuggestions({
      scenario: 4,
      display: true,
      // isManual: true,
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
            <Typography fontSize={"12px"} variant="body2">
              Living Room Controller
            </Typography>
          </Box>
          <Box mb={1}>
            <Button
              sx={{
                fontSize: "10px",
                color: "white",
                backgroundColor: "#004cc8",
                ":hover": {
                  backgroundColor: "#004cc8",
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
                color: "white",
                backgroundColor: "#004cc8",
                ":hover": {
                  backgroundColor: "#004cc8",
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
                color: "white",
                backgroundColor: "#004cc8",
                ":hover": {
                  backgroundColor: "#004cc8",
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
                  Consider adding a title to your application
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

export default ThirdScenario
