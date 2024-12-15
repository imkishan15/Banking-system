import React, { useState } from "react";
import { FormattedTransactions, monthNames } from "../../utils/util";
import { LineChart } from "@mui/x-charts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
import { getCurrentMonth } from "../../utils/methods";

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  transactions: FormattedTransactions[];
};

const StatementGraph: React.FC<Props> = ({ transactions }) => {
  const [month, setMonth] = useState<string>(getCurrentMonth);

  const handleChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  const [dates, balance] = transactions
    .map((transaction) => {
      const splittedTime = transaction.Time.split(" ");
      return {
        day: Number(splittedTime[2]),
        balance_now: transaction.Balance,
        monthInYear: splittedTime[3],
      };
    })
    .filter(({ monthInYear, day }, index, arr) => {
      return (
        monthInYear === month && (index === 0 || day !== arr[index - 1].day)
      );
    })
    .reduce(
      ([datesAcc, balanceAcc], { day, balance_now }) => {
        datesAcc.push(day);
        balanceAcc.push(balance_now);
        return [datesAcc, balanceAcc];
      },
      [[0], []] as [number[], number[]]
    );

  const lastTransactionIndex = transactions
    .map((transaction, index) => {
      const monthInYear = transaction.Time.split(" ")[3];
      return { index, monthInYear };
    })
    .reverse()
    .find(({ monthInYear }) => monthInYear === month)?.index;

  if (lastTransactionIndex && lastTransactionIndex + 1 < transactions.length) {
    dates.push(0);
    balance.push(transactions[lastTransactionIndex + 1].Balance);
  }

  return (
    <div>
      <LineChart
        xAxis={[{ data: dates.reverse() }]}
        series={[{ data: balance.reverse() }]}
        yAxis={[{ min: 0 }]}
        width={500}
        height={300}
      />
      <br />
      <SelectContainer>
        Select month:
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Month</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={month}
            label="Month"
            onChange={handleChange}
          >
            {monthNames.map((month) => (
              <MenuItem value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </SelectContainer>
    </div>
  );
};

export default StatementGraph;
