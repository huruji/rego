import render from './render'
import Component from '../lib/component';


function isSameNodeType(dom, vdom) {
  if(typeof vdom === 'string' || typeof vdom === 'number') {
    return dom.nodeType === 3
  }

  if(typeof vdom.type === 'string') {
    return dom.nodeName.toLowerCase() === vdom.tag.toLowerCase()
  }

  return dom && dom._component && dom._component.constructor === vdom.type
}

function diffChildren(dom, vdom) {

}

export default function diff(dom: HTMLElement | ChildNode, vdom, parent?) {
  debugger;
  if(!dom) {
    render(vdom, parent)
  } else if (!vdom) {
    dom.parentNode.removeChild(dom)
  } else if (typeof vdom === 'string' && dom.nodeType === 3) {
    if(vdom !== dom.textContent) dom.textContent = vdom
	} else if (vdom.nodeType === 'classComponent' || vdom.nodeType === 'functionalComponent') {
		const _component = dom._component
		if (_component.constructor === vdom.type) {
      _component.props = vdom.props
      diff(dom, _component.render())
		}
	} else if (vdom.nodeType === 'node') {
    if(!dom && !isSameNodeType(dom, vdom)) {
    } else {
      const max = Math.max(dom.childNodes.length, vdom.children.length)
      for(let i = 0; i < max; i++) {
        diff(dom.childNodes[i] || null, vdom.children[i] || null, dom)
      }
    }
	}
}
