import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatWorkspace } from "../components/chat-workspace";

describe("ChatWorkspace", () => {
  it("renders conversation navigation, chat, approval, composer, and live context", () => {
    render(<ChatWorkspace />);
    expect(screen.getByRole("navigation", { name: "Conversations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Launch readiness" })).toBeInTheDocument();
    expect(screen.getByText("Read project status")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve send revised timeline" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ask Meridian OS to move work forward…")).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Live context" })).toBeInTheDocument();
  });
});
