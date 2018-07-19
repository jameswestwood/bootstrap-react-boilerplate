import * as React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

import anime from 'animejs'

import './nav.scss'

interface Iprops {
  paths:{},
  specifier?:string,
  match:any,
  location:any,
  history:any
}

class Nav extends React.Component<Iprops, any>
{
  render(){
    const { match, location, history } = this.props

    return (
      <nav className={"nav" + (this.props.specifier !== undefined ? ' ' + this.props.specifier + '__nav' : '')}>
        {(() => {

          let anchors:Array<JSX.Element> = []

          for (let key in this.props.paths)
          {
            if (this.props.paths.hasOwnProperty(key))
            {
              let navEl:JSX.Element

              // if the current route

              navEl = <NavLink className={"nav__link" + (location != null && location.pathname === this.props.paths[key].path ? ' nav__link--active' : '')}
                            to={this.props.paths[key].path}
                            style={{ pointerEvents: location != null && location.pathname === this.props.paths[key].path ? 'none' : null }}
                            key={("nav-" + key)}>{key}</NavLink>

              anchors.push(navEl)
            }
          }

          anchors.push(<Button color="primary">Search</Button>)

          return anchors

        })()}
      </nav>
    )
  }
}

export default withRouter(Nav)
