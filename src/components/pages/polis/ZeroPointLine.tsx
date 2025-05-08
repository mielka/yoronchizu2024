import {
  pca_to_screen_y,
  pca_to_screnn_x,
  scatterPadding,
  sideWithPadding,
  svgHeightWithoutPadding,
} from "./graphUtil";
import React from "react";

export const ZeroPointLine = () => {
  const pca_0_x = pca_to_screnn_x(0);
  const pca_0_y = pca_to_screen_y(0);
  return (
    <g>
      <line
        x1={scatterPadding}
        y1={pca_0_y}
        x2={sideWithPadding - scatterPadding * 2}
        y2={pca_0_y}
        stroke="black"
        opacity={0.5}
        strokeWidth="1"
      />
      <line
        x1={pca_0_x}
        y1={scatterPadding}
        x2={pca_0_x}
        y2={svgHeightWithoutPadding}
        stroke="black"
        opacity={0.5}
        strokeWidth="1"
      />
    </g>
  );
};
