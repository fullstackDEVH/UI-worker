

export const addClassList = (item, nameClass) => {
    item.classList.add(nameClass)
};

export const removeClassList = (item, nameClass) => {
    item.classList.remove(nameClass)
};

export const toggleClassList = (item, nameClass) => {
    item.classList.toggle(nameClass)
};

export const removeAllClassList = (items, nameClass) => {
    items.forEach(item => item.classList.remove(nameClass));
};