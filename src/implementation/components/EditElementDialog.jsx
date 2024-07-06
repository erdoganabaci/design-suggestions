import React from "react"
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Input } from "@mui/material"

const EditElementDialog = ({
  open,
  onClose,
  element,
  onTextChange,
  onColorChange,
  onTextColorChange,
  onRemove,
  onFileChange,
  onFontSizeChange,
}) => {
  const isButton = element?.type === "button"
  const isImage = element?.type === "image"
  const isText = element?.type === "text"

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        onFileChange(ev.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

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
        {isText && (
          <TextField
            type="number"
            margin="dense"
            label="Font Size"
            fullWidth
            variant="outlined"
            value={element?.fontSize}
            onChange={(e) => onFontSizeChange(e.target.value)}
          />
        )}
        {isImage && <Input type="file" margin="dense" fullWidth variant="outlined" onChange={handleFileChange} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save</Button>
        <Button color="error" onClick={() => onRemove(element.id)}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditElementDialog
