import React from 'react'
import Enzyme, { shallow } from 'enzyme'

import Search from './search'

const setup = props => {

  const wrapper = shallow(<Search {...props} />)

  return {
    props,
    wrapper
  }
}

describe('search overlay', () => {

  test('render', () => {

    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
