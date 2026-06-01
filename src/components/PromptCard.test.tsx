import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PromptCard } from "./PromptCard";
import { type PromptCandidate } from "../types/pipeline.types";

const mockCandidate: PromptCandidate = {
  candidate_id: "candidate_XYZ",
  prompt_text: "Tohle je testovací text generovaného promptu.",
  metrics: {
    accuracy: 0.852,
    avg_latency_ms: 420,
  },
};

const defaultProps = {
  candidate: mockCandidate,
  isWinner: false,
  isSelected: false,
  bestMetrics: [],
  onClick: vi.fn(),
};

describe("PromptCard", () => {
  it("zobrazí ID kandidáta a text promptu", () => {
    render(<PromptCard {...defaultProps} />);

    expect(screen.getByText(/candidate_XYZ/i)).toBeInTheDocument();
    expect(screen.getByText("Tohle je testovací text generovaného promptu.")).toBeInTheDocument();
  });

  it("zobrazí badge vítěze, pokud je film/kandidát vítězný", () => {
    render(<PromptCard {...defaultProps} isWinner={true} />);

    expect(screen.getByText("Vítěz iterace ★")).toBeInTheDocument();
  });

  it("nezobrazí badge vítěze, pokud kandidát nevyhrál", () => {
    render(<PromptCard {...defaultProps} isWinner={false} />);

    expect(screen.queryByText("Vítěz iterace ★")).not.toBeInTheDocument();
  });

  it("zvýrazní metriku a přidá šipku, pokud je název metriky v seznamu bestMetrics", () => {
    render(<PromptCard {...defaultProps} bestMetrics={["accuracy"]} />);

    expect(screen.getByText("▲")).toBeInTheDocument();
    expect(screen.getByText("▲").parentElement).toHaveTextContent("85.2%");
    expect(screen.queryByText("420")?.textContent).not.toContain("▲");
  });

  it("zavolá funkci onClick po kliknutí na kartu", async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(<PromptCard {...defaultProps} onClick={onClickMock} />);
    await user.click(screen.getByText("Tohle je testovací text generovaného promptu."));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});