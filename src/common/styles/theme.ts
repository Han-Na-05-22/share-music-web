const colors = {
  DefaultColor: "#CB5DF2",
  DisabledColor: "rgba(203, 93, 242, 0.5);",
  ActiveColor: "#9924C2",
  HoverColor: "#B037DA",

  TableHoverColor: "rgba(203, 93, 242, 0.25);",

  DefaultText: "#C0C0C0",
  HoverText: "#6C6A6A",
  ButtonText: "#FFFFFF",

  ModalColor: "#FFFFFF",

  DefaultRed: "#F25D5D",
  DisabledRed: "#F25D5D",

  BlackColor: "#000000",
};

const theme = {
  colors,
};

export default theme;

export type Theme = typeof theme;
