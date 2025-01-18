export function throttling(func: any, limit: number) {
  let timeout: number | undefined;
  const throttle = () => {
    if (!timeout) {
      func();
      timeout = setTimeout(function () {
        timeout = undefined;
      }, limit);
    }
  };
  throttle();
}

export function delayAction(ms: number, func: any) {
  let id: number;
  const promise = new Promise((res) => {
    id = setTimeout(res, ms);
  });
  promise.then(() => func());
  return () => clearTimeout(id);
}
