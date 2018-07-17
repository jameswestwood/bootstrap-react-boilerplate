import * as React from 'react'

import { Button } from 'reactstrap'

class Welcome extends React.Component<any, any>
{
  render(){
    return (
      <div>
        <h2>Welcome</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex <a href="#">ea commodo consequat</a>.</p>

        <Button color="primary">Danger!</Button>
      </div>
    );
  }
}

export default Welcome
