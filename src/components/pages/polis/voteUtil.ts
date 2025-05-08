import { PCA } from "./types";

// 投票結果データの型定義
type VoteData = {
  A: number;
  D: number;
  S: number;
};

const from_ADS = (votes: { A: number; D: number; S: number } | undefined) => {
  if (!votes) return null;
  // console.log(votes);
  const { A, D, S } = votes;
  return {
    agree: A,
    disagree: D,
    neutral: S - A - D,
  };
};

const getVotes = (
  pca2: PCA,
  group_id: number,
  topic_id: number
): VoteData | undefined => {
  const gid = group_id.toString();
  const tid = topic_id.toString();
  return pca2["group-votes"][gid]?.votes[tid];
};

export { from_ADS, getVotes };
