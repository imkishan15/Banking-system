import React from "react";
import NavBar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import { ROUTES } from "./Routes/routes";
import UserList from "./components/UserList/UserList";
import Statement from "./components/Statements/Statement";
import Transaction from "./components/Transactions/Transaction";
import Withdraw from "./components/Transactions/Withdraw";
import Deposit from "./components/Transactions/Deposit";
import Transfer from "./components/Transactions/Transfer";
import { DEPOSIT, TRANSFER, WITHDRAW } from "./utils/util";
import styled from "styled-components";

const BodyContent = styled.div`
  margin: auto;
  width: 90%;
`;

const Main = () => {
  return (
    <div>
        <Router>
          <NavBar />
          <BodyContent>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.USER_LIST} element={<UserList />} />
              <Route path={ROUTES.TRANSACTION} element={<Transaction />}>
                <Route path={WITHDRAW} element={<Withdraw />} />
                <Route path={DEPOSIT} element={<Deposit />} />
                <Route path={TRANSFER} element={<Transfer />} />
              </Route>
              <Route path={ROUTES.STATEMENTS} element={<Statement />} />
            </Routes>
          </BodyContent>
        </Router>
    </div>
  );
};

export default Main;
