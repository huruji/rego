import { VdomType } from './createElement'
import render from './render'

export interface ClassComponentType {
  props?: Record<string, any>
  render():VdomType
}

export type ComponentType = ClassComponentType | Function

export default class Component {
  public props

  constructor(props) {
    this.props = props || {}
  }

  static render(vdom, parent) {
    const props = Object.assign({}, vdom.props, {
      children: vdom.children
    })
    const instance = new (vdom.type)(props)
    const childVdom = instance.render()
    render(childVdom, parent)
  }
}