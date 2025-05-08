import React from "react";
import { getTeamColor } from "./getTeamColor";
import { getTeamLabel } from "./getTeamLabel";
import { getRectangularCenter } from "./Scatter";

type HullLabelProps = {
  hull: [number, number][];
  gid: number;
  selectedGroup: number | null;
  name: string;
};
export const HullLabel = (props: HullLabelProps) => {
  const { hull, gid, selectedGroup, name } = props;
  if (selectedGroup !== null && selectedGroup !== gid) return null;
  const teamLabel = getTeamLabel(gid);
  // テキストの横幅と高さを仮定して、背景用のrectのサイズを設定
  const textPadding = 8;
  const textWidth = teamLabel.length * 12; // 仮の文字幅（フォントサイズに依存）
  const textHeight = 28; // 仮の高さ（フォントサイズに依存）

  const center = getRectangularCenter(hull); // グループの中心座標を取得
  const textY = center[1] - textHeight - 2; // テキストのY座標を計算

  const teamColor = getTeamColor(gid);

  return (
    <>
      {/* テキストの背景用の矩形 */}
      <rect
        x={center[0] - textWidth / 2 - textPadding} // テキストの中央を基準に配置
        y={textY - textHeight / 2 - textPadding}
        width={textWidth + textPadding * 2}
        height={textHeight + textPadding * 2}
        fill={teamColor} // 背景色はチームの色
        opacity={0.7} // 透明度
        rx={5} // 角を丸める場合
        ry={5} // 角を丸める場合
      />
      {/* テキスト自体 */}
      <text
        x={center[0]} // 中央座標のX位置
        y={textY}
        fill="white" // テキストの色
        fontSize="20" // フォントサイズ
        textAnchor="middle" // テキストの中央を基準に配置
        alignmentBaseline="middle" // テキストをY軸で中央に揃える
      >
        {teamLabel}
      </text>
      <text
        x={center[0]} // 中央座標のX位置
        y={textY + textHeight + textPadding}
        fill="black" // テキストの色
        fontSize="20" // フォントサイズ
        textAnchor="middle" // テキストの中央を基準に配置
        fontWeight="bold" // フォントの太さ
        alignmentBaseline="middle" // テキストをY軸で中央に揃える
      >
        {name}
      </text>
    </>
  );
};
