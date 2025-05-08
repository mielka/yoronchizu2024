import React from "react";

export const You = ({
  cx,
  cy,
  size,
}: {
  cx: number;
  cy: number;
  size: number;
}) => {
  const eyeOffsetX = size * 0.3;
  const eyeOffsetY = size * 0.3;
  const eyeRadius = size * 0.1;
  const mouthOffsetY = size * 0.3;
  const mouthWidth = size * 0.6;
  return (
    <>
      {/* 顔の円 */}
      <circle
        r={size}
        fill={"yellow"}
        opacity={1}
        cx={cx}
        cy={cy}
        stroke="black"
        strokeWidth={1}
      />

      {/* 左目 */}
      <circle
        r={eyeRadius}
        fill={"black"}
        cx={cx - eyeOffsetX}
        cy={cy - eyeOffsetY}
      />

      {/* 右目 */}
      <circle
        r={eyeRadius}
        fill={"black"}
        cx={cx + eyeOffsetX}
        cy={cy - eyeOffsetY}
      />

      {/* 笑顔 */}
      <path
        d={`M ${cx - mouthWidth / 2} ${cy + mouthOffsetY} Q ${cx} ${cy + mouthOffsetY + eyeRadius} ${cx + mouthWidth / 2} ${cy + mouthOffsetY}`}
        stroke="black"
        strokeWidth={size * 0.1}
        fill="none"
      />
    </>
  );
};
