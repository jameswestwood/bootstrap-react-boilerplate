/* @flow */

import * as React from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import anime from 'animejs'

import Utilities from '../classes/utilities'

import Header from './header/header'
import Nav from './nav/nav'
import Welcome from './welcome/welcome'
import About from './about/about'
import Footer from './footer/footer'

import  './app.scss'

interface Iprops {
  breakpoint:number
}

interface Istate {
  flat:boolean
}

class App extends React.Component<Iprops & RouteProps, Istate>
{
  private currentSection:HTMLElement | null = null
  private transitionDuration:number = 300
  private paths = {
    "welcome": {
      path: "/",
      component: <Welcome />
    },
    "about" : {
      path: "/about",
      component: <About />
    }
  }

  constructor(props)
  {
    super(props)

    this.state = {
      flat: true
    }
  }

  componentDidMount(){

    // initial layout
    this.manageLayout(Utilities.getWidth(document))

    // update layout on resize if required
    window.addEventListener('resize', () => {

      this.manageLayout(Utilities.getWidth(document))
    })
  }

  manageLayout(currentSize:number)
  {
    if(this.state.flat === false
      && currentSize <= this.props.breakpoint){

      this.setState({
        flat: true
      })
    }
    else if(this.state.flat === true
            && currentSize > this.props.breakpoint){

      this.setState({
        flat: false
      })
    }
  }

  async transitionSections(nextSection:HTMLElement){

    // initially hide new section while old transitions out
    anime({
      targets: nextSection,
      opacity: 0,
      scale:1.1,
      duration:0,
    })

    if(this.currentSection != null
      && nextSection != null)
    {
      //  take next section out of page flow temporarily while current section is transitioned out
      nextSection.style.display = "none"

      // transition out current section
      const exitComplete = anime({
                              targets: this.currentSection,
                              opacity: 0,
                              scale: 0.9,
                              easing: 'easeInQuad',
                              duration: this.transitionDuration
                            });

      await exitComplete.finished

      // remove transitioned section from page flow, otherwise the scroll bar will jump as both sections are briefly present
      this.currentSection.style.display = "none"
      nextSection.style.removeProperty('display')
    }

    // transition in next section
    anime({
      targets: nextSection,
      opacity: 1,
      scale: 1,
      duration: this.transitionDuration,
      easing: 'easeOutQuad',
      delay:100
    })

    this.currentSection = nextSection
  }

  render(){
    return (
      <div className={"ui" + (!this.state.flat ? ' ui--layered' : '')}>

        <Header specifier="ui" paths={this.paths} />
        <main className="ui__content">
        {(() => {
          switch(this.state.flat)
          {
          case false : // render single page app for higher resolutions

          return <Route render={({ location }) => (
                  <TransitionGroup component="div"
                                   className="ui__container"
                                   appear={true}>
                    <CSSTransition key={location.pathname}
                                    transitionAppear={true}
                                    classNames="ui__section-"
                                    onEnter={(el:HTMLElement) => {this.transitionSections(el);}}
                                    timeout={this.transitionDuration}>
                      <Switch location={location}>
                        {(() => {

                          const keys:Array<string> = Object.keys(this.paths);
                          let routes:Array<JSX.Element> = []

                          for(let i:number = 0; i < keys.length; i++)
                          {
                            routes.push(<Route exact={true}
                                               path={this.paths[keys[i]].path}
                                               render={() => <section className="ui__section" id={location.pathname}>{this.paths[keys[i]].component}</section>}
                                               key={'route-' + (keys[i])} />)
                          }

                          return routes

                        })()}
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}/>

            case true :  // render flattened app for lower resolutions

            const keys:Array<string> = Object.keys(this.paths)
            let sections:Array<JSX.Element> = []

            for(let i:number = 0; i < keys.length; i++)
            {
              let section:JSX.Element = this.paths[keys[i]].component

              sections.push(<section id={keys[i]}
                                 className="ui__section"
                                 key={"section-" + (keys[i])}>{section}</section>)
            }

            return sections;
          }
        })()}
        </main>
        <Footer specifier="ui__footer" />
      </div>
    );
  }
}

export default App
