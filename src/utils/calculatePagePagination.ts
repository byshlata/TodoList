export const calculatePagePagination = (
  allElement: number,
  numberOnPage: number,
): number => Math.ceil(allElement / numberOnPage);
