import React, { useState } from "react";
import { User } from "../../utils/util";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/routes";
import { UserData } from "../../context/UserContext";
import UserDetails from "../Renders/UserDetails";
import ModalWrapper from "./ModalWrapper";
import StatementGraph from "../Statements/StatementGraph";
import { formatData } from "../../utils/methods";

type Props = {
  user: User;
};

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InfoContainer = styled.div`
  font-size: 18px;
  padding-top: 16px;
`;

const UserInfo: React.FC<Props> = ({ user }) => {
  const { updateUser } = UserData();
  const navigate = useNavigate();
  const transactionsLength = user.transactions.length;

  const [openGraph, setOpenGraph] = useState(false);

  const getTransaction = () => {
    const transactions = user.transactions;
    if (transactionsLength === 0) {
      return `There is no transaction record for ${user.name}`;
    }
    const lastTransaction = transactions[transactionsLength - 1];
    return `Last Transaction: ${lastTransaction.reason} of  ₹${lastTransaction.amount}`;
  };

  const showStatement = () => {
    updateUser(user);
    navigate(`${ROUTES.STATEMENTS}?id=${user.id}`);
  };

  const showGraph = () => {
    setOpenGraph(true);
  };

  return (
    <InfoContainer>
      <ModalWrapper
        openModal={openGraph}
        setOpenModal={setOpenGraph}
        title={`Graph of ${user.name}`}
      >
        <StatementGraph transactions={formatData(user.transactions)} />
      </ModalWrapper>
      <UserDetails user={user} />
      {getTransaction()} <br /> <br />
      {transactionsLength !== 0 && (
        <ButtonsContainer>
          <Button variant="contained" size="small" onClick={showStatement}>
            Statement of {user.name}
          </Button>
          <Button variant="contained" size="small" onClick={showGraph}>
            Graph of {user.name}
          </Button>
        </ButtonsContainer>
      )}
    </InfoContainer>
  );
};

export default UserInfo;
