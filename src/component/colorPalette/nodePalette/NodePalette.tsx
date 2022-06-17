import React, { ReactElement } from 'react';

import { BackgroundColorType } from 'type';
import { defineClassNode } from 'utils';

type NodePaletteType = {
  animations: string;
  node: string;
  stem: string;
  colorNode: string;
  changeColor: (value: BackgroundColorType) => void;
};

export const NodePalette = ({
  colorNode,
  node,
  animations,
  stem,
  changeColor,
}: NodePaletteType): ReactElement => {
  const onClickHandle = (): void => {
    const backgroundColor = defineClassNode(colorNode);
    changeColor(backgroundColor);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={animations}
      onClick={onClickHandle}
      onKeyPress={onClickHandle}
    >
      <div className={node}>
        <div className={colorNode} />
      </div>
      <div className={stem} />
    </div>
  );
};
