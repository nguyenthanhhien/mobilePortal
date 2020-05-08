import React from 'react';
import './layout.scss'
import i18next from "i18next";
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
  IconButton, Drawer, CssBaseline, AppBar, 
  makeStyles, Theme, useTheme, Toolbar,
  Tooltip
} from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import menuItems from '../../utils/menuItems'
import NavMenu from './../../navMenu/navMenu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { authService } from './../../../services/services'
const drawerWidth = 240;
const smallDrawerWidth = 64;

const useStyles = makeStyles((theme: Theme) =>
  ({
    root: {
      display: 'flex',
    },
    appBar: {
      marginLeft: smallDrawerWidth,
      width: `calc(100% - ${smallDrawerWidth}px)`,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: `${smallDrawerWidth}px !important`
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: smallDrawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
    rightItem: {
      marginLeft: 'auto'
    }
  }),
);
export default function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);


  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const logout = () => {
    authService.logout()
  };

  return (
    <div className="page-layout">
        <Router basename={process.env.REACT_APP_BASENAME}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className="toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className="classes.menuButton"
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.rightItem}>
              <Tooltip title={i18next.t('LOGIN.LOGOUT')}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={logout}
                  color="inherit"
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <section className={"user-info " + (!open ? "sm-user-info" : "")} >
            {
              open ?
                <img className="logo-img" src={require('./../../../assets/imgs/logo.png')} /> :
                <img className="logo-img" src={require('./../../../assets/imgs/sm_logo.png')} />
            }

            <p className="username">{authService.getUserName()}</p>
            <p className="serverName">{authService.getServerName()}</p>
            <img src={require('./../../../assets/imgs/avatar.png')} alt=""
              className="rounded-circle-img">
            </img>
          </section>
          <section className="nav-menus">
            <NavMenu />
          </section>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.toolbar} />
          {menuItems.map((prop, key) => {
            return (
              <Route
                key={key}
                path={prop.path}
                exact={prop.exact}
                component={prop.component}
              />
            );
          })}
        </main>
      </Router>
      
    </div>
  )
}