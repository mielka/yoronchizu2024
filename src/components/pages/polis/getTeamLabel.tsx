export const getTeamLabel = (gid: number | undefined) => {
  if (gid === undefined) return "Team Gray";
  // チームIDに基づくラベルを定義
  const labels = [
    "Team Red",
    "Team Blue",
    "Team Yellow",
    "Team Green",
    "Team Purple",
  ];
  return labels[gid % labels.length] || "Team Gray";
};
