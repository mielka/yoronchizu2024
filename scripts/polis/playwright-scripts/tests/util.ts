export const get_columns = (data: string) => {
  // 行ごとに分割し、各行を配列に変換
  const rows = data
    .trim()
    .split("\n")
    .map((row) => row.split(/\s+/).map(Number));

  // 列ごとのリストを作成
  const columns: number[][] = rows[0]!.map((_, colIndex) =>
    rows.map((row) => row[colIndex]!)
  );
  return columns;
};

export const transpose = (rows: number[][]) => {
  return rows[0]!.map((_, colIndex) => rows.map((row) => row[colIndex]!));
};
