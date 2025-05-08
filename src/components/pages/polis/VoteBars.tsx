import { TeamLabelSpanFixedWidth } from "./TeamLabelSpan";
import { VoteData } from "./types";
import VoteBar from "./VoteBar";

export const VoteBars = (votes: (VoteData | null)[]) => {
  return (
    <div>
      {votes.map((v, i) => {
        if (!v) return null;
        return (
          <div
            key={`team-${i}`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TeamLabelSpanFixedWidth i={i} />
            <VoteBar votes={v} />
          </div>
        );
      })}
    </div>
  );
};
