const list = [
  { path: ["username"], message: "Username is too short" },
  { path: ["email"], message: "Invalid email" },
];

// desired result
// {
//   "username": "Username is too short",
//   "email": "Invalid email"
// }

const accfunc = (acc, currentValue) => {
  const key = currentValue.path;
  acc[key] = currentValue.message;

  return acc;
};

console.log(list.reduce(accfunc, {}));
