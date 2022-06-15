import { PaginationStyle } from 'enum';
import { TaskType } from 'type/apiType';

export const elementPagination = (
  arrayElement: TaskType[],
  numberPage: number,
): TaskType[] => {
  const startElement =
    (numberPage - PaginationStyle.startIndex) * PaginationStyle.amountElement;
  let endElement = arrayElement.length;

  if (arrayElement.length - startElement > PaginationStyle.amountElement) {
    endElement = startElement + PaginationStyle.amountElement;
  }
  return arrayElement.slice(startElement, endElement);
};
