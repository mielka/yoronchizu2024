import GraphParticipants from "./GraphParticipants";
import { You } from "./You";

import graphUtil, {
  pca_to_screen_y,
  pca_to_screnn_x,
  sideWithPadding,
  svgHeightWithPadding,
} from "./graphUtil";
import { Famous, Naming, PCA } from "./types";
import { FamousPoint } from "./FamousPoint";
import { votes_to_pca } from "./voteHistoryUtil";

import React from "react";
import * as d3 from "d3";
import { ZeroPointLine } from "./ZeroPointLine";
import { HullLabel } from "./HullLabel";
import { HullBoundary } from "./HullBoundary";

type Hull = {
  group: { gid: number }[];
  hull: [number, number][];
};

export type HullProps = Hull & {
  gid: number;
  pathString: string;
  selectedGroup: number | null;
  name: string;
};

// hullの最大値と最小値から中央座標を計算する関数
export const getRectangularCenter = (
  hull: [number, number][]
): [number, number] => {
  const xValues = hull.map((point) => point[0]);
  const yValues = hull.map((point) => point[1]);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  const xCenter = (xMin + xMax) / 2;
  const yCenter = (yMin + yMax) / 2;
  return [xCenter, yCenter];
};

type ScatterProps = {
  pca: PCA;
  me: { x: number; y: number };
  naming: Naming | undefined;
  famous: Famous[] | undefined;
  date: string | undefined;
  title: string | undefined;
  show_description: boolean;
};

export const Scatter = ({
  pca,
  me,
  naming,
  famous,
  date,
  title,
  show_description,
}: ScatterProps) => {
  const selectedGroup = null;
  const graphData = graphUtil(pca);

  const hulls = graphData.hulls;
  const line = d3.line();

  date ||= "2024-10-18";

  const description =
    famous !== undefined && famous!.length > 0 ? (
      <div className="p-2 m-2 bg-gray-200 rounded-md">
        <small>
          <strong>【データの見方/注意事項】</strong>
          <br />
          このグラフは<strong>{pca.n}人の意見</strong>を元に作られたものです。
          質問への回答内容に応じて考えが近しい人をグループ化しています。
          グループ間の距離感は意見の違いの度合いを示します。
          そのためグループの大きさは人数の多さではなく意見のばらつきを表します。
          表示されている意見の要約はあくまで現時点の意見集団のデータをAIが分析した結果であり、質問に答えるユーザが増えることで更新されていく予定です。
        </small>
      </div>
    ) : (
      <div className="p-2 m-2 bg-gray-200 rounded-md">
        <small>
          <strong>【データの見方/注意事項】</strong>
          <br />
          このグラフは<strong>{pca.n}人の意見</strong>を元に作られたものです。
          質問への回答内容に応じて考えが近しい人をグループ化しています。
          グループ間の距離感は意見の違いの度合いを示します。
          そのためグループの大きさは人数の多さではなく意見のばらつきを表します。
          表示されている意見の要約はあくまで現時点の意見集団のデータをAIが分析した結果であり、質問に答えるユーザが増えることで更新されていく予定です。
          <strong>
            このテーマはまだ各党のマニフェストでの記述が十分ではないため、他の世論地図と異なり政党アイコンは非表示としています。
          </strong>
        </small>
      </div>
    );

  return (
    <div>
      <svg
        role="presentation"
        className="mx-auto"
        viewBox={`0 0 ${sideWithPadding} ${svgHeightWithPadding}`}
        style={{
          transformOrigin: "0% 0%",
          width: "100%",
          height: "auto",
        }}
        id="svg"
      >
        <g>
          <ZeroPointLine />
          <g>
            {hulls
              ? hulls.map((hull) => {
                  if (!hull.hull) return null;
                  // console.log("hull.hull", hull.hull);
                  const gid = hull.group[0]!.gid;
                  const pathString = line(hull.hull);
                  if (!pathString) return null;

                  return (
                    <HullBoundary
                      key={gid}
                      gid={gid}
                      selectedGroup={selectedGroup}
                      pathString={pathString}
                    />
                  );
                })
              : ""}
          </g>

          <GraphParticipants points={graphData.baseClustersScaled} />
          {famous &&
            famous.map((f) => {
              const p = votes_to_pca(pca, f.votes);
              if (!p) return null;
              const size = f.size ?? 50;
              const x = pca_to_screnn_x(p.x) - size / 2;
              const y = pca_to_screen_y(p.y) - size / 2;
              return (
                <FamousPoint x={x} y={y} size={size} name={f.img} key={f.img} />
              );
            })}

          <g>
            {hulls
              ? hulls.map((hull) => {
                  if (!hull.hull) return null;
                  // console.log("hull.hull", hull.hull);
                  const gid = hull.group[0]!.gid;
                  const getTeamName = (gid: number | undefined) => {
                    // "政治資金厳正派" などの名前を返す
                    if (!naming) return "";
                    if (gid === undefined) return "";
                    return naming[gid]?.name ?? "";
                  };
                  const name = getTeamName(gid);

                  return (
                    <HullLabel
                      key={gid}
                      gid={gid}
                      selectedGroup={selectedGroup}
                      hull={hull.hull}
                      name={name}
                    />
                  );
                })
              : ""}
          </g>

          <text
            x={sideWithPadding - 10}
            y={svgHeightWithPadding - 10}
            fontFamily="Arial"
            fontSize="12"
            textAnchor="end"
            fill="gray"
          >
            {`JAPAN CHOICE 世論地図: 「${title}」についての可視化(${date}時点 N=${pca.n})`}
          </text>

          {me && (
            <You
              cx={pca_to_screnn_x(me.x)}
              cy={pca_to_screen_y(me.y)}
              size={25}
            />
          )}
        </g>
      </svg>
      {show_description && description}
    </div>
  );
};
