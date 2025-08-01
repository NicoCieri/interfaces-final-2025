export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Ficción":
      return "primary";
    case "Poesía":
      return "secondary";
    case "Historia":
      return "warning";
    case "Filosofía":
      return "success";
    case "Ciencia":
      return "danger";

    default:
      return "default";
  }
};
