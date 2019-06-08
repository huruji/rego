import { Vdom } from './types/vdom'

import setAttribute from './setAttribute'
import { ClassComponent, FunctionComponent } from './types/component';

export default function render(vdom:Vdom, parent: HTMLElement) {

  if(typeof vdom === 'string') {
    const node = document.createTextNode(vdom)
    return parent.appendChild(node)
  }

  switch(vdom.nodeType) {
    case 'node':
      const node = document.createElement(vdom.type as string)
      vdom.children.forEach((child:Vdom) => render(child, node))
      for(const prop in vdom.props) {
        setAttribute(node, prop, vdom.props[prop])
      }
      return parent.appendChild(node)
      break;
    case 'classComponent':
      const classProps = Object.assign({}, vdom.props, {
        children: vdom.children
      })
      const classVnode = vdom.type as {new(props:any): ClassComponent}
      const instance = new (classVnode)(classProps)
      const classChildVdom = instance.render()
      const base = render(classChildVdom, parent)
      instance.base = base
      base._component = instance
      debugger;
      return instance.base
      break
    case 'functionalComponent':
      const props = Object.assign({}, vdom.props, {
        children: vdom.children
      })
      const vnode = vdom.type as FunctionComponent
      const childVdom = vnode(props)
      return render(childVdom, parent)
      break
    default:
  }

}