module.exports = {
  content: [
    './site/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'public-sans': ['Public Sans', 'sans-serif'],
      },
      spacing: {
        // Add or update the height and padding values
        '3.5': '0.875rem', // Example height
      },
      padding: {
        // Add or update the padding values
        '2': '0.5rem', // Example padding
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#06bbcc",
          "secondary": "#3b82f6",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",

          "--rounded-box": "calc(0.5rem - 4px)", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "calc(0.5rem - 4px)", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "calc(0.5rem)", // border radius of tabs

        },
      },

    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    //darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}