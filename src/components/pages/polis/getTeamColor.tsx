export const getTeamColor = (gid: number | undefined) => {
  switch (gid) {
    case 0:
      return "red";
    case 1:
      return "blue";
    case 2:
      return "orange";
    case 3:
      return "green";
    case 4:
      return "purple";
    default:
      return "gray";
  }
};
