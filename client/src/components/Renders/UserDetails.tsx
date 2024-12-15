import React from "react";
import { User } from "../../utils/util";
import styled from "styled-components";

const StyledUserDetail = styled.div`
  display: flex;
  justify-content: space-between;
  background: #252525;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 0 12px;
`;

type Props = {
  user: User;
};

const UserDetails: React.FC<Props> = ({ user }) => {
  return (
    <StyledUserDetail>
      <h4>ID: {user.id} </h4>
      <h4>Name: {user.name}</h4>
      <h4>Balance: {user.balance} </h4>
    </StyledUserDetail>
  );
};

export default UserDetails;
