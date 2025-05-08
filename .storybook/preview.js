import "../src/styles/globals.css";
import { japanchoiceTheme } from "../src/utils/japanchoiceTheme.mjs";
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme: japanchoiceTheme,
  },
  viewport: {
    viewports: {
      smallMobile: {
        name: "Small Moblie",
        styles: {
          width: "320px",
          height: "568px",
        },
      },
      largeMobile: {
        name: "Large Mobile",
        styles: {
          width: "375px",
          height: "667px",
        },
      },
      smallTablet: {
        name: "Small Tablet",
        styles: {
          width: "768px",
          height: "1024px",
        },
      },
      largeTablet: {
        name: "Large Tablet",
        styles: {
          width: "820px",
          height: "1180px",
        },
      },
      smallLaptop: {
        name: "Small Laptop",
        styles: {
          width: "1024px",
          height: "600px",
        },
      },
      middleLaptop: {
        name: "Middle Laptop",
        styles: {
          width: "1280px",
          height: "800px",
        },
      },
    },
  },
};
