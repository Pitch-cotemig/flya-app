// Design Tokens - Sistema de Cores Flya
// Baseado na análise das cores utilizadas no projeto

export const colors = {
  // Cores Primárias
  primary: {
    cyan: "#00bcd4",        // Cor principal cyan
    cyanLight: "#00acc1",   // Variação mais clara do cyan
    cyanDark: "#0097a7",    // Variação mais escura do cyan
    purple: "#7c3aed",      // Cor principal roxa
    purpleLight: "#a855f7", // Variação mais clara do roxo
    purpleDark: "#6b21a8"   // Variação mais escura do roxo
  },

  // Gradientes Principais
  gradients: {
    primary: "linear-gradient(135deg, #00bcd4 0%, #7c3aed 100%)",
    primaryReverse: "linear-gradient(135deg, #7c3aed 0%, #00bcd4 100%)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    cyan: "linear-gradient(135deg, #00bcd4 0%, #00acc1 100%)",
    cyanHover: "linear-gradient(135deg, #00acc1 0%, #0097a7 100%)",
    hero: "linear-gradient(45deg, #ffffff, #00bcd4)",
    surface90: "linear-gradient(90deg, #00bcd4, #7c3aed)",
    surface90Reverse: "linear-gradient(90deg, #7c3aed, #00bcd4)"
  },

  // Cores de Background
  background: {
    primary: "#1c1c43",           // Dark blue principal
    primaryAlpha: "rgba(28, 28, 67, 0.95)", // Com transparência
    surface: "rgba(28, 28, 67, 0.9)",       // Surface com transparência
    overlay: "rgba(28, 28, 67, 0.8)",       // Para overlays
    glass: "rgba(255, 255, 255, 0.1)",      // Efeito glass
    glassStrong: "rgba(255, 255, 255, 0.15)", // Glass mais forte
    glassSoft: "rgba(255, 255, 255, 0.05)"   // Glass mais suave
  },

  // Sistema de Cores Neutras
  neutral: {
    white: "#ffffff",
    black: "#000000",
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827"
  },

  // Cores de Estado
  state: {
    success: "#28a745",
    successHover: "#218838",
    error: "#ff4d4f",
    errorDark: "#d4380d",
    errorGradient: "linear-gradient(135deg, #ff4d4f 0%, #d4380d 100%)",
    warning: "#ffd700",
    info: "#00bcd4"
  },

  // Cores de Texto
  text: {
    primary: "#ffffff",
    primaryAlpha90: "rgba(255, 255, 255, 0.9)",
    primaryAlpha80: "rgba(255, 255, 255, 0.8)",
    primaryAlpha60: "rgba(255, 255, 255, 0.6)",
    secondary: "#a9a1d4",
    muted: "#e0e0e0",
    mutedDark: "#ccc",
    contrast: "#333",
    slate200: "#e2e8f0",
    slate400: "#94a3b8",
    slate500: "#64748b",
    slate600: "#475569"
  },

  // Cores de Borda
  border: {
    primary: "rgba(0, 188, 212, 0.3)",
    primaryHover: "rgba(0, 188, 212, 0.4)",
    secondary: "rgba(124, 58, 237, 0.3)",
    secondaryHover: "rgba(124, 58, 237, 0.4)",
    white: "rgba(255, 255, 255, 0.1)",
    whiteStrong: "rgba(255, 255, 255, 0.2)",
    slate: "#334155",
    slateLight: "#475569"
  },

  // Cores de Sombra
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    card: "0 8px 32px rgba(0, 0, 0, 0.1)",
    cardHover: "0 12px 40px rgba(0, 0, 0, 0.15)",
    modal: "0 20px 60px rgba(0, 0, 0, 0.3)",
    modalStrong: "0 30px 80px rgba(0, 0, 0, 0.4)",
    cyan: "0 10px 30px rgba(0, 188, 212, 0.2)",
    cyanStrong: "0 10px 30px rgba(0, 188, 212, 0.3)",
    purple: "0 4px 12px rgba(124, 58, 237, 0.3)",
    error: "0 4px 12px rgba(244, 67, 54, 0.3)",
    glow: "0 0 20px rgba(0, 188, 212, 1)"
  },

  // Cores Especiais para Componentes
  accent: {
    cyan: "#00bcd4",
    purple: "#7c3aed",
    gold: "#ffd700"
  },

  // Opacidades Alpha para Backgrounds
  alpha: {
    black03: "rgba(0, 0, 0, 0.3)",
    black04: "rgba(0, 0, 0, 0.4)",
    white01: "rgba(255, 255, 255, 0.1)",
    white02: "rgba(255, 255, 255, 0.2)",
    white03: "rgba(255, 255, 255, 0.3)",
    cyan01: "rgba(0, 188, 212, 0.1)",
    cyan02: "rgba(0, 188, 212, 0.2)",
    cyan03: "rgba(0, 188, 212, 0.3)",
    purple01: "rgba(124, 58, 237, 0.1)",
    purple02: "rgba(124, 58, 237, 0.2)",
    purple03: "rgba(124, 58, 237, 0.3)",
    error02: "rgba(244, 67, 54, 0.2)",
    error04: "rgba(244, 67, 54, 0.4)"
  },

  // Sistema de Cores para Perfis (ProfilePage específicas)
  profile: {
    background: "#0f172a",
    surface: "#1e293b",
    border: "#334155",
    borderLight: "#475569",
    blue: "#3b82f6",
    blueHover: "#2563eb",
    blueDark: "#1d4ed8",
    blueLight: "#1e40af",
    text: "#e2e8f0",
    textMuted: "#94a3b8",
    textDimmed: "#64748b"
  },

  // Cores para diferentes tipos de clima (Step4 específicas)
  weather: {
    snow: "#E3F2FD",
    rain: "#BBDEFB", 
    sunny: "#FFF3E0",
    cloudy: "#F3E5F5"
  }
} as const;

// Type para garantir type safety
export type Colors = typeof colors;
export type ColorKey = keyof Colors;
export type PrimaryColor = keyof Colors['primary'];
export type GradientColor = keyof Colors['gradients'];
export type BackgroundColor = keyof Colors['background'];
export type NeutralColor = keyof Colors['neutral'];
export type StateColor = keyof Colors['state'];
export type TextColor = keyof Colors['text'];
export type BorderColor = keyof Colors['border'];
export type ShadowColor = keyof Colors['shadow'];
export type AccentColor = keyof Colors['accent'];
export type AlphaColor = keyof Colors['alpha'];
export type ProfileColor = keyof Colors['profile'];
export type WeatherColor = keyof Colors['weather'];