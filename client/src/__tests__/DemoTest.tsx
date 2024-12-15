import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Demo from "../Demo";

describe("Transaction Component", () => {
  test("to verify three buttons", () => {
    render(<Demo />);
    const withdrawButton = screen.getByText("Click");
    expect(withdrawButton).toBeInTheDocument();
  });
});
