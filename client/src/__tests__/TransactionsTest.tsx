import { render, screen } from "@testing-library/react";
import Transaction from "../components/Transactions/Transaction";
import Main from "../Main";

describe("Transaction Component", () => {
  test("to verify three buttons", () => {
    render(<Transaction />);
    const withdrawButton = screen.getByText("WITHDRAW");
    expect(withdrawButton).toBeInTheDocument();
  });
});
