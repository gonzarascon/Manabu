export const fontFace = (woffFont, woff2Font, fontName, fontWeight) =>
  `
    @font-face {
        font-family: ${fontName};
        src: url(${woff2Font}) format('woff2'),
            url(${woffFont}) format('woff');
        font-weight: ${fontWeight};
        font-style: normal;
    }`;

export default { fontFace };
