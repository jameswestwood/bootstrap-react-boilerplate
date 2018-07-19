import React from 'react'
import { Link } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme'

import Header from './header'

const setup = props => {

  const wrapper = shallow(<Header {...props} />)

  return {
    props,
    wrapper
  }
}

describe('header', () => {

  test('render', () => {

    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
