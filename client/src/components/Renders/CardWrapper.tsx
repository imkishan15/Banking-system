import { Card } from "@mui/material";
import styled from "styled-components";

export const CardWrapper = styled(Card)<{ flexRow?: boolean }>`
  font-size: 18px;
  display: flex;
  flex-direction: ${(props) => (props.flexRow ? "row" : "column")};
  text-align: center;
  justify-content: center;
  padding: 24px;
  width: 50%;
  align-items: center;
  gap: 16px;
  margin: auto;
  margin-top: 24px;
`;

export default CardWrapper;
