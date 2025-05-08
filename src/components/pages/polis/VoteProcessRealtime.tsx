import type { NextPage } from "next";
import { useState } from "react";
import { CommentCard } from "./CommentCard";
import { NextCommentState, VotesResponse } from "./types";

type VoteProcessRealtimeProps = {
  // Polis API を呼び出す際のパス (e.g. https://localhost:3000/api/polis/proxy/api)
  polis_api_proxy_path: string;
  conversation_id: string | null;
  addVoteHistory: (tid: number, vote: number) => void;
  givenNextComment?: NextCommentState;
};
export const VoteProcessRealtime: NextPage<VoteProcessRealtimeProps> = ({
  polis_api_proxy_path,
  conversation_id,
  addVoteHistory,
  givenNextComment,
}) => {
  const [loading, setLoading] = useState(false);
  const [nextComment, setNextComment] = useState<NextCommentState | undefined>(
    givenNextComment
  );
  console.log("VoteProcessRealtime: Render");

  console.log({ nextComment });
  const handleVote = async (vote: number) => {
    console.log("VoteProcessRealtime: handleVote");
    setLoading(true);

    try {
      if (!nextComment) {
        throw new Error("No next comment to vote on");
      }

      addVoteHistory(nextComment.tid, vote);

      // クライアントのクッキー情報を取得
      const cookies = document.cookie;
      console.log("client cookies:", cookies);

      // nishio: ここでconversation_idがnullの場合はなんらか上流で間違いが起きているが、エラーで殺すのもなんだなと思う
      // 現状nullではないことを確認した
      // fieldはChrome DevToolsと対応しやすいようにABC順に並べている、過不足はないことを確認した
      const voteData = {
        agid: 1,
        conversation_id,
        lang: "ja",
        pid: "mypid",
        tid: nextComment.tid,
        vote,
        weight: 0,
      };
      console.log("voteData:", voteData);
      const api = `${polis_api_proxy_path}/v3/votes`;
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
        credentials: "include",
      });
      const result: VotesResponse = await response.json();

      // const setCookieHeader = response.headers.get("set-cookie");
      // console.log("set cookies:", setCookieHeader);  // これはnullなので投票で新しいcookieがセットされているわけではない

      console.log("currentPid:", result.currentPid); // なぜか投票のたびに+1される

      console.log("result:", result);
      if (!result.nextComment) {
        console.log("No more comments to show");
        setNextComment(undefined);
      } else {
        // console.log("set next comment:", {
        //   txt: result.nextComment.txt,
        //   tid: result.nextComment.tid,
        //   remaining: result.nextComment.remaining,
        // });
        // この過程で問題は起きてなさそう
        setNextComment({
          txt: result.nextComment.txt,
          tid: result.nextComment.tid,
          remaining: result.nextComment.remaining,
        });
        // console.log("set next comment: done");
      }
    } catch (error) {
      console.error("Error submitting opinion:", error);
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
