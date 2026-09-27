export type Intent = "neutral" | "info" | "success" | "warning" | "danger";
export const intentSymbols: Record<Intent, string> = {
  neutral: "—",
  info: "i",
  success: "✓",
  warning: "!",
  danger: "×",
};
