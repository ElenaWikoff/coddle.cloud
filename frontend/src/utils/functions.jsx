export function capitalizeEachWord(str) {
  const words = str.split(' ');

  const capitalizedWords = words.map(word => {
    if (word.length === 0) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const result = capitalizedWords.join(' ').replace(/^([a-z])|[ (]+([a-z])/g, l => l.toUpperCase())

  return result;
}