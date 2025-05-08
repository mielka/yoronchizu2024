import type { NextPage } from "next";
import { Cache, Comment } from "./types";
import { getTeamLabel } from "./getTeamLabel";

export const PrintCache: NextPage<{ data: Cache }> = ({ data }) => {
  const commentMap: { [tid: number]: Comment } = {};
  data.comments.forEach((c) => {
    commentMap[c.tid] = c;
  });

  const pca = JSON.parse(data.participation_init.pca);
  let prompt = "";
  const total_votes_for_comment: { [gid: string]: number } = {};
  const total_agrees_for_comment: { [gid: string]: number } = {};
  const total_disagrees_for_comment: { [gid: string]: number } = {};

  Object.keys(pca["group-votes"]).forEach((gid) => {
    const votes = pca["group-votes"][gid].votes;
    Object.keys(votes).forEach((tid) => {
      const v = votes[tid];
      total_votes_for_comment[tid] = (total_votes_for_comment[tid] || 0) + v.S;
      total_agrees_for_comment[tid] =
        (total_agrees_for_comment[tid] || 0) + v.A;
      total_disagrees_for_comment[tid] =
        (total_disagrees_for_comment[tid] || 0) + v.D;
    });
  });

  Object.keys(pca.repness).forEach((group_id) => {
    const repness = pca.repness[group_id];
    prompt += "# " + getTeamLabel(parseInt(group_id)) + "\n";
    repness.forEach((r: { tid: number }) => {
      const c = commentMap[r.tid] as unknown as Comment;
      const agree = total_agrees_for_comment[c.tid] ?? 0;
      const disagree = total_disagrees_for_comment[c.tid] ?? 0;
      const total = total_votes_for_comment[c.tid] ?? 0;
      const neutral = total - agree - disagree;
      const overall = `**全体** 賛成: ${agree}, 反対: ${disagree}, 中立: ${neutral}, 合計: ${total}`;
      const g = pca["group-votes"][group_id].votes[r.tid];
      const group = `**このチーム** 賛成: ${g.A}, 反対: ${g.D}, 中立: ${g.S - g.A - g.D}, 合計: ${g.S}`;
      prompt += `## ${c.txt}\n - ${overall}\n - ${group}\n\n`;
    });
  });

  return (
    <div>
      <h2>Cache</h2>
      <textarea style={{ width: "100%" }} rows={10}>
        {JSON.stringify(data, null, 2)}
      </textarea>
      <h2>Prompt</h2>
      <textarea style={{ width: "100%" }} rows={10}>
        {prompt}
      </textarea>
    </div>
  );
};
