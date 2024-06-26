export const convertDateToMonthAndYear = (dateString: Date) => {
  const date = new Date(dateString);

  // Get month and year
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export const convertDateToString = (dateString: Date) => {
  const dateObj = new Date(dateString);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
};

export const convertDateToISOString = (dateString: Date) => {
  return new Date(dateString).toISOString();
};

export const getTotalYearsFromBirthDate = (birthDateString: Date) => {
  const birthDate = new Date(birthDateString);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  return age;
};
