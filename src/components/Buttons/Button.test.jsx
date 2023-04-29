import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UpVote from "./UpVote";
import TotalComment from "./TotalComment";

describe("UpVote", () => {
  it("should render the upvote button", () => {
    render(<UpVote />);

    expect(screen.getByTitle("Up-Vote")).toBeTruthy();
  });
});

describe("Total Comment", () => {
  it("should render the total comment button", () => {
    render(<TotalComment />);

    expect(screen.getByTitle("TotalComment-Vote")).toBeTruthy();
  });
});
