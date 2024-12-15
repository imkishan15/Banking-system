import React, { useState } from "react";
import GetUser from "../Renders/GetUser";
import { Transactions, User } from "../../utils/util";
import { Button, Card } from "@mui/material";
import StatementTable from "./StatementTable";
import styled from "styled-components";
import CardWrapper from "../Renders/CardWrapper";
import useQueryParamUser from "../hooks/getIdParams";
import { LoadingComponent } from "../UserList/UserList";
import ModalWrapper from "../UserList/ModalWrapper";
import StatementGraph from "./StatementGraph";
import { formatData } from "../../utils/methods";

const StyledCard = styled(Card)`
  text-align: center;
  margin: auto;
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  height: fit-content;
  display: flex;
  align-self: center;
`;

const Statement = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const updateUserId = (id: number | undefined) => setUserId(id);
  const { user, loading } = useQueryParamUser(updateUserId);
  const isUserFetched = user !== undefined;

  const downloadStatement = () => {
    const transactions = formatData((user as User).transactions);
    const headers = Object.keys(transactions[0]);
    const csvString = [
      headers.join(","),
      ...transactions.map((transaction) =>
        Object.values(transaction)
          .map((value) =>
            typeof value === "string"
              ? `"${value.replace(/"/g, '""')}"`
              : value.toString()
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user?.name}_Statement.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const noTransactionComponent = (userName: string) => (
    <CardWrapper>{userName} is yet to make any transaction!!!</CardWrapper>
  );

  const modalTitle = `Line graph of ${user?.name}`;

  const openGraph = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <GetUser userId={userId} updateUserId={(id: number) => setUserId(id)} />
      <div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            {isUserFetched && (
              <>
                {user?.transactions.length === 0 ? (
                  noTransactionComponent(user.name)
                ) : (
                  <>
                    <StyledCard>
                      <h3>ID: {user.id} </h3>
                      <h3> Name: {user?.name}</h3>
                      <h3> Balance available: {user?.balance} </h3>
                      <StyledButton
                        variant="contained"
                        size="small"
                        onClick={() => downloadStatement()}
                      >
                        Download Statement
                      </StyledButton>
                      <StyledButton
                        variant="contained"
                        size="small"
                        onClick={() => openGraph()}
                      >
                        See graph
                      </StyledButton>
                    </StyledCard>
                    <ModalWrapper
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      title={modalTitle}
                    >
                      <StatementGraph
                        transactions={formatData(
                          user?.transactions as Transactions[]
                        )}
                      />
                    </ModalWrapper>
                    <StatementTable
                      transactions={formatData(
                        user?.transactions as Transactions[]
                      )}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Statement;
