import React from "react";
import CardWrapper from "../Renders/CardWrapper";
import { User } from "../../utils/util";
import { makeTransfer } from "../../utils/methods";
import { Alert, Button } from "@mui/material";
import styled from "styled-components";

const UserDetailContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const StyledDetailContainer = styled.div`
  border-radius: 8px;
  background: #121212;
  width: 40%;
  padding-top: 16px;
  margin-bottom: 24px;
`;

type Props = {
  receiver: User;
  sender: User;
  transferAmount: number | undefined;
  updateTransferAmount: (amount: number) => void;
  closeTransferPage: () => void;
};

const userDetails = (user: User, type: string) => {
  return (
    <StyledDetailContainer>
      <h3>
        {type}'s Detail: <br />
      </h3>
      <div>
        <h4>ID: {user.id}</h4>
        <h4>Name: {user.name}</h4>
        <h4>Balance: {user.balance}</h4>
      </div>
    </StyledDetailContainer>
  );
};

const MakeTransfer: React.FC<Props> = ({
  receiver,
  sender,
  transferAmount,
  updateTransferAmount,
  closeTransferPage,
}) => {
  const handleTransfer = () => {
    const res = makeTransfer(
      sender.id as number,
      receiver.id as number,
      transferAmount as number
    );
    res.then((msg) => console.log(msg));
    closeTransferPage();
  };

  const isTransferDisabled =
    transferAmount !== undefined && sender.balance < transferAmount;

  return (
    <CardWrapper>
      <UserDetailContainer>
        {userDetails(sender, "Sender")}
        {userDetails(receiver, "Receiver")}
      </UserDetailContainer>
      {sender.balance === 0 ? (
        <Alert severity='error'>No money available with {sender.name} to transfer</Alert>
      ) : (
        <div>
          Enter amount to transfer: ₹{" "}
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => updateTransferAmount(Number(e.target.value))}
          />{" "}
          <Button
            variant="contained"
            disabled={isTransferDisabled}
            size="small"
            onClick={handleTransfer}
          >
            Transfer
          </Button>
        </div>
      )}
    </CardWrapper>
  );
};

export default MakeTransfer;
