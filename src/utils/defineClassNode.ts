import { backgroundColorType } from 'type/todoListType';

const FIRST_POSITION = 1;
const ITERATION = 1;
const ELEMENT_MISSING = -1;

const VALUE_COLORS: backgroundColorType[] = [
  'main',
  'primary',
  'secondary',
  'additional',
  'best',
];

export function defineClassNode(nameClass: string): backgroundColorType {
  for (let i = 0; i < VALUE_COLORS.length; i += ITERATION) {
    if (nameClass.indexOf(VALUE_COLORS[i]) !== ELEMENT_MISSING) {
      return VALUE_COLORS[i];
    }
  }
  return VALUE_COLORS[FIRST_POSITION];
}
