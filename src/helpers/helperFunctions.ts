export const convertDateToMonthAndYear = (dateString: Date) => {
  const date = new Date(dateString);
  
  // Get month and year
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export const convertDateToISOString = (dateString: Date) => {
  return new Date(dateString).toISOString();
}

export const isValidFormData = (...args: string[]): boolean => {
  return args.some((arg) => !arg?.trim()?.length);
}