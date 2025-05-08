import React from "react";

export const FamousPoint = ({
  x,
  y,
  size,
  name,
}: {
  x: number;
  y: number;
  size: number;
  name: string;
}) => {
  return (
    <image
      href={`/assets/images/polis/${name}`}
      x={x}
      y={y}
      width={size}
      height={size}
    />
  );
};
