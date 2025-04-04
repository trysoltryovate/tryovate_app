import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteDialog({
  isConfirmDialogOpen,
  deletingId,
  handleClose,
  handleDelete,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={isConfirmDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete the candidate with id: {deletingId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <button
            onClick={() => handleDelete(deletingId)}
            className="rounded-md bg-red-500 px-4 py-[7px] text-white"
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
