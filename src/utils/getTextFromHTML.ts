const getTextFromHTML = (html: string): string => {
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\n/g, ' ')
    .split(' ')
    .filter(Boolean)
    .join(' ');
};

export default getTextFromHTML;
