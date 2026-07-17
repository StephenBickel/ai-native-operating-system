import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ApprovalCard } from "../components/approval-card";

it("records only one approval decision", () => {
  const onDecision = vi.fn();
  render(<ApprovalCard onDecision={onDecision} />);
  fireEvent.click(screen.getByRole("button", { name: "Approve send revised timeline" }));
  expect(onDecision).toHaveBeenCalledOnce();
  expect(onDecision).toHaveBeenCalledWith("approved");
  expect(screen.queryByRole("button", { name: "Reject send revised timeline" })).not.toBeInTheDocument();
  expect(screen.getByText("Approved by you")).toBeInTheDocument();
});
