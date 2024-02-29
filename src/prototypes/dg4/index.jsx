import { useEffect, useState } from "react"
import { Grid, Typography, Button } from "@mui/material"
import Canvas from "./components/Canvas"
// import DesignSuggestions from "./components/DesignSuggestions"
import Chatbot from "./components/Chatbot"
import Sidebar from "./components/Sidebar"

const DG4Prototype = () => {
  const [closeCanvas, setCloseCanvas] = useState(false)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCloseCanvas(true)
  //   }, [3000])
  // }),
  //   []
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={!closeCanvas ? 4 : 6}
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
      {!closeCanvas && (
        <Grid item xs={5} display={"flex"} justifyContent={"center"}>
          <Canvas />
        </Grid>
      )}
      <Grid item xs={!closeCanvas ? 3 : 6} sx={{ border: "1px solid black" }} style={{ paddingTop: 0 }}>
        {/* <DesignSuggestions /> */}
        <Chatbot />
      </Grid>
    </Grid>
  )
}

export default DG4Prototype
