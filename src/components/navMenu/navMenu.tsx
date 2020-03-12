import React, { Component } from "react";
import menuItems from '../utils/menuItems'
import { ListItemIcon, ListItemText, List, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import i18next from "i18next";
import './navMenu.scss'
export default function NavMenu() {
    return (
        <List>
            {menuItems.map((route, index) => {
                return (
                    <ListItem key={index.toString()} button component={NavLink} exact activeClassName="active" to={route.path}>
                        <ListItemIcon><route.icon /></ListItemIcon>
                        <ListItemText primary={i18next.t(route.name)} />
                    </ListItem>
                );
            })}
        </List>
    );
}