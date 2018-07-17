import React from 'react'
import { storiesOf } from '@storybook/react'

import '../src/css/bootstrap.custom.scss'

import { Button } from 'reactstrap'

storiesOf('Button', module)
  .add('primary', () => (
    <Button color="primary">Primary</Button>
  ))
  .add('secondary', () => (
    <Button color="secondary">Secondary</Button>
  ));
