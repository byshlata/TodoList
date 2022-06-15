import React, { ReactElement } from 'react';

import s from './LightThemeBackground.module.sass';

export const LightThemeBackground = (): ReactElement => (
  <div className={s.bgAnimation}>
    <div className={s.bgOneLight} />
    <div className={s.bgTwoLight} />
    <div className={s.bgThreeLight} />
  </div>
);
