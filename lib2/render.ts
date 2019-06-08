import { VdomType, FunctionComponent } from './createElement'
import setAttribute from './setAttribute'
import Component, { ComponentType, ClassComponentType }  from './component'

export default function render(vdom:VdomType, parent: HTMLElement) {
  if(typeof vdom === 'string') {
    const node = document.createTextNode(vdom)
    parent.appendChild(node)
  } else if(typeof vdom === 'object' && typeof vdom.type === 'string') {
    const node = document.createElement(vdom.type)
    vdom.children.forEach((child:VdomType) => render(child, node))
    for(const prop in vdom.props) {
      setAttribute(node, prop, vdom.props[prop])
    }
    parent.appendChild(node)
  } else if (typeof vdom === 'object' && typeof vdom.type === 'function') {
    const props = Object.assign({}, vdom.props, {
      children: vdom.children
    })

    let childVdom = null

    if(Component.isPrototypeOf(vdom.type)) {
      const vnode = vdom.type as {new(props:any): ClassComponentType}
      const instance = new (vnode)(props)
      childVdom = instance.render()

    } else {
      const vnode = vdom.type as FunctionComponent
      childVdom = vnode(props)
    }
    render(childVdom, parent)
  }
}