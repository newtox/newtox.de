/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#1e254a",
        // borderLine: rgba(255, 255, 255, 65),
        // borderFill: rgba(255, 255, 255, 5)
      },
      fontFamily: {
        "pixel": "\"Silkscreen\", cursive;",
        "roboto": "\"Roboto\", sans-serif;"
      }
    },
  },
  plugins: [],
}
