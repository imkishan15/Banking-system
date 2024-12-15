import React, { useState } from "react";
import { User } from "../../utils/util";
import { Alert, Button } from "@mui/material";
import CardWrapper from "../Renders/CardWrapper";
import MakeTransfer from "./MakeTransfer";
import { UserData } from "../../context/UserContext";
import { InputContainer } from "../Renders/GetUser";
import { MessageContainer } from "../Renders/MakeTransaction";

const Transfer = () => {
  const { getUser, userIds } = UserData();

  const [senderId, setSenderId] = useState<number>();
  const [sender, setSender] = useState<User>();
  const [receiverId, setReceiverId] = useState<number>();
  const [receiver, setReceiver] = useState<User>();
  const [transferAmount, setTransferAmount] = useState<number>();

  const [showTransferPage, setShowTransferPage] = useState(true);

  const [noUser, setNoUser] = useState(false);
  const [notFoundId, setNotFoundId] = useState<number>();

  const showTransfer = sender !== undefined && receiver !== undefined;

  const getSender = async () => {
    if (userIds.includes(senderId as number)) {
      setNoUser(false);
      const fetchedSender = await getUser(senderId as number);
      setSender(fetchedSender);
    } else {
      setNoUser(true);
      setNotFoundId(senderId as number);
    }
  };
  const getReceiver = async () => {
    if (userIds.includes(receiverId as number)) {
      const fetchedReceiver = await getUser(receiverId as number);
      setReceiver(fetchedReceiver);
      setNoUser(false);
    } else {
      setNoUser(true);
      setNotFoundId(receiverId as number);
    }
  };

  const updateTransferAmount = (amount: number) => setTransferAmount(amount);

  const onOpenTransfer = () => {
    setSender(undefined);
    setSenderId(undefined);
    setShowTransferPage(true);
  };

  if (!showTransferPage) {
    return (
      <MessageContainer>
        <CardWrapper>
          <Alert>Transfer is made successfully</Alert>
          Updated balance for {sender?.name}:{" "}
          {(sender as User).balance - (transferAmount as number)} <br />
          <br />
          Updated balance for {receiver?.name}:{" "}
          {(receiver as User).balance + (transferAmount as number)} <br />{" "}
          <center>
            <Button variant="contained" size="small" onClick={onOpenTransfer}>
              Wanna Transfer again?
            </Button>
          </center>
        </CardWrapper>
      </MessageContainer>
    );
  }

  return (
    <div>
      {" "}
      <InputContainer>
        <center>
          Enter sender ID:{" "}
          <input
            type="number"
            value={senderId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSenderId(Number(e.target.value))
            }
            required
          />{" "}
          <Button onClick={getSender} variant="contained" size="small">
            Get User
          </Button>
        </center>
        {noUser && sender === undefined && (
          <Alert severity="error">
            {senderId
              ? `No user Found with ID: ${notFoundId}`
              : "Enter sender's Id"}
          </Alert>
        )}{" "}
        {sender && (
          <center>
            Enter receiver ID:{" "}
            <input
              type="number"
              value={receiverId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReceiverId(Number(e.target.value))
              }
              required
            />{" "}
            <Button onClick={getReceiver} variant="contained" size="small">
              Get User
            </Button>
          </center>
        )}
        {noUser && sender && (
          <Alert severity="error">
            {receiverId
              ? `No user Found with ID: ${notFoundId}`
              : "Enter receiver's Id"}
          </Alert>
        )}
      </InputContainer>
      {showTransfer && !noUser && (
        <>
          {senderId === receiverId ? (
            <CardWrapper>Sender and receiver cannot be same</CardWrapper>
          ) : (
            <MakeTransfer
              receiver={receiver as User}
              sender={sender as User}
              transferAmount={transferAmount}
              updateTransferAmount={updateTransferAmount}
              closeTransferPage={() => setShowTransferPage(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Transfer;
