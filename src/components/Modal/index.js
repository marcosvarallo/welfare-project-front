import React, { useContext } from "react";
import { Modal as MaterialModal, Typography, Box, Button } from "@mui/material";
import { ModalContext } from "../../App";
import { Link } from "react-router-dom";
// import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: 0,
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Modal = () => {
  const { modalState, setModalState } = useContext(ModalContext);
  return (
    <MaterialModal
      open={modalState.isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalState.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          {modalState.description}
        </Typography>
        <Button
          sx={{
            ml: 0.5,
          }}
          variant="contained"
          type="submit"
          onClick={() => {
            modalState.handleClose();
            setModalState({ isOpen: false });
            modalState.refresh && window.location.reload();
          }}
          component={modalState.link && Link}
          to={modalState.link && modalState.link}
        >
          OK
        </Button>
      </Box>
    </MaterialModal>
  );
};

export default Modal;
