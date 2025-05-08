// // 使用例
// const votes: VoteHistoryData[] = [
//     { tid: 7, vote: -1 },
//     { tid: 13, vote: -1 },
//     { tid: 29, vote: -1 },
//     { tid: 37, vote: -1 },
// ];

import { PCA, VoteHistoryData } from "./types";

// // 配列からオブジェクトに変換
// const voteObject = arrayToObject(votes);
// console.log(voteObject); // { 7: -1, 13: -1, 29: -1, 37: -1 }

// // オブジェクトから配列に変換
// const voteArray = objectToArray(voteObject);
// console.log(voteArray); // [{ tid: 7, vote: -1 }, { tid: 13, vote: -1 }, ...]

// VoteData[]を { [tid]: vote } の形式に変換する関数
export function arrayToObject(voteArray: VoteHistoryData[]): {
  [key: number]: number;
} {
  return voteArray.reduce(
    (acc, curr) => {
      acc[curr.tid] = curr.vote;
      return acc;
    },
    {} as { [key: number]: number }
  );
}

// { [tid]: vote } の形式を VoteData[] に変換する関数
export function objectToArray(voteObject: {
  [key: number]: number;
}): VoteHistoryData[] {
  return Object.keys(voteObject).map((key) => ({
    tid: Number(key),
    vote: voteObject[Number(key)]!,
  }));
}

export const votes_to_pca = (
  pca: PCA,
  votes: { [key: number]: number } | number[]
) => {
  if (!pca?.pca?.comps) return;
  if (Array.isArray(votes)) {
    // spreadsheetからのコピペの場合、votesが配列になり、賛成が正になっている、ここでViteHistory型に変換する
    votes = arrayToObject(
      votes.map((vote, index) => ({ tid: index, vote: -vote }))
    );
  }

  const [pca_x, pca_y] = pca.pca.comps;
  const pca_center = pca.pca.center;
  if (!pca_center || !pca_x || !pca_y) return;

  let x = 0;
  let y = 0;
  Object.keys(votes).forEach((key) => {
    const tid = Number(key); // keyは文字列なので、数値に変換
    const vote = votes[tid];
    if (vote == undefined || isNaN(vote)) return; // NaNかundefinedの場合はスキップ

    // data point と center(平均値/PCAの原点) の距離を計算し、それにPCAの成分を掛ける
    const dxi = (vote - (pca_center[tid] || 0)) * (pca_x[tid] || 0);
    const dyi = (vote - (pca_center[tid] || 0)) * (pca_y[tid] || 0);

    // NaNチェックをしてから加算
    if (!isNaN(dxi) && !isNaN(dyi)) {
      x += dxi;
      y += dyi;
    }
  });

  // nishio: ない方が見た目がいいように思う
  // // コメント数や投票数を基にスケーリング: これは投票数が少ない人が原点に集まることを防ぐための処理
  // const numComments = pca.center.length;
  // const numVotes = Object.keys(votes).length;

  // if (numVotes > 0) {
  //   const sparsityCompensationFactor = Math.sqrt(numComments / numVotes);
  //   x *= sparsityCompensationFactor;
  //   y *= sparsityCompensationFactor;
  // }
  return { x, y };
};
