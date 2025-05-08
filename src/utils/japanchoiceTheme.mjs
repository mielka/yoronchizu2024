import { extendTheme } from "@chakra-ui/react";
// next/font/google からフォントをインポート
import { Lato, Noto_Sans_JP } from "next/font/google";

// フォントの設定
export const lato = Lato({
  weight: ["400", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const japanchoiceThemeConfig = {
  fonts: {
    body: `${notoSansJP.style.fontFamily}, ${lato.style.fontFamily}`,
    heading: `${notoSansJP.style.fontFamily}, ${lato.style.fontFamily}`,
    mono: `${notoSansJP.style.fontFamily}, ${lato.style.fontFamily}`,
  },
  colors: {
    brand: {
      50: "#FCE9E9",
      100: "#F5C2C1",
      200: "#EF9C99",
      300: "#E97572",
      400: "#E34E4A",
      base: "#E24743",
      500: "#DD2722",
      600: "#B11F1B",
      700: "#851714",
      800: "#58100E",
      900: "#2C0807",
    },
    success: {
      50: "#EAFAF1",
      100: "#C5F1D9",
      200: "#A0E9C0",
      300: "#7BE0A7",
      400: "#56D78F",
      base: "#3BD17D",
      500: "#30CF76",
      600: "#27A55E",
      700: "#1D7C47",
      800: "#13532F",
      900: "#0A2918",
    },
    negative: {
      50: "#FDE8E8",
      100: "#F8BEBE",
      200: "#F49595",
      300: "#F06B6B",
      base: "#EE5959",
      400: "#EC4141",
      500: "#E71818",
      600: "#B91313",
      700: "#8B0E0E",
      800: "#5D0909",
      900: "#2E0505",
    },
    warning: {
      50: "#FFF8E5",
      100: "#FFECB8",
      200: "#FFE08A",
      300: "#FFD45C",
      base: "#FFCB38",
      400: "#FFC82E",
      500: "#FFBC00",
      600: "#CC9700",
      700: "#997100",
      800: "#664B00",
      900: "#332600",
    },
    link: {
      50: "#E9F0FB",
      100: "#C2D6F5",
      200: "#9ABCEF",
      300: "#73A2E8",
      400: "#4B87E2",
      base: "#3478DE",
      500: "#246DDB",
      600: "#1D57AF",
      700: "#154184",
      800: "#0E2C58",
      900: "#07162C",
    },
    primary: {
      100: "#F0ADAF",
      200: "#E89093",
      300: "#E57377",
      400: "#E24348",
      500: "#E0272D",
      600: "#E0272D",
    },
    secondary: {
      100: "#ADF0CA",
      200: "#90E8B6",
      300: "#73E5A5",
      400: "#3BE385",
      500: "#0DD664",
      600: "#0DD664",
    },
    neutral: {
      0: "#FFFFFF",
      100: "#F3F4F5",
      150: "#D2D5D9",
      200: "#8E959E",
      300: "#4B535C",
      400: "#272B30",
      500: "#222222",
      600: "#222222",
    },
    text: "neutral.400",
    subtext: "#636C76",
    border: "#DADAE0",
    footerBackground: "#DADAE0",
    pageBackground: "#FFFFFF",
    contentBackground: "#F7F8FA",
    variation3: "#FAC839",
    variation4: "#347AE3",
    variation5: "#FAA23B",
  },
  semanticTokens: {
    colors: {
      brand: "brand.base",
      success: "success.base",
      negative: "negative.base",
      warning: "warning.base",
      link: "link.base",
    },
  },
  components: {
    Drawer: {
      variants: {
        // https://github.com/chakra-ui/chakra-ui/issues/2893#issuecomment-780143150
        activeMainContent: {
          parts: ["dialog, dialogContainer"],
          dialog: {
            pointerEvents: "auto",
          },
          dialogContainer: {
            pointerEvents: "none",
          },
        },
      },
    },
  },
};

export const japanchoiceTheme = extendTheme(japanchoiceThemeConfig);
