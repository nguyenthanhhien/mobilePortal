import React, { Component } from 'react';
import './home.scss'
import * as Constant from './../../services/constant'

import i18next from "i18next";

export default class Home extends Component {

  render() {
    return (
      <div className="page-home">
        {Constant.baseUrl}
        <h1>{i18next.t('name')}</h1>
      </div>
    )
  }
}