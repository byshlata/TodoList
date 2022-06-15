import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((themeMU: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      position: 'relative',
    },
    menuButton: {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      marginRight: themeMU.spacing(2),
    },
    title: {
      display: 'none',
      [themeMU.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: themeMU.shape.borderRadius,
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      backgroundColor: alpha(themeMU.palette.common.white, 0.15),
      '&:hover': {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        backgroundColor: alpha(themeMU.palette.common.white, 0.25),
      },
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      marginRight: themeMU.spacing(2),
      marginLeft: 0,
      width: '100%',
      [themeMU.breakpoints.up('sm')]: {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        marginLeft: themeMU.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      padding: themeMU.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      padding: themeMU.spacing(1, 1, 1, 0),
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      paddingLeft: `calc(1em + ${themeMU.spacing(4)}px)`,
      transition: themeMU.transitions.create('width'),
      width: '100%',
      [themeMU.breakpoints.up('sm')]: {
        width: '2ch',
        '&:focus': {
          width: '15ch',
        },
      },
    },
    sectionDesktop: {
      display: 'none',
      [themeMU.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [themeMU.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);
