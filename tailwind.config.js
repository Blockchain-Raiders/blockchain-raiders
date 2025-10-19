
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        raidLime: "#B8FF36",
        raidMagenta: "#FF38D1",
        raidGold: "#D9A441",
        raidCyan: "#00F9FF",
        raidDanger: "#FF3358",
        raidBg: "#1A1220",
        raidText: "#F3F0E8"
      },
      boxShadow: {
        neon: "0 0 12px rgba(184,255,54,0.6)",
        mag: "0 0 12px rgba(255,56,209,0.6)"
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "system-ui", "sans-serif"],
        ui: ["'Inter'", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
};
