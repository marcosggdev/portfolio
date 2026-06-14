export const resolveCSSVar = (value) => {
  if (!value) return value;

  // si ya viene como var(...)
  if (typeof value === "string" && value.startsWith("var(")) {
    return value;
  }

  // si viene como --css-var
  if (typeof value === "string" && value.startsWith("--")) {
    return `var(${value})`;
  }

  return value;
};
