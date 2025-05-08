import React from "react";
import { getTeamColor } from "./getTeamColor";

type HullBoundaryProps = {
  gid: number;
  selectedGroup: number | null;
  pathString: string;
};

export const HullBoundary = (props: HullBoundaryProps) => {
  const { gid, selectedGroup, pathString } = props;
  const teamColor = getTeamColor(gid);
  const fillOpacity = selectedGroup === gid ? 0.6 : 0.2;

  return (
    <g>
      <path
        data-testid={`hull-${props.gid}`}
        d={pathString + "Z"}
        fill={teamColor}
        fillOpacity={fillOpacity}
        stroke={teamColor}
        strokeWidth={1}
      />
    </g>
  );
};
