import React from "react";
import { FormattedTransactions } from "../../utils/util";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  margin-top: 24px;
`;

type Props = {
  transactions: FormattedTransactions[];
};
const StatementTable: React.FC<Props> = ({ transactions }) => {
  return (
    <TableContainer component={StyledPaper} sx={{ maxHeight: 420 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Reason</TableCell>
            <TableCell align="center">Credit</TableCell>
            <TableCell align="center">Debit</TableCell>
            <TableCell align="center">Balance</TableCell>
            <TableCell align="center">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{transaction.Reason}</TableCell>
              <TableCell align="center">{transaction.Credit}</TableCell>
              <TableCell align="center">{transaction.Debit}</TableCell>
              <TableCell align="center">{transaction.Balance}</TableCell>
              <TableCell align="center">{transaction.Time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatementTable;
