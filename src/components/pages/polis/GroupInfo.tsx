import { getTeamLabel } from "./getTeamLabel";
import { from_ADS, getVotes } from "./voteUtil";
import { Comment, Naming, PCA } from "./types";
import { TeamLabelSpan } from "./TeamLabelSpan";
import { VoteBars } from "./VoteBars";

type GroupInfoProps = {
  pca: PCA;
  comments: Comment[];
  naming: Naming | undefined;
};

type Repness = {
  tid: number;
  "n-success": number;
  "n-trials": number;
  "repful-for": string;
};

const GroupInfo = ({ pca, comments, naming }: GroupInfoProps) => {
  const repness = pca.repness;

  // const detail = (c: Repness) => {
  //   const percent = (c["n-success"] / c["n-trials"]) * 100;
  //   const percentNotation = `${percent.toFixed(0)}%`;
  //   const ad = c["repful-for"] == "agree" ? "賛成" : "反対";
  //   return (
  //     <small>
  //       {c["n-trials"]}人中{c["n-success"]}人({percentNotation}) が {ad}
  //     </small>
  //   );
  // };
  const render_group_repness = (
    // group_id: number,
    group_repness: Array<Repness>
  ) => {
    return (
      <ul>
        {group_repness.map((c, i) => (
          <li key={i}>
            #{c.tid}: {tid_to_text[c.tid]} <br />
            {/* {detail(c)} */}
            {/* <VoteBar votes={from_ADS(getVotes(pca, group_id, c.tid))} /> */}
            {VoteBars(
              [0, 1, 2, 3, 4].map((i) => from_ADS(getVotes(pca, i, c.tid)))
            )}
            <br />
          </li>
        ))}
      </ul>
    );
  };

  const tid_to_text = {} as { [key: number]: string };
  comments.forEach((c) => {
    tid_to_text[c.tid] = c.txt;
  });

  // groupごとの特徴的なコメントを表示
  const groups = [0, 1, 2, 3, 4].map((group_id) => {
    const g = repness[group_id];
    const label = getTeamLabel(group_id);
    let name, desc;
    if (naming) {
      name = naming[group_id]?.name ?? label;
      desc = naming[group_id]?.description ?? "";
    } else {
      name = "";
      desc = "";
    }
    if (!g) return null;
    return (
      <div
        className="container rounded-md mx-auto flex flex-col gap-5 bg-white p-2 mb-4"
        key={group_id}
        id={`${group_id}`}
      >
        {/* <div key={group_id} className="p-4 bg-gray-100 rounded-lg shadow-md my-4"> */}
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          <TeamLabelSpan i={group_id} />
          <p>{name}</p>
        </h2>

        <p className="text-gray-600 mb-4">🤖{desc}</p>

        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          特徴的な意見
        </h2>

        <div className="text-gray-600">{render_group_repness(g)}</div>
      </div>
    );
  });

  return <div>{groups}</div>;
};
export default GroupInfo;
