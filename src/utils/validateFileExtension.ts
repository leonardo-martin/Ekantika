function validateFileExtension(fileName: string, extensions: Array<string>) {
  return new RegExp(
    "(" + extensions.join("|").replace(/\./g, "\\.") + ")$"
  ).test(fileName);
}

export default validateFileExtension;
