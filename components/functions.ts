export const arrayPosledni = (array: string[]) => {
  return array[array.length - 1] ?? '';
};

export const smazat = (array: string[]) => {
  const array_temp = [...array];

  if (arrayPosledni(array_temp).length > 1)
    return array_temp.map((e, i) =>
      i < array_temp.length - 1 ? e : e.slice(0, -1),
    );
  else return array_temp.filter((e, i) => i < array_temp.length - 1);
};
