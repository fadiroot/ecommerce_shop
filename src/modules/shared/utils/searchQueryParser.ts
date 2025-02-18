interface ColumnInfo {
  type: string;
  id: string;
}

export const searchQueryParser = (
  val: string,
  columnsInfo: ColumnInfo[]
): Record<string, any>[] => {
  const properties = columnsInfo.filter((el) => el.type === 'searchable').map((el) => el.id);
  const aa = properties.reduce((a, v) => ({ ...a, [v]: val }), {});
  return Object.entries(aa).map((e) => ({
    [e[0]]: { iLike: `%${e[1]}%` },
  }));
};
