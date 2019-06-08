import setAttribute from './setAttribute'

export default function diffAttribute(dom: HTMLElement, oldProps:{}, newProps:{}):void {
  Object.keys(oldProps).forEach(key => {
    if(newProps[key] && newProps[key] !== oldProps[key]) {
        dom.removeAttribute(key)
      setAttribute(dom, key, newProps[key])
    }
  })

  Object.keys(newProps).forEach(key => {
    if(!oldProps[key]) {
      setAttribute(dom, key, newProps[key])
    }
  })
}