class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  each(callback){
    this.elements.forEach(el => callback(el));
  }

  html(str) {
    if (str) this.each(el => el.innerHTML = str);
    else return this.elements[0].innerHTML;
  }

  empty() {
    this.html('');
  }

  append(args) {
    if (!(args instanceof Array)) {
      this.each(element => element.innerHTML += args);
    } else {
      args.forEach(arg => {
        this.each(element => element.innerHTML += arg.outerHTML);
      });
    }
  }

  attr(attrName, attrValue) {
    if (attrValue) this.each(el => el.setAttribute(attrName, attrValue));
    else this.each(el => el.getAttribute(attrName));
  }

  addClass(className) {
    this.each( el => {
      if (!el.classList.includes(className)) el.classList.add(className);
    });
  }

  removeClass(className) {
    this.each((el) => el.classList.remove(className));
  }


  children() {
    const allChildren = [];
    this.each(el => allChildren.push(...el.children));
    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];
    this.each(el => allParents.push(el.parentElement));
    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    const allDescendants = [];
    this.each(el => allDescendants.push(...el.querySelectorAll(selector)));
    return new DOMNodeCollection(allDescendants);
  }

  remove() {
    this.empty();
    this.elements = [];
  }

  on(action, callback) {
    this.each(el => el.addEventListener(action, callback));
    this.callback = callback;
  }

  off(action) {
    this.each(el => el.removeEventListener(action, this.callback));
  }
}

module.exports = DOMNodeCollection;
