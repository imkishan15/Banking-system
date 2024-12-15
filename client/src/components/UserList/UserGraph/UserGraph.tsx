import React, { useState } from "react";
import { CREDIT, DEBIT, User } from "../../../utils/util";
import { BarChart } from "@mui/x-charts";
import GraphPagination from "./GraphPagination";

type Props = {
  users: User[];
};

const UserGraph: React.FC<Props> = ({ users }) => {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const initialLength = Math.min(users.length, pageSize);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(initialLength);
  const nameArray = users.map((user) => user.name);
  const balance = users.map((user) => user.balance);

  const updatePageSize = (value: number) => {
    setPageSize(value);
    setPage(1);
    setStartIndex(0);
    setEndIndex(Math.min(users.length, value));
  };
  const updatePage = (value: number) => {
    setPage(value);
    setStartIndex(pageSize * (value - 1));
    setEndIndex(pageSize * value);
  };
  const debit = users.map((user) =>
    user.transactions
      .filter((transaction) => transaction.type === DEBIT)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  );
  const credit = users.map((user) =>
    user.transactions
      .filter((transaction) => transaction.type === CREDIT)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  );
  return (
    <div>
      <BarChart
        width={500}
        height={300}
        series={[
          {
            data: balance.slice(startIndex, endIndex),
            label: "balance",
            id: "balance",
          },
          {
            data: credit.slice(startIndex, endIndex),
            label: "credit",
            id: "credit",
          },
          {
            data: debit.slice(startIndex, endIndex),
            label: "debit",
            id: "debit",
          },
        ]}
        xAxis={[
          { data: nameArray.slice(startIndex, endIndex), scaleType: "band" },
        ]}
      />
      <GraphPagination
        pageCount={Math.floor(users.length / pageSize) + 1}
        page={page}
        pageSize={pageSize}
        updatePage={updatePage}
        updatePageSize={updatePageSize}
      />
    </div>
  );
};

export default UserGraph;
