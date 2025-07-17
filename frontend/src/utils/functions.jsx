export function capitalizeEachWord(str) {
  const replace = str.replace('_', ' ');
  const words = replace.split(' ');

  const capitalizedWords = words.map(word => {
    if (word.length === 0) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const result = capitalizedWords.join(' ').replace(/^([a-z])|[ (]+([a-z])/g, l => l.toUpperCase())

  return result;
}

/**
 * Get string for fish species distribution
 * @param {string} str 2 character code
 * @returns Continent or ocean
 */
export function getDistribution(str) {
  switch (str) {
    case 'aa': return 'All Oceans';
    case 'as': return 'Asia';
    case 'eu': return 'Europe';
    case 'es': return 'Eurasia';
    case 'na': return 'North America';
    case 'af': return 'Africa';
    case 'sa': return 'South America';
    case 'oc': return 'Oceania';
    case 'an': return 'Antarctica';
    case 'at': return 'Atlantic Ocean';
    case 'pa': return 'Pacifc Ocean';
    case 'ar': return 'Arctic Ocean';
    case 'in': return 'Indian Ocean';
    case 'so': return 'Southern Ocean';
    default:
      return 'All';
  }
}