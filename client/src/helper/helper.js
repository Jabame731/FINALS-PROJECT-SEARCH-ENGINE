//convert string to kebab case
export const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

//convert kebab case to normal string
export const toNormalStringFromKebabCase = (str) => {
  const words = str.split('-');
  const normalString = words.join(' ');

  return normalString;
};

//convert first letter of every word to UpperCase
export const capitalizeFirstLetterEveryWord = (str) => {
  return str.replace(/\b[a-z]/g, (letter) => {
    return letter.toUpperCase();
  });
};
