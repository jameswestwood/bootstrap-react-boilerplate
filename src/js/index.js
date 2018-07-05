/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import bootstrapStyles from '../css/libs/bootstrap/bootstrap.scss';

import styles from '../css/base.scss';
import critical from '../css/critical.crit.scss';

import App from './components/app.jsx';

window.onload = function () {

  let appContainer:?Element = document.getElementById('app');

  if(appContainer != null)
  {
    render(
        <HashRouter>
          <App breakpoint={600} />
        </HashRouter>,
        appContainer
      );
    }
    else
    {
      throw new Error("No app container was defined.");
    }
};
