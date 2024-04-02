const legalWorkYears = 16;
const now = new Date();
const legalYearsAgo = new Date(
  now.getFullYear() - legalWorkYears,
  now.getMonth(),
  now.getDate()
);

export const today = now.toISOString().split("T")[0];
export const minValueForCompanyOwned = "1900-01-01";
export const minValueForEmployeeBirthday = "1950-01-01";
export const minValueForEmployeeHireDate = "1968-01-01";
export const maxValueForEmployeeBirthday = legalYearsAgo
  .toISOString()
  .split("T")[0];
