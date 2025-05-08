import { AGREE_GREEN, DISAGLEE_RED, NEUTRAL_GRAY } from "./color";

type NextCommentState = {
  txt: string;
  tid: number;
  remaining: number;
};
type HandleVote = (vote: number) => Promise<void>;
type CommentCardProps = {
  nextComment: NextCommentState | undefined;
  handleVote: HandleVote;
  loading: boolean;
};
export const CommentCard = ({
  nextComment,
  handleVote,
  loading,
}: CommentCardProps) => (
  <div className="overflow-hidden rounded-lg bg-white shadow">
    <div className="px-4 py-5 flex flex-col gap-5">
      {nextComment?.tid !== undefined ? (
        <>
          <h2 className="font-semibold text-xl text-center">
            {nextComment?.txt}
          </h2>
          <p className="text-right">残り設問数: {nextComment?.remaining}</p>
          <div className="flex flex-row justify-between max-w-md w-full mx-auto">
            <button
              type="button"
              className={"rounded-lg px-5 py-2"}
              onClick={() => handleVote(-1)}
              disabled={loading}
              style={{
                backgroundColor: AGREE_GREEN,
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "2rem",
              }}
              id="vote-yes"
            >
              賛成
            </button>

            <button
              type="button"
              className={"rounded-lg px-5"}
              onClick={() => handleVote(0)}
              disabled={loading}
              style={{
                backgroundColor: NEUTRAL_GRAY,
                color: "white",
                fontSize: "0.8rem",
                fontWeight: "bold",
                borderRadius: "2rem",
              }}
              id="vote-neutral"
            >
              どちらでも
              <br />
              ない
            </button>

            <button
              type="button"
              className={"rounded-lg px-5 py-2"}
              onClick={() => handleVote(1)}
              disabled={loading}
              style={{
                backgroundColor: DISAGLEE_RED,
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "2rem",
              }}
              id="vote-no"
            >
              反対
            </button>
          </div>

          <button
            type="button"
            className={"rounded-lg py-2"}
            onClick={() => handleVote(0)}
            disabled={loading}
            style={{
              backgroundColor: "lightgray",
              color: "white",
              borderRadius: "2rem",
            }}
            id="vote-skip"
          >
            わからないのでこの設問はスキップ
          </button>
        </>
      ) : (
        <h2 className="font-semibold text-xl text-center">
          すべての設問に回答しました
        </h2>
      )}
    </div>
  </div>
);
