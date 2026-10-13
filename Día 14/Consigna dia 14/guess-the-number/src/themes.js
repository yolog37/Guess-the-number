export const THEME_COLORS = {
  dark: {
    bgStart: '#052659',
    bgEnd: '#021024',
    cardBg: '#021024',
    textColor: '#FFFFFF',
    borderColor: '#7DA0CA'
  },
  light: {
    bgStart: '#FFFFFF',
    bgEnd: '#C1E8FF',
    cardBg: '#C1E8FF',
    textColor: '#021024',
    borderColor: '#5483B3'
  }
};

export function getStageTheme(isDarkMode) {
  // Si por alguna razón isDarkMode es undefined, cae en modo oscuro por defecto
  const theme = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light;

  return {
    cardColor: theme.cardBg,
    cardTextColor: theme.textColor,
    cardBorderColor: theme.borderColor,
    backgroundGradient: `linear-gradient(135deg, ${theme.bgStart}, ${theme.bgEnd})`,
  };
}
