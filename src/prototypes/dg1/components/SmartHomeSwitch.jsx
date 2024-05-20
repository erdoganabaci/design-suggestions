import { Typography, Switch, FormControlLabel } from "@mui/material"
import { blue } from "@mui/material/colors"

const SmartHomeSwitch = ({ label, icon, checked, onChange }) => {
  console.log("here the icon", icon)
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
        icon ? (
          icon
        ) : (
          <Typography margin={0} fontSize={"12px"} variant="body2">
            {label}
          </Typography>
        )
      }
      labelPlacement="start"
      sx={{ justifyContent: "space-between", margin: "10px 0", width: "100%", marginLeft: "0" }}
    />
  )
}

export default SmartHomeSwitch
