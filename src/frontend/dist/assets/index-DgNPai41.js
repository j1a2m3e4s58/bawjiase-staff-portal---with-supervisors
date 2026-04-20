const DEPARTMENTS = [
  "IT",
  "HR",
  "HEAD OFFICE",
  "BAWJIASE",
  "KASOA MAIN",
  "KASOA NEW MARKET",
  "ADEISO",
  "OFAAKOR",
  "BANKING OPERATIONS",
  "E-BANKING",
  "MICROFINANCE",
  "CREDIT",
  "RECOVERY",
  "SUSU",
  "COMPLIANCE",
  "AUDIT",
  "ADMIN"
];
const BRANCHES = [
  "HEAD OFFICE",
  "BAWJIASE",
  "ADEISO",
  "OFAAKOR",
  "KASOA NEW MARKET",
  "KASOA MAIN"
];
function isOk(result) {
  return "ok" in result;
}
export {
  BRANCHES as B,
  DEPARTMENTS as D,
  isOk as i
};
