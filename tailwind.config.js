const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  variants: {
    // Configure variants
    extend: {
      opacity: ["disabled"],
      cursor: ["hover", "focus"],
    },
  },
  plugins: [nextui({
    prefix: "nextui", // prefix for themes variables
    addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
    defaultTheme: "dark", // default theme from the themes object
    defaultExtendTheme: "dark", // default theme to extend on custom themes
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      light: {
        layout: {
          spacingUnit: 4, // in px
          disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
          dividerWeight: "1px", // h-divider the default height applied to the divider component
          fontSize: {
            tiny: "0.75rem", // text-tiny
            small: "0.875rem", // text-small
            medium: "1rem", // text-medium
            large: "1.125rem", // text-large
          },
          lineHeight: {
            tiny: "1rem", // text-tiny
            small: "1.25rem", // text-small
            medium: "1.5rem", // text-medium
            large: "1.75rem", // text-large
          },
          radius: {
            small: "8px", // rounded-small
            medium: "12px", // rounded-medium
            large: "14px", // rounded-large
          },
          borderWidth: {
            small: "1px", // border-small
            medium: "2px", // border-medium (default)
            large: "3px", // border-large
          },
        }, // light theme layout tokens
        colors: {}, // light theme colors
      },
      dark: {
        layout: {}, // dark theme layout tokens
        colors: {}, // dark theme colors
      },
      // ... custom themes
    },
  })],
};
