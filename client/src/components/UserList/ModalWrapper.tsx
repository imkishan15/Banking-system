import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React from "react";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
`;

const StyledCloseIcon = styled(CloseRoundedIcon)`
  padding: 0;
`;

type Props = {
  children: React.ReactNode;
  title: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalWrapper: React.FC<Props> = ({
  children,
  title,
  openModal,
  setOpenModal,
}) => {
  const handleModalClose = () => setOpenModal(false);
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header>
            <Title>{title}</Title>
            <IconButton onClick={handleModalClose}>
              <Tooltip placement="right" title="Close">
                <StyledCloseIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>
          </Header>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalWrapper;
