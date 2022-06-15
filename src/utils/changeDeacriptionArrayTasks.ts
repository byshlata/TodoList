import { ResponseEveryType, TaskType } from 'type';

const PENCIL_SYMBOL = `\u270E`;

export const changeDescriptionTask = (
  value: ResponseEveryType<{ item: TaskType }>,
): ResponseEveryType<{ item: TaskType }> => {
  if (value.data.item.description === null) {
    // eslint-disable-next-line no-param-reassign
    value.data.item.description = `${PENCIL_SYMBOL}................`;
  }
  return value;
};
