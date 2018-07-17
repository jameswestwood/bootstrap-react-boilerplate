import React from "react"
import * as ReactDOM from "react-dom"
import { HashRouter } from 'react-router-dom'

import '../css/bootstrap.custom.scss'
import '../css/base.scss'

import App from './components/app'

window.onload = function () {

  let appContainer = document.getElementById('app')

  ReactDOM.render(
    <HashRouter>
      <App breakpoint={600} />
    </HashRouter>,
    appContainer)
}
