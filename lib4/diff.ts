import render from './render'
import Component from '../lib/component'
import setAttribute from './setAttribute'
import { ClassComponent } from './types/component'
import { Vdom } from './types/vdom'
import { Dom } from './types/dom'


function isSameNodeType(dom: Dom, vdom:Vdom) {
  if(typeof vdom === 'string' || typeof vdom === 'number') {
    return dom.nodeType === 3
  }

  if(typeof vdom.type === 'string') {
    return dom.nodeName.toLowerCase() === vdom.type.toLowerCase()
  }

  return dom && dom._component && dom._component.constructor === vdom.type
}

function diffChildren(dom, vdom) {

}

function diffAttribute(dom, oldProps, newProps) {
  Object.keys(oldProps).forEach(key => {
    if(newProps[key] && newProps[key] !== oldProps[key]) {
      // if(key.startsWith('on')) {
      //   debugger;
      //   const event = key.slice(2).toLowerCase()
      //   dom.removeEventListener(event, oldProps[key])
      // } else {
        dom.removeAttribute(key)
      // }
      setAttribute(dom, key, newProps[key])
    }
  })

  Object.keys(newProps).forEach(key => {
    if(!oldProps[key]) {
      setAttribute(dom, key, newProps[key])
    }
  })
}

export default function diff(dom: Dom, vdom, parent: Dom = dom.parentNode) {
  if(!dom) {
    render(vdom, parent)
  } else if (!vdom) {
    dom.parentNode.removeChild(dom)
  } else if ((typeof vdom === 'string' || typeof vdom === 'number') && dom.nodeType === 3) {
    if(vdom !== dom.textContent) dom.textContent = vdom + ''
	} else if (vdom.nodeType === 'classComponent' || vdom.nodeType === 'functionalComponent') {
		const _component = dom._component
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
      diffAttribute(dom, dom._component.props, vdom.props)
      for(let i = 0; i < max; i++) {
        diff(dom.childNodes[i] || null, vdom.children[i] || null, dom)
      }
    }
	}
}
