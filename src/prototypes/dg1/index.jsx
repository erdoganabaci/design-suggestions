import { Grid, Typography, Button } from "@mui/material"
import Canvas from "./components/Canvas"
import DesignSuggestions from "./components/DesignSuggestions"
import Sidebar from "./components/Sidebar"
import Chatbot from "./components/Chatbot"
import DialogRectangleBox from "./components/DialogRectangleBox"

const DG1Prototype = () => {
  return (
    <Grid
      container
      // spacing={2}
      // marginTop={4}
      padding={"10px"}
      style={{ width: "100vw", height: "100vh" }}
      justifyContent={"space-between"}
      // gap={1}
      display={"flex"}
    >
      <Grid
        item
        xs={2}
        xl={2}
        sx={{ border: "1px solid black" }}
        style={{ paddingTop: 0, overflow: "auto" }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid display={"flex"} flexDirection={"column"}>
          <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline" }}>
            Design Items
          </Typography>
          <Sidebar />
        </Grid>
        <Grid mb={1}>
          {/* <Button variant="contained">Generate Designs</Button> */}
          {/* <Button variant="contained" sx={{ m: 2, alignSelf: "center" }}>
            Generate Designs
          </Button> */}
        </Grid>
      </Grid>
      <Grid item xs={4} xl={4} display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Canvas />
        <Grid item xs={2} xl={2} style={{ paddingTop: 0 }}>
          <DialogRectangleBox />
        </Grid>
      </Grid>
      <Grid item xs={2} xl={2} style={{ paddingTop: 0 }}>
        {/* <Chatbot /> */}
      </Grid>

      {/* <Grid item xs={2} xl={2} sx={{ border: "1px solid black" }} style={{ paddingTop: 0 }}>
        <DesignSuggestions />
      </Grid> */}
    </Grid>
  )
}

export default DG1Prototype
