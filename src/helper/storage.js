export default {
  getObject(key) {
    try {
      var value = localStorage.getItem(key);
      if(value) {
        return JSON.parse(value);
      }
    } catch (e) {
      return {};
    }
    return {};
  },

  setObject(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};
