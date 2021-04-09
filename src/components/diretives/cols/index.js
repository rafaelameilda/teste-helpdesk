const addClass = (el, className) => {
  if (el) {
    el.classList.add(className);
  }
};

const generateCol = (Vue, type = null) => {
  for (let i = 1; i <= 12; i++) {
    if (!type) {
      const dirvName = `col-${i}`;
      Vue.directive(dirvName, {
        bind(el, binding, vnode) {
          addClass(el, `col-${i}`);
        }
      });
    } else {
      const dirvName = `col-${type}-${i}`;
      Vue.directive(dirvName, {
        bind(el, binding, vnode) {
          addClass(el, `col-${type}-${i}`);
        }
      });
    }
  }
};

export default generateCol;
