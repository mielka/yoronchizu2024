import { SectionHeading } from "../../commons/SectionHeading";
import { PCA, Comment } from "./types";
import { VoteBars } from "./VoteBars";
import { from_ADS, getVotes } from "./voteUtil";

export const Consensus: React.FC<{ pca: PCA; comments: Comment[] }> = ({
  pca,
  comments,
}) => {
  const consensus = pca.consensus;
  const tid_to_text = {} as { [key: number]: string };
  if (!consensus) return null;

  comments.forEach((c) => {
    tid_to_text[c.tid] = c.txt;
  });

  const filtered_consensus = [] as typeof consensus.agree;
  consensus.agree.forEach((c) => {
    if (c["p-test"] > 2.0) {
      // nishio: これでいいのか？
      filtered_consensus.push(c);
    }
  });
  consensus.disagree.forEach((c) => {
    if (c["p-test"] > 2.0) {
      filtered_consensus.push(c);
    }
  });

  const consensusDiv = (
    <div
      className="container rounded-md mx-auto flex flex-col gap-5 bg-white p-2 mb-4"
      id="consensus"
    >
      <SectionHeading>みんなのコンセンサス</SectionHeading>

      {filtered_consensus.length > 0
        ? filtered_consensus.map((c, i) => (
            <div key={i} className="text-gray-700">
              #{c.tid}: {tid_to_text[c.tid]}
              {VoteBars(
                [0, 1, 2, 3, 4].map((i) => from_ADS(getVotes(pca, i, c.tid)))
              )}
            </div>
          ))
        : "みんなのコンセンサスはまだありません。"}

      <div className="p-2 m-2 bg-gray-200 rounded-md">
        <small>
          「<strong>みんなのコンセンサス</strong>
          」はみんなの投票を足し合わせた単なる多数決ではなく、それぞれの意見グループごとでの賛成・反対の割合を掛け合わせたスコアによって選ばれています。
          つまり多数派が賛成していたとしても、強く反対するグループがいる場合には選ばれません。
          みんなの意見の分布によっては、ここで何も選ばれない場合もあります。
        </small>
      </div>
    </div>
  );
  return consensusDiv;
};
