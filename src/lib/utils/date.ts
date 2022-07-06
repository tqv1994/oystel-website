export function calculateYear(year: string | number | Date) {
  const ageDifMs = Date.now() - new Date(year);
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const result = Math.abs(ageDate.getUTCFullYear() - 1970);
  if(result === 0 ){
      return "< 1";
  }
  return result;
}
