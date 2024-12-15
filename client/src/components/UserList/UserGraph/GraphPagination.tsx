import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledFormControl = styled(FormControl)`
  width: 100px;
`;

type Props = {
  pageCount: number;
  page: number;
  pageSize: number;
  updatePage: (value: number) => void;
  updatePageSize: (value: number) => void;
};

const GraphPagination: React.FC<Props> = ({
  pageCount,
  page,
  pageSize,
  updatePage,
  updatePageSize,
}) => {
  const handlePagination = (_: any, value: number) => {
    updatePage(value);
  };
  const handlePage = (event: SelectChangeEvent) => {
    updatePageSize(Number(event.target.value));
  };
  return (
    <PaginationContainer>
      <Pagination page={page}
        count={pageCount}
        shape="rounded"
        onChange={handlePagination}
      />
      <br />
      <StyledFormControl>
        <InputLabel id="demo-simple-select-label">Page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(pageSize)}
          label={pageSize}
          onChange={handlePage}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </StyledFormControl>
    </PaginationContainer>
  );
};

export default GraphPagination;
