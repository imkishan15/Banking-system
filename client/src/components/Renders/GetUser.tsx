import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import styled from "styled-components";

type Props = {
  userId: number | "" | undefined;
  updateUserId: (value: number) => void;
};

export const InputContainer = styled.div`
  background: #1b1b1b;
  width: 50%;
  padding: 12px;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  margin: auto;
  margin-top: 16px;
  flex-direction: column;
  gap: 16px;
`;

const GetUser: React.FC<Props> = ({ userId, updateUserId }) => {
  const { userIds } = UserData();
  const { pathname } = useLocation();
  const [notFoundId, setNotFoundId] = useState<number>();

  const navigate = useNavigate();
  const [noUser, setNoUser] = useState(false);

  const handleUserSelection = () => {
    if (userIds.includes(userId as number)) {
      setNoUser(false);
      navigate(`${pathname}?id=${userId}`);
    } else {
      setNoUser(true);
      setNotFoundId(userId as number);
    }
  };
  return (
    <div>
      <InputContainer>
        <center>
          Enter user ID:{" "}
          <input
            type="number"
            value={userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateUserId(Number(e.target.value))
            }
            required
          />{" "}
          <Button
            onClick={handleUserSelection}
            variant="contained"
            size="small"
          >
            Get User
          </Button>
        </center>
        {noUser && (
          <Alert severity="error">
            {userId ? `No user Found with ID: ${notFoundId}` : "Enter userId"}
          </Alert>
        )}
      </InputContainer>
    </div>
  );
};

export default GetUser;
