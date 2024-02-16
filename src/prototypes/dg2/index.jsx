import { Grid, Typography, Button } from "@mui/material"
import Canvas from "./components/Canvas"
import DesignSuggestions from "./components/DesignSuggestions"
import Sidebar from "./components/Sidebar"

const DG2Prototype = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={4}
        sx={{ border: "1px solid black" }}
        style={{ paddingTop: 0 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Grid display={"flex"} flexDirection={"column"}>
          <Typography variant="h6" gutterBottom sx={{ textDecoration: "underline" }}>
            Design Items
          </Typography>
          <Sidebar />
        </Grid>
        <Grid width={"100px"} mb={1}>
          <Button variant="contained">Generate Designs</Button>
        </Grid>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"center"}>
        <Canvas />
      </Grid>
      {/* <Grid item xs={3} sx={{ border: "1px solid black" }} style={{ paddingTop: 0 }}>
        <DesignSuggestions />
      </Grid> */}
    </Grid>
  )
}

export default DG2Prototype
