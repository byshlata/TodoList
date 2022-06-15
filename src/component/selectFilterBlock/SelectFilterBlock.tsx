import React, { ReactElement } from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useSelector } from 'react-redux';

import { FilterStatus } from 'enum';
import { dictionarySelectFilterBlock } from 'language';
import { isLoadingElement, languageNow } from 'state';
import { FilterValuesType } from 'type';
import { changeDictionary } from 'utils';

type SelectFilterBlockType = {
  changeFilter: (filter: FilterValuesType) => void;
  todoListFilter: FilterValuesType;
};

export const SelectFilterBlock = ({
  changeFilter,
  todoListFilter,
}: SelectFilterBlockType): ReactElement => {
  const isDisable = useSelector(isLoadingElement);
  const languageValue = useSelector(languageNow);

  const language = changeDictionary(dictionarySelectFilterBlock, languageValue);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    changeFilter(event.target.value as FilterValuesType);
  };

  return (
    <FormControl>
      <InputLabel htmlFor="age-native-helper">{language.title}</InputLabel>
      <NativeSelect
        value={todoListFilter}
        onChange={handleChange}
        inputProps={{ name: language.title }}
        disabled={isDisable}
      >
        <option value={FilterStatus.all}>{language.all}</option>
        <option value={FilterStatus.active}>{language.active}</option>
        <option value={FilterStatus.completed}>{language.completed}</option>
      </NativeSelect>
      <FormHelperText>{language.filterHelpMessage}</FormHelperText>
    </FormControl>
  );
};
