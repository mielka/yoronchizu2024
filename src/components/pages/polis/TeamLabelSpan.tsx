import { getTeamColor } from "./getTeamColor";
import { getTeamLabel } from "./getTeamLabel";

export const TeamLabelSpanFixedWidth = ({ i }: { i: number }) => {
  return (
    <span
      style={{
        width: "10em",
        backgroundColor: getTeamColor(i) ?? "gray",
        // padding: "0.5em",
        margin: "0.5em",
        borderRadius: "0.5em",
        color: "white",
        textAlign: "center",
      }}
    >
      {getTeamLabel(i)}
    </span>
  );
};

export const TeamLabelSpan = ({ i }: { i: number }) => {
  return (
    <span
      style={{
        backgroundColor: getTeamColor(i) ?? "gray",
        padding: "0 0.5em",
        borderRadius: "0.5em",
        color: "white",
        textAlign: "center",
      }}
    >
      {getTeamLabel(i)}
    </span>
  );
};
