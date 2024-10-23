import getTextFromHTML from '@/utils/getTextFromHTML';

const getExcerpt = (content: string, maxLength: number = 160) => {
  const cleanString = getTextFromHTML(content);
  const trimmedString = cleanString.substring(0, maxLength);

  return `${trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))}...`;
};

export default getExcerpt;
