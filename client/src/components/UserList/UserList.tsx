import React, { useEffect, useState } from "react";
import { INFO, REMOVE, User } from "../../utils/util";
import styled from "styled-components";
import { Card, CircularProgress } from "@mui/material";
import ModalWrapper from "./ModalWrapper";
import ErrorIcon from "@mui/icons-material/Error";
import TableData from "./TableData";
import UserInfo from "./UserInfo";
import RemoveUser from "./RemoveUser";
import { UserData } from "../../context/UserContext";

const StyledTableContainer = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 64px;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  padding: 32px;
  width: 300px;
  margin: auto;
  margin-top: 64px;
`;

export const LoadingComponent = () => (
  <StyledCard>
    <CircularProgress />
    Loading...
  </StyledCard>
);

export const ErrorComponent = () => (
  <StyledCard>
    <ErrorIcon />
    Something went wrong...
    <br />
    Please try again later
  </StyledCard>
);

const UserList = () => {
  const [openUserInfoModal, setOpenUserInfoModal] = useState(false);
  const [openRemoveUserModal, setOpenRemoveUserModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { users, error, getAllUsers } = UserData();
  const [selectedUser, setSelectedUser] = useState<User>(users?.[0]);

  useEffect(() => {
    getAllUsers();
    setLoading(false);
  }, []);

  const handleModal = (user: User, type: typeof REMOVE | typeof INFO) => {
    setSelectedUser(user);
    if (type === INFO) {
      setOpenUserInfoModal(true);
    } else {
      setOpenRemoveUserModal(true);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent />;
  }

  return (
    <StyledTableContainer>
      <ModalWrapper
        openModal={openUserInfoModal}
        setOpenModal={setOpenUserInfoModal}
        title="User Info"
      >
        <UserInfo user={selectedUser} />
      </ModalWrapper>
      <ModalWrapper
        openModal={openRemoveUserModal}
        setOpenModal={setOpenRemoveUserModal}
        title="Remove User"
      >
        <RemoveUser user={selectedUser} />
      </ModalWrapper>
      <TableData users={users} handleModal={handleModal} />
    </StyledTableContainer>
  );
};

export default UserList;
