const getElementById = (id) => {
  return document.getElementById(id);
};

const textToNumber = {
  "До целого": "0",
  "До десятых": "1",
  "До сотых": "2",
  "До тысячных": "3",
};

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

const debouncedGetV = debounce(getV, 700);

const sValue = getElementById("sValue");
const tValue = getElementById("tValue");
const vValue = getElementById("vValue");

let v = new Proxy(
  { value: 0 },
  {
    set: (obj, props, value) => {
      obj[props] = value;
    },
    get: (target, props) => {
      return target[props];
    },
  }
);

let s = new Proxy(
  { value: 0 },
  {
    get: (target, props) => {
      return target[props];
    },
    set: (obj, props, value) => {
      obj[props] = value;
      debouncedGetV();
    },
  }
);

let t = new Proxy(
  { value: 0 },
  {
    get: (target, props) => {
      return target[props];
    },
    set: (obj, props, value) => {
      obj[props] = value;
      debouncedGetV();
    },
  }
);

sValue.addEventListener("input", (e) => (s.value = Number(e.target.value)));
tValue.addEventListener("input", (e) => (t.value = e.target.value));

function getV() {
  v.value = Number(s.value) / Number(t.value);
  if (!Number.isFinite(v.value)) {
    return;
  }
  vValue.innerText = v.value;
}

const summary = getElementById("summary");

summary.childNodes.forEach((input) => {
  if (input.nodeType === 1 && input.id !== "default") {
    input.addEventListener("click", (e) => {
      let text = e.target.title;
      v.value = Number(Number(s.value) / Number(t.value)).toFixed(
        Number(textToNumber[text])
      );
      vValue.innerText = v.value;
    });
  }
});
