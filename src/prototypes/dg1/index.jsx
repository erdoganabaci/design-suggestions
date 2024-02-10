import { Grid } from "@mui/material"
import Canvas from "./components/Canvas"
import DesignSuggestions from "./components/DesignSuggestions"
import Sidebar from "./components/Sidebar"

const DG1Prototype = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} sx={{ border: "1px solid black" }}>
        <Sidebar />
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"center"}>
        <Canvas />
      </Grid>
      <Grid item xs={3} sx={{ border: "1px solid black" }}>
        <DesignSuggestions />
      </Grid>
    </Grid>
  )
}

export default DG1Prototype
