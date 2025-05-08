import React from "react";
import { getTeamColor } from "./getTeamColor";
import { ScatterPoint } from "./types";

interface BucketProps {
  pt: ScatterPoint;
}

interface GraphParticipantsProps {
  points: ScatterPoint[];
}

const Bucket = ({ pt }: BucketProps) => {
  const color = getTeamColor(pt.gid);
  return (
    <circle r={3} fill={color} opacity={0.5} key={pt.bid} cx={pt.x} cy={pt.y} />
  );
};

const GraphParticipants = ({ points }: GraphParticipantsProps) => {
  if (!points) return null;
  return (
    <g id="vis2_participants">
      {points.map((pt) => (
        <Bucket key={pt.bid} pt={pt} />
      ))}
    </g>
  );
};

export default GraphParticipants;
