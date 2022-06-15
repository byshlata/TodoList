import { LanguageType } from 'type/appType';

// eslint-disable-next-line consistent-return,@typescript-eslint/explicit-function-return-type
export function changeDictionary(dictionary: {}, languageValue: LanguageType) {
  // eslint-disable-next-line no-prototype-builtins
  if (dictionary.hasOwnProperty(languageValue)) {
    // @ts-ignore
    return dictionary[languageValue];
  }
}
