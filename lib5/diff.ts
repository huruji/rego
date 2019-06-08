import render from './render'
import diffAttribute from './diffAttribute'
import { Vdom, VdomInterface } from './types/vdom'
import { Dom } from './types/dom'
import diffKeyChildren from './diffKeyChildren'
import patch from './patch'
import { ClassComponent } from './types/component';


function isSameNodeType(dom: Dom, vdom:Vdom):boolean {
  if(typeof vdom === 'string' || typeof vdom === 'number') {
    return dom.nodeType === 3
  }

  if(typeof vdom.type === 'string') {
    return dom.nodeName.toLowerCase() === vdom.type.toLowerCase()
  }

  return dom && dom._component && dom._component.constructor === vdom.type
}

function isKeyChildren(oldChildren: Vdom, newChildren: Vdom):boolean {
  return !!(oldChildren && oldChildren[0] && oldChildren[0].props && oldChildren[0].props.key && newChildren && newChildren[0] && newChildren[0].props && newChildren[0].props.key)
}

export default function diff(dom: Dom, vdom, parent: Dom = dom.parentNode):void {
  if(!dom) {
    render(vdom, parent)
  } else if (!vdom) {
    dom.parentNode.removeChild(dom)
  } else if ((typeof vdom === 'string' || typeof vdom === 'number') && dom.nodeType === 3) {
    if(vdom !== dom.textContent) dom.textContent = vdom + ''
	} else if (vdom.nodeType === 'classComponent' || vdom.nodeType === 'functionalComponent') {
		const _component = dom._component as ClassComponent
		if (_component.constructor === vdom.type) {
      _component.props = vdom.props
      diff(dom, _component.render())
		} else {
      const newDom = render(vdom, dom.parentNode)
      dom.parentNode.replaceChild(newDom, dom)
    }
	} else if (vdom.nodeType === 'node') {
    if(!isSameNodeType(dom, vdom)) {
      const newDom = render(vdom, parent)
      dom.parentNode.replaceChild(newDom, dom)
    } else {
      const max = Math.max(dom.childNodes.length, vdom.children.length)
      diffAttribute(dom as HTMLElement, dom._component.props, vdom.props)
      const _component = dom._component as VdomInterface

      const isKeyed = isKeyChildren(_component.children, vdom.children)
      if(!isKeyed) {
        for(let i = 0; i < max; i++) {
          diff(dom.childNodes[i] || null, vdom.children[i] || null, dom)
        }
      } else {
        const patchesList = diffKeyChildren(_component.children, vdom.children)
        patch(patchesList, dom)
      }
    }
	}
}








