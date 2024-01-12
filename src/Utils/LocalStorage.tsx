export const useLocalStorage = (key: string, initialValue: Array<Object>) => {
  const push = (value: Object) => {
    let items = getAll();
    items.push(value);
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.log(err);
    }
  };

  const getAll = () => {
    try {
      let items = localStorage.getItem(key);
      if (items) {
        return JSON.parse(items);
      } else {
        return initialValue;
      }
    } catch (err) {
      console.log(err);
      return initialValue;
    }
  };

  const getById = (id: string) => {
    let items = getAll();
    return items.find((item: any) => item.id === id);
  };

  const updateById = (id: string, value: Object) => {
    let items = getAll();
    let index = items.findIndex((item: any) => item.id === id);
    items[index] = value;
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteById = (id: string) => {
    let items = getAll();
    let index = items.findIndex((item: any) => item.id === id);
    items.splice(index, 1);
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.log(err);
    }
  };

  const clearAll = () => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  };

  const length = () => {
    let items = getAll();
    return items.length;
  };

  const getId = () => {
    let items = getAll();
    if (items.length === 0) {
      return "0";
    }
    return (parseInt(items[items.length - 1].id) + 1).toString();
  };
  return {
    push,
    getId,
    getAll,
    getById,
    updateById,
    deleteById,
    clearAll,
    length,
  };
};
