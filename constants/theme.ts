  import { vars } from "nativewind";

  export const themeFonts = {
    heading: {
      family: 'Inter',
      weights: {
        normal: 'Inter_400Regular',
        medium: 'Inter_500Medium',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
      },
    },
    body: {
      family: 'Inter',
      weights: {
        normal: 'Inter_400Regular',
        medium: 'Inter_500Medium',
        semibold: 'Inter_600SemiBold',
      },
    },
    mono: {
      family: 'JetBrainsMono',
      weights: {
        normal: 'JetBrainsMono_400Regular',
        medium: 'JetBrainsMono_500Medium',
      },
    },
  };

  // Professional Blue Theme for Legal/Finance App
  export const lightTheme = vars({
    "--radius": "12",

    // Core semantic colors
    "--background": "255 255 255",
    "--foreground": "15 23 42", // Slate 900

    "--card": "255 255 255",
    "--card-foreground": "15 23 42",

    "--popover": "255 255 255",
    "--popover-foreground": "15 23 42",

    // Primary: Professional Royal Blue
    "--primary": "37 99 235", // Blue 600
    "--primary-foreground": "255 255 255",

    "--secondary": "241 245 249", // Slate 100
    "--secondary-foreground": "15 23 42",

    "--muted": "241 245 249", // Slate 100
    "--muted-foreground": "100 116 139", // Slate 500

    "--accent": "241 245 249",
    "--accent-foreground": "15 23 42",

    "--destructive": "220 38 38",

    "--border": "226 232 240", // Slate 200
    "--input": "241 245 249",
    "--ring": "37 99 235",

    // Chart colors
    "--chart-1": "37 99 235",
    "--chart-2": "16 185 129",
    "--chart-3": "245 158 11",
    "--chart-4": "239 68 68",
    "--chart-5": "139 92 246",

    // Sidebar colors
    "--sidebar": "248 250 252",
    "--sidebar-foreground": "15 23 42",
    "--sidebar-primary": "37 99 235",
    "--sidebar-primary-foreground": "255 255 255",
    "--sidebar-accent": "241 245 249",
    "--sidebar-accent-foreground": "15 23 42",
    "--sidebar-border": "226 232 240",
    "--sidebar-ring": "37 99 235",
  });

  export const darkTheme = vars({
    "--radius": "12",

    // Core semantic colors
    "--background": "15 23 42", // Slate 900
    "--foreground": "248 250 252", // Slate 50

    "--card": "30 41 59", // Slate 800
    "--card-foreground": "248 250 252",

    "--popover": "30 41 59",
    "--popover-foreground": "248 250 252",

    // Primary: Lighter Blue for dark mode
    "--primary": "96 165 250", // Blue 400
    "--primary-foreground": "15 23 42",

    "--secondary": "51 65 85", // Slate 700
    "--secondary-foreground": "248 250 252",

    "--muted": "51 65 85",
    "--muted-foreground": "148 163 184", // Slate 400

    "--accent": "71 85 105", // Slate 600
    "--accent-foreground": "248 250 252",

    "--destructive": "248 113 113",

    "--border": "51 65 85",
    "--input": "51 65 85",
    "--ring": "96 165 250",

    // Chart colors
    "--chart-1": "96 165 250",
    "--chart-2": "52 211 153",
    "--chart-3": "251 191 36",
    "--chart-4": "248 113 113",
    "--chart-5": "192 132 252",

    // Sidebar colors
    "--sidebar": "30 41 59",
    "--sidebar-foreground": "248 250 252",
    "--sidebar-primary": "96 165 250",
    "--sidebar-primary-foreground": "15 23 42",
    "--sidebar-accent": "51 65 85",
    "--sidebar-accent-foreground": "248 250 252",
    "--sidebar-border": "51 65 85",
    "--sidebar-ring": "96 165 250",
  });