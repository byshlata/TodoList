import React, { ReactElement } from 'react';

import s from './DarkThemeBackground.module.sass';

export const DarkThemeBackground = (): ReactElement => (
  <div className={s.optionBg}>
    <div className={s.firefly} />
    <div className={s.firefly} />
    <div className={s.firefly} />
    <div className={s.firefly} />
    <div className={s.firefly} />
    <div className={s.firefly} />
  </div>
);
