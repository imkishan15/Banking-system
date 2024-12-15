import React, { useEffect, useState } from "react";
import { TransactionType, User, WITHDRAW } from "../../utils/util";
import { Alert, Button, Card } from "@mui/material";
import styled from "styled-components";
import { capitalize } from "lodash";
import CardWrapper from "./CardWrapper";
import UserDetails from "./UserDetails";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  user: User | undefined;
  title: string;
  amount: number | undefined;
  updateAmount: (value: number) => void;
  type: TransactionType;
  handleTransaction: () => void;
  closeInput: () => void;
  initializeAmount: () => void;
};

const StyledCard = styled(Card)`
  margin: auto;
  width: 50%;
  margin-top: 24px;
  padding: 16px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const MakeTransaction: React.FC<Props> = ({
  title,
  type,
  handleTransaction,
  amount,
  user,
  updateAmount,
  closeInput,
  initializeAmount,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openMessage, setOpenMessage] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);

  useEffect(() => {
    setOpenTransaction(user !== undefined);
  }, [user]);

  const onSubmit = () => {
    handleTransaction();
    setOpenMessage(true);
    setOpenTransaction(false);
    navigate(`${pathname}`);
    closeInput();
  };

  const onOpenWithdraw = () => {
    setOpenMessage(false);
    setOpenTransaction(false);
    closeInput();
    initializeAmount();
  };

  const isTypeWithdraw = type === WITHDRAW;
  const isWithdrawDisable = !(
    isTypeWithdraw &&
    amount !== undefined &&
    (user as User).balance >= amount
  );

  const newAmount =
    ((isTypeWithdraw ? -(amount as number) : amount) as number) +
    (user?.balance as number);
  return (
    <div>
      {openMessage && (
        <MessageContainer>
          <CardWrapper>
            <Alert>{capitalize(type)} is made successfully</Alert>
            Updated balance for {user?.name}: {newAmount} <br />
            <center>
              <Button variant="contained" size="small" onClick={onOpenWithdraw}>
                Wanna Withdraw again?
              </Button>
            </center>
          </CardWrapper>
        </MessageContainer>
      )}
      {openTransaction && (
        <StyledCard>
          <center>
            <h2>{title}</h2>
          </center>
          <UserDetails user={user as User} />
          {isTypeWithdraw && user?.balance === 0 ? (
            <Alert severity="error">No money available for withdrawal</Alert>
          ) : (
            <>
              Enter amount to {type}: ₹{" "}
              <input
                type="number"
                value={amount}
                onChange={(e) => updateAmount(Number(e.target.value))}
              />{" "}
              <Button
                variant="contained"
                disabled={isWithdrawDisable}
                size="small"
                onClick={onSubmit}
              >
                {type}
              </Button>
            </>
          )}
        </StyledCard>
      )}
    </div>
  );
};

export default MakeTransaction;
