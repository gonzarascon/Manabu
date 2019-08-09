export const icons = {
  manabu_iso: '/static/images/manabu_iso_dragon.png',
  manabu_logo: '/static/images/manabu_logo_dragon.png',
};

export const calculateRem = size => `${size / 16}rem`;

export const fontFace = (woffFont, woff2Font, fontName, fontWeight) =>
  `
    @font-face {
        font-family: ${fontName};
        src: url(${woff2Font}) format('woff2'),
            url(${woffFont}) format('woff');
        font-weight: ${fontWeight};
        font-style: normal;
    }`;

export const checkUserData = userData => {
  switch (userData) {
    case 'NO_USER':
      return false;

    case 'NO_TOKEN':
      return false;

    case 'AUTH_ERROR':
      return false;

    case undefined:
      return false;

    default:
      return true;
  }
};

export default { fontFace, icons, calculateRem, checkUserData };
