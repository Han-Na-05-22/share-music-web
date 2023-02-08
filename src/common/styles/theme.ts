const colors = {
  DefaultColor: "#CB5DF2",
  DisabledColor: "rgba(203, 93, 242, 0.5);",
  ActiveColor: "#9924C2",
  HoverColor: "#B037DA",

  DefaultText: "#C0C0C0",
  HoverText: "#6C6A6A",
  ButtonText: "#FFFFFF",

  DefaultRed: "#F25D5D",
  DisabledRed: "#F25D5D",
};

const theme = {
  colors,
};

export default theme;

export type Theme = typeof theme;
