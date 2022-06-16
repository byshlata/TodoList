import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness5 from '@material-ui/icons/Brightness5';
import LanguageIcon from '@material-ui/icons/Language';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined';
import SearchIcon from '@material-ui/icons/Search';
import TouchAppTwoToneIcon from '@material-ui/icons/TouchAppTwoTone';
import { useSelector } from 'react-redux';

import { SwitchLabels } from '../switchLabels/SwitchLabels';

import s from './PrimarySearchAppBar.module.sass';

import { useStyles } from 'component/PrimarySearchAppBar/useStyles/useStyles';
import { SelectedLanguage } from 'enum';
import { useAppDispatch } from 'hooks';
import { dictionaryPrimarySearchAppBar } from 'language';
import {
  isDragDrop,
  languageNow,
  theme,
  changeDragDrop,
  changeLanguage,
  changeTheme,
} from 'state';
import { changeDictionary } from 'utils';

const ANCHOR_ORIGIN_LEFT = { vertical: 'top', horizontal: 'left' } as const;
const ANCHOR_ORIGIN_RIGHT = { vertical: 'top', horizontal: 'right' } as const;

export const PrimarySearchAppBar = (): React.ReactElement => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const themeValue = useSelector(theme);
  const isDragDropValue = useSelector(isDragDrop);
  const languageValue = useSelector(languageNow);

  const language = changeDictionary(dictionaryPrimarySearchAppBar, languageValue);

  const themeLightIcon = <Brightness5 color="inherit" />;
  const themeDarkIcon = <Brightness4 color="inherit" />;
  const dragDropIconTruth = <TouchAppTwoToneIcon color="inherit" />;
  const dragDropIconFalsy = <PanToolOutlinedIcon color="inherit" />;

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const menuId = 'primary-search-account-menu';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMenuChangeEN = (): void => {
    dispatch(changeLanguage(SelectedLanguage.en));
  };

  const handleMenuChangeBY = (): void => {
    dispatch(changeLanguage(SelectedLanguage.by));
  };

  const handleMenuChangeRU = (): void => {
    dispatch(changeLanguage(SelectedLanguage.ru));
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={ANCHOR_ORIGIN_RIGHT}
      id={menuId}
      keepMounted
      transformOrigin={ANCHOR_ORIGIN_RIGHT}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <h4 className={s.menuWrapper}>{language.title}</h4>
      <MenuItem onClick={handleMenuChangeEN}>{language.languageEN}</MenuItem>
      <MenuItem onClick={handleMenuChangeRU}>{language.languageRU}</MenuItem>
      <MenuItem onClick={handleMenuChangeBY}>{language.languageBY}</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={ANCHOR_ORIGIN_LEFT}
      id={mobileMenuId}
      keepMounted
      transformOrigin={ANCHOR_ORIGIN_LEFT}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{language.messages}</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{language.profile}</p>
      </MenuItem>

      <MenuItem>
        {SwitchLabels(
          dispatch,
          changeTheme,
          themeValue,
          'themeLight',
          'themeDark',
          themeLightIcon,
          themeDarkIcon,
        )}
      </MenuItem>
      <MenuItem>
        {SwitchLabels(
          dispatch,
          changeDragDrop,
          isDragDropValue,
          true,
          false,
          dragDropIconTruth,
          dragDropIconFalsy,
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleProfileMenuOpen}
          >
            <LanguageIcon />
          </IconButton>

          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            {SwitchLabels(
              dispatch,
              changeTheme,
              themeValue,
              'themeLight',
              'themeDark',
              themeLightIcon,
              themeDarkIcon,
            )}
            {SwitchLabels(
              dispatch,
              changeDragDrop,
              isDragDropValue,
              true,
              false,
              dragDropIconTruth,
              dragDropIconFalsy,
            )}

            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
