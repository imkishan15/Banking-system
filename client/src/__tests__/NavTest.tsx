import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing context
import { ROUTES } from "../Routes/routes";
import NavBar from "../components/Navbar";

// Mock useLocation from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Keep the actual implementations of other hooks
  useLocation: jest.fn(), // Mock useLocation
}));

describe("NavBar", () => {
  it("renders the nav links correctly", () => {
    // Mock useLocation to return a specific pathname
    require("react-router-dom").useLocation.mockReturnValue({
      pathname: ROUTES.HOME, // Set initial pathname as HOME
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Check that the "Home" link has active styles (because current pathname is ROUTES.HOME)
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveStyle("background-color: #535353"); // Active link style

    // Check that other links are not active
    const userListLink = screen.getByText("User List");
    expect(userListLink).not.toHaveStyle("background-color: #535353");
  });

  it('highlights the "Make Transaction" link when active', () => {
    // Mock useLocation to return a pathname that matches TRANSACTION
    require("react-router-dom").useLocation.mockReturnValue({
      pathname: ROUTES.TRANSACTION, // Set active pathname to TRANSACTION
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Check that the "Make Transaction" link is highlighted (active)
    const makeTransactionLink = screen.getByText("Make transaction");
    expect(makeTransactionLink).toHaveStyle("background-color: #535353"); // Active link style
  });

  it('navigates to the correct route when clicking on "Make Transaction"', () => {
    // Mock the location to be at the Home page initially
    require("react-router-dom").useLocation.mockReturnValue({
      pathname: ROUTES.HOME,
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Find the "Make Transaction" link by its text
    const makeTransactionLink = screen.getByText("Make transaction");

    // Simulate a click on the "Make Transaction" link
    fireEvent.click(makeTransactionLink);

    // Check if the current pathname is updated to the transaction route
    // Since we're using BrowserRouter, the URL should update in the browser, but we can simulate that by checking location change
    expect(window.location.pathname).toBe(ROUTES.TRANSACTION); // Verify the expected path
  });
});
