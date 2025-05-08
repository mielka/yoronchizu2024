// サーバの返信をまたない投票プロセス

import type { NextPage } from "next";
import { useState } from "react";
import { CommentCard } from "./CommentCard";
import { Comment } from "./types";

type VoteProcessNonRealtimeProps = {
  // Polis API を呼び出す際のパス (e.g. https://localhost:3000/api/polis/proxy/api)
  polis_api_proxy_path: string;
  conversation_id: string | null;
  addVoteHistory: (tid: number, vote: number) => void;
  comments: Comment[];
  start: number;
};
export const VoteProcessNonRealtime: NextPage<VoteProcessNonRealtimeProps> = ({
  polis_api_proxy_path,
  conversation_id,
  addVoteHistory,
  comments,
  start,
}) => {
  const [loading, setLoading] = useState(false);

  // const [nextComment, setNextComment] = useState<NextCommentState | undefined>(
  //   givenNextComment
  // );
  const [current, setCurrent] = useState(start);
  const c = comments[current];
  const nextComment = c
    ? {
        txt: c.txt,
        tid: c.tid,
        remaining: comments.length - current,
      }
    : undefined;

  const is_alive = false;
  const handleVote = async (vote: number) => {
    // console.log("VoteProcessNonRealtime: handleVote");
    setLoading(true);

    try {
      if (!nextComment) {
        throw new Error("No next comment to vote on");
      }

      addVoteHistory(nextComment.tid, vote);
      setCurrent(current + 1);

      if (conversation_id === null) {
        return; // 投票しない
      }

      if (is_alive) {
        // 投票するが、サーバの返信を待たない
        const voteData = {
          lang: "ja",
          weight: 0,
          vote,
          pid: "mypid",
          tid: nextComment.tid,
          conversation_id,
          agid: 1,
        };
        // const response =

        await fetch(`${polis_api_proxy_path}/v3/votes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(voteData),
          credentials: "include",
        });
      }
      // console.log("vote response:", response, await response.json());
    } catch (error) {
      // console.error("Error submitting opinion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* カード表示 */}
      <CommentCard
        nextComment={nextComment}
        handleVote={handleVote}
        loading={loading}
      />
      {loading && <p>Sending your opinion...</p>}
    </>
  );
};
