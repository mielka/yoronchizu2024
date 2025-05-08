import React from "react";
import { VoteData } from "./types";
import { AGREE_GREEN, DISAGLEE_RED, NEUTRAL_GRAY } from "./color";

const VoteBar: React.FC<{ votes: VoteData | null }> = ({ votes }) => {
  if (!votes) return null;
  const { agree, neutral, disagree } = votes;
  const total = agree + neutral + disagree;

  // 割合を計算
  const agreePercent = (agree / total) * 100;
  const neutralPercent = (neutral / total) * 100;
  const disagreePercent = (disagree / total) * 100;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "15px",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${agreePercent}%`,
          backgroundColor: AGREE_GREEN,
          color: "white",
          textAlign: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {/* Agree ({agree}) */}
        {/* 賛成 */}
      </div>
      <div
        style={{
          width: `${neutralPercent}%`,
          backgroundColor: NEUTRAL_GRAY,
          color: "white",
          textAlign: "center",
        }}
      >
        {/* Neutral ({neutral}) */}
      </div>
      <div
        style={{
          width: `${disagreePercent}%`,
          backgroundColor: DISAGLEE_RED,
          color: "white",
          textAlign: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {/* 反対 */}
        {/* Disagree ({disagree}) */}
      </div>
    </div>
  );
};

export default VoteBar;
