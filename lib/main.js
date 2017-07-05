const DOMNodeCollection = require('./dom_node_collection.js');

const docReadyCallbacks = [];

document.addEventListener('DOMContentLoaded', () => {
  docReadyCallbacks.forEach(callback => callback());
});

function $l(arg) {
  if (arg instanceof Function) {
    if (document.readyState == 'complete') arg();
    else docReadyCallbacks.push(arg);
    return;
  }

  let arrayEl;
  if (arg instanceof HTMLElement) {
    arrayEl = [arg];
  } else {
    const nodeList = document.querySelectorAll(arg);
    arrayEl = Array.from(nodeList);
  }
  console.log(arrayEl);
  return new DOMNodeCollection(arrayEl);
}

Function.prototype.extend = function(firstObj, ...objects) {
  for (let i = 0; i < objects.length; i++) {
    for (let key in objects[i]) {
      if (firstObj.hasOwnProperty(key)) firstObj[key] = objects[i][key];
    }
  }
  return firstObj;
};

Function.prototype.ajax = function(options) {
  const defaults = {
    method: "GET",
    url: window.location.href,
    dataType: "json",
    data: {},
    success: (data) => console.log(data),
    error: (err) => console.log(err)
  };

  const opts = this.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(opts.method, opts.url);
  xhr.onload = (xhr.status < 400) ? opts.success(xhr.response) : opts.error(xhr.response); // passing in the data for
  xhr.responseType = opts.dataType;
  xhr.send(opts.data);
};

window.$l = $l;
