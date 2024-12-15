import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/routes";
import {
  DEPOSIT,
  TransactionType,
  TRANSFER,
  WITHDRAW,
} from "../../utils/util";
import styled from "styled-components";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  border: none;
  border-radius: 4px;
  color: aliceblue;
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
`;

const ButtonsGroup = styled.div`
  margin: auto;
  display: flex;
  width: 30%;
  justify-content: space-between;
  margin-top: 24px;
`;

const Transaction = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const typeStored = sessionStorage.getItem(
    "transactionType"
  ) as TransactionType;

  const [activeTab, setActiveTab] = useState<TransactionType>(
    typeStored || WITHDRAW
  );

  useEffect(() => {
    const pathSegments = location.pathname.split("/");

    if (location.pathname === ROUTES.TRANSACTION) {
      if (!typeStored) {
        navigate(`${ROUTES.TRANSACTION}/${WITHDRAW}`);
        setActiveTab(WITHDRAW);
      } else {
        navigate(`${ROUTES.TRANSACTION}/${typeStored}`);
      }
    } else {
      const lastParam = pathSegments[pathSegments.length - 1];
      setActiveTab(lastParam as TransactionType);
      sessionStorage.setItem("transactionType", lastParam);
    }
  }, [location.pathname, navigate, typeStored]);

  const handleButtonClick = (type: TransactionType) => {
    sessionStorage.setItem("transactionType", type);
    setActiveTab(type);
    navigate(`${ROUTES.TRANSACTION}/${type}`);
  };

  const transactionTypeArray: TransactionType[] = [WITHDRAW, DEPOSIT, TRANSFER];

  return (
    <div>
      <ButtonsGroup>
        {transactionTypeArray.map((transactionType) => (
          <StyledButton
            key={transactionType}
            onClick={() => handleButtonClick(transactionType)}
            variant={activeTab === transactionType ? "contained" : "outlined"}
          >
            {transactionType}
          </StyledButton>
        ))}
      </ButtonsGroup>
      <Outlet />
    </div>
  );
};

export default Transaction;
