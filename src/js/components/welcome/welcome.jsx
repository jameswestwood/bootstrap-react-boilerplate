/* @flow */

import * as React from 'react';
import { render } from 'react-dom';

import { Button } from 'reactstrap';

type Props = {}

class Welcome extends React.Component<Props>
{
  render(){
    return (
      <div className="content">
        <h2>Welcome</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex <a href="#">ea commodo consequat</a>.</p>

        <Button color="primary">Danger!</Button>
      </div>
    );
  }
}

export default Welcome;
