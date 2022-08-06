export const namespace = (...classNames: string[]) => {
  return classNames.map(name => `pine-${name}`).join(" ");
};
