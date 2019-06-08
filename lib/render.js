import Component from './component'

const setAttribute = (dom, key, value) => {
  if (typeof value === 'function' && key.startWith('on')) {
  } else if (key === 'checked' || key === 'value' || key === "className") {
    dom[key] = value
  } else if (key === 'style' && typeof value === 'object') {
    Object.assign(dom.style, value)
  } else if (key === 'ref' && typeof value === 'function') {
    value(dom)
  } else if (key === 'key') {
    dom.__gooactKey = value
  } else if (typeof value != 'object' && typeof value !== 'function') {
    dom.setAttribute(key, value)
  }
}


const render = (vdom, parent = null) => {
  const mount = parent ? (el => parent.appendChild(el)) : (el => el)

  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return mount(document.createTextNode(vdom))
  } else if (typeof vdom === 'boolean' || vdom === null) {
    return mount(document.createTextNode(''))
  } else if (typeof vdom === 'object' && typeof vdom.type === 'function') {
    return Component.render(vdom, parent)
  } else if (typeof vdom === 'object' && typeof vdom.type === 'string') {
    debugger;
    const dom = mount(document.createElement(vdom.type))
    for (const child of [].concat(...vdom.children)) {
      render(child, dom)
    }
    for (const prop in vdom.props) {
      setAttribute(dom, prop, vdom.props[prop])
    }
    return dom
  } else {
    throw new Error('Invalid VDOM: ${vdom}')
  }
}

export default render

export {
  setAttribute
}