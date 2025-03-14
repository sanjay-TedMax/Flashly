export const theme = {
  colors: {
    primary: '#6E3AFF',
    secondary: '#FF3AE6',
    background: '#0A0516',
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    button: {
      primary: 'rgba(110, 58, 255, 0.9)',
      hover: 'rgba(110, 58, 255, 1)',
    },
  },
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  animations: {
    glow: 'glow 2s ease-in-out infinite alternate',
    float: 'float 6s ease-in-out infinite',
    twinkle: 'twinkle 1.5s ease-in-out infinite',
  },
} as const;