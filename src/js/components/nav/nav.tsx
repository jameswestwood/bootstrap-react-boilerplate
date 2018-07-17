import * as React from 'react'

import { withRouter, NavLink } from 'react-router-dom'
import anime from 'animejs'

import './nav.scss'

type Props = {
  paths:{},
  specifier?:string,
  match:any,
  location:any,
  history:any
}

type State = {};

class Nav extends React.Component<Props, State>
{
  render(){
    const { match, location, history } = this.props

    return (
      <nav className={"nav" + (this.props.specifier !== undefined ? ' ' + this.props.specifier + '__nav' : '')}>
        {(() => {

          let anchors:Array<JSX.Element> = [];
          for (let key in this.props.paths)
          {
            if (this.props.paths.hasOwnProperty(key))
            {
              let navEl:JSX.Element;

              // if the current route

              navEl = <NavLink className={"nav__link" + (location != null && location.pathname === this.props.paths[key].path ? ' nav__link--active' : '')}
                            to={this.props.paths[key].path}
                            style={{ pointerEvents: location != null && location.pathname === this.props.paths[key].path ? 'none' : null }}
                            key={("nav-" + key)}>{key}</NavLink>;

              anchors.push(navEl);
            }
          }

          return anchors;
        })()}
      </nav>
    );
  };
}

export default withRouter(Nav);
