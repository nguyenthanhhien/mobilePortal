import React, { Component } from "react";
import routes from './../utils/routes'
import { RouteProps, RouteComponentProps } from "react-router";
import { ListItemIcon, ListItemText, Divider, IconButton, MenuList, MenuItem, Drawer, CssBaseline, AppBar, makeStyles, Theme, createStyles, useTheme, Toolbar, Typography, List, ListItem, Backdrop } from '@material-ui/core';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from 'next/router';
import Home from "../home";
import DealerManagement from "../dealerManagement/dealerManagement";
import clsx from 'clsx';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import i18next from "i18next";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
        },
        toolBar: {
            backgroundColor: '#001730'
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        backdropShift: {
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    }),
);
export default function Sidebar() {
    // constructor(props: any) {
    //     super(props);

    //     this.activeRoute = this.activeRoute.bind(this);
    // }

    // activeRoute(routeName: string) {
    //     const router = useRouter();
    //     let pathname = router.pathname;
    //     //const activePage = routes.find(r => r.path.indexOf(pathname) >= 0)
    //     return routeName === pathname ? true : false
    // }
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Router>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.toolBar}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {i18next.t('MENU.DEALER_CONFIGURATION')}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {routes.map((route, index) => {
                            return (
                                <ListItem key={index.toString()} button component={Link} to={route.path}>
                                    <ListItemIcon><route.icon /></ListItemIcon>
                                    <ListItemText primary={i18next.t(route.sidebarName)} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {routes.map((prop, key) => {
                        return (
                            <Route
                                key={key}
                                path={prop.path}
                                exact={prop.exact}
                                component={prop.component}
                            />
                        );
                    })}
                    {/* <Backdrop className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })} open={open}>

                    </Backdrop> */}
                </main>
            </Router>

        </div>
    );
}


 //export default Sidebar;