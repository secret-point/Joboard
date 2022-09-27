// https://github.com/facebook/jest/issues/3465
export const debounce = jest.fn().mockImplementation((callback, timeout) => {
  let timeoutId = null;
  const debounced = jest.fn((...args)=>{
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), timeout);
  });

  const cancel = jest.fn(()=>{
    window.clearTimeout(timeoutId);
  });

  debounced.cancel = cancel;
  return debounced;
});

export default debounce;
