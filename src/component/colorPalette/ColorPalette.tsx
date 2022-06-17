import React, { ReactElement, useState } from 'react';

import { Tooltip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import PaletteIcon from '@material-ui/icons/Palette';
import { useSelector } from 'react-redux';

import s from './ColorPalette.module.sass';
import { NodePalette } from './nodePalette/NodePalette';

import { useAppDispatch } from 'hooks';
import { dictionaryColorPalette } from 'language';
import { changeBackgroundColor, languageNow } from 'state';
import { BackgroundColorType } from 'type';
import { changeDictionary, defineClassNode } from 'utils';

const COLORS_VALUE = [
  `${s.main}`,
  `${s.primary}`,
  `${s.secondary}`,
  `${s.additional}`,
  `${s.best}`,
];

type ColorPaletteType = {
  idTodoList: string;
};

export const ColorPalette = ({ idTodoList }: ColorPaletteType): ReactElement => {
  const dispatch = useAppDispatch();

  const languageValue = useSelector(languageNow);

  const language = changeDictionary(dictionaryColorPalette, languageValue);

  const [isOpenPalette, setIsOpenPallet] = useState<boolean>(false);

  let classNoAnimation = `${s.branch} ${s.noAnimation}`;
  const classMainButton = `${s.mainButton} ${s.share}`;

  const onOpenPaletteHandel = (): void => {
    setIsOpenPallet(!isOpenPalette);
  };

  const onChangeColor = (): void => {
    setIsOpenPallet(false);
  };

  const changeColor = (color: BackgroundColorType): void => {
    const backgroundColor = defineClassNode(color);
    dispatch(changeBackgroundColor({ idTodoList, backgroundColor }));
  };

  if (isOpenPalette) {
    classNoAnimation = `${s.branch} ${s.open}`;
  }

  return (
    <div className={s.container}>
      {COLORS_VALUE.map(colorNode => (
        <NodePalette
          key={`${colorNode}`}
          stem={s.stem}
          colorNode={colorNode}
          animations={classNoAnimation}
          node={s.node}
          changeColor={changeColor}
        />
      ))}

      {isOpenPalette ? (
        <CancelIcon
          onClick={onOpenPaletteHandel}
          onBlur={onChangeColor}
          className={classMainButton}
          fontSize="large"
          color="primary"
        />
      ) : (
        <Tooltip title={language.titleHelp} placement="left">
          <PaletteIcon
            onClick={onOpenPaletteHandel}
            onBlur={onChangeColor}
            className={classMainButton}
            fontSize="large"
            color="primary"
          />
        </Tooltip>
      )}
    </div>
  );
};
