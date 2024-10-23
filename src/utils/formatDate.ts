const formatDate = (date: Date) => {
  const year = new Intl.DateTimeFormat([], { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat([], { month: 'long' }).format(date);
  const day = new Intl.DateTimeFormat([], { day: '2-digit' }).format(date);
  return `${month} ${day}, ${year}`;
}

export default formatDate;
