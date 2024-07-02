import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material" // Import other MUI components as needed

const EditElementDialog = ({ open, onClose, element, onTextChange, onColorChange, onTextColorChange, onRemove }) => {
  const isButton = element?.type === "button"
  const isImage = element?.type === "image"

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {isImage ? "Image" : "Element"}</DialogTitle>
      <DialogContent>
        {!isImage && (
          <TextField
            margin="dense"
            label="Text"
            fullWidth
            variant="outlined"
            value={element?.text}
            onChange={(e) => onTextChange(e.target.value)}
          />
        )}
        {isButton && (
          <TextField
            type="color"
            margin="dense"
            label="Button Color"
            fullWidth
            variant="outlined"
            value={element?.color}
            onChange={(e) => onColorChange(e.target.value)}
          />
        )}

        {isButton && (
          <TextField
            type="color"
            margin="dense"
            label="Button Text Color"
            fullWidth
            variant="outlined"
            value={element?.textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        {!isImage && <Button onClick={onClose}>Cancel</Button>}
        {!isImage && <Button onClick={onClose}>Save</Button>}
        <Button color="error" onClick={() => onRemove(element.id)}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditElementDialog
