// Custom theme file for Grommet WIP.

import { css } from 'styled-components';

export const customTheme = {
  global: {
    // Global fonts
    font: {
      family: 'WorkSans',
      weight: 'normal',
    },
    // Global colors
    colors: {
      brand: '#5AAE00',
      danger: '#C93200',

      gray1: '#707070',
      gray2: '#B4B4B4',
      gray3: '#C9C9C9',
      gray4: '#E1E1E1',
      black: '#000000',
    },
    extend: css`
      ${props => props.dsp && `display: ${props.dsp};`}
    `,
  },

  // Image component settings
  image: {
    extend: css`
      ${props =>
        /* Handle image if it's the primary logo */
        props.logo &&
        `
        height:100%;
      `}

      ${props =>
        props.objectFit &&
        `
          object-fit: ${props.objectFit};
        `}
    `,
  },

  // Box component settings
  box: {
    extend: css`
      ${props => props.maxWidth && `max-width: ${props.maxWidth};`}

      ${props =>
        /* Handle box if it contains main search input */

        props.searchContainer &&
        `
          max-width: 700px;

          & input{
            font-weight: normal;
            }
      `}

      
      ${props => props.justifySelf && `justify-self: ${props.justifySelf};`}

      ${props =>
        props.flexOrder &&
        `
            order: ${props.flexOrder};
          `}
      
      ${props => props.fontSize && `font-size:${props.fontSize};`}

      ${props => props.gridColumn && `grid-column:${props.gridColumn};`}
    `,
  },

  // Anchor component settings
  anchor: {
    hover: {
      textDecoration: 'none',
      extend: css`
        opacity: 0.7;
      `,
    },
    extend: css`
      font-weight: normal;
      color: #707070;

      ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
      ${props => props.dsp && `display: ${props.dsp};`}
    `,
  },

  // Text component settings
  text: {
    extend: css`
      ${props => props.semiBold && `font-weight: 600;`}
      ${props => props.bold && `font-weight: 700;`}
      ${props => props.dsp && `display: ${props.dsp};`}

    `,
  },

  // Heading component settings
  heading: {
    font: {
      family: 'Kadwa',
    },
    extend: css`
      ${props => props.sans && "font-family:'WorkSans';"}
    `,
  },

  // Button component settings
  button: {
    border: {
      radius: '8px',
    },
    extend: css`
      ${props =>
        props.primary &&
        `padding: 10px; color:white; max-width:400px; height: 78px;`}
        
      ${props =>
        props.backgroundColor && `background-color: ${props.backgroundColor};`}
      
      ${props => props.bWidth && `border: ${props.bWidth};`}
      ${props => props.bRadius && `border-radius: ${props.bRadius};`}
      ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}

    `,
  },
};

export default { customTheme };
