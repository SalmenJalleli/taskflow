import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import TaskCard from "./TaskCard";
import { MemoryRouter } from "react-router";

test("calls onToggle when Complete is clicked", async () => {
  const user = userEvent.setup();
  const onToggle = vi.fn();
  render(
    <MemoryRouter>
      <TaskCard
        task={{ id: "al", title: "Read React docs", completed: false }}
        onToggle={onToggle}
      />
    </MemoryRouter>,
  );
  await user.click(screen.getByRole("button", { name: /complete/i }));
  expect(onToggle).toHaveBeenCalledWith("al");
});
