const colors = {
  DefaultColor: "#62e4ccff",
  DisabledColor: "rgba(98, 228,204, 0.5);",
  ActiveColor: "#0ce2ebff",
  HoverColor: "#0ce2ebff",

  TableHoverColor: "rgba(203, 93, 242, 0.25);",

  DefaultText: "#FFFFFF",
  HoverText: "#FFFFFF",
  ButtonText: "#FFFFFF",
  LightText: "#808593ff",
  ModalColor: "#FFFFFF",

  DefaultRed: "#F25D5D",
  DisabledRed: "#F25D5D",

  BlackColor: "#000000",
  BgColor: "#1b1b1bff",
  BgHover: "#1c1c1dff",
};

const theme = {
  colors,
};

export default theme;

export type Theme = typeof theme;
