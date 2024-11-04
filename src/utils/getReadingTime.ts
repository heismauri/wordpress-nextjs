const getReadingTime = (text: string): number => {
  const wordsPerMinute = 265;
  const words = text.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
};

export default getReadingTime;
