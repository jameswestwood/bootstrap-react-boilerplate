import React from 'react'
import Enzyme, { shallow } from 'enzyme'

import Overlay from './overlay'

const setup = props => {

  const wrapper = shallow(<Overlay {...props} />)

  return {
    props,
    wrapper
  }
}

describe('overlay', () => {

  test('render', () => {

    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
