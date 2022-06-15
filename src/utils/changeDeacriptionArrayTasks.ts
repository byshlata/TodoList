import { GetTasksResponseType } from 'type';

const PENCIL_SYMBOL = `\u270E................`;

export const changeDescriptionArrayTask = (
  arrayElement: GetTasksResponseType,
): GetTasksResponseType => {
  arrayElement.items.forEach((task): void => {
    // eslint-disable-next-line no-unused-expressions,no-param-reassign
    task.description === null ? (task.description = `${PENCIL_SYMBOL}`) : null;
  });
  return arrayElement;
};
