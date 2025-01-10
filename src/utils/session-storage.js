const updateSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
  const event = new Event('sessionStorageChange');
  window.dispatchEvent(event);
};

module.exports = {
  updateSessionStorage,
};
