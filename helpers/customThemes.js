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
      primaryBrand: '#FF9D33',

      gray1: '#707070',
      gray2: '#B4B4B4',
      gray3: '#C9C9C9',
      gray4: '#E1E1E1',
      black: '#000000',
    },
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
    `,
  },

  // Box component settings
  box: {
    extend: css`
      ${props => props.maxWidth && `max-width: ${props.maxWidth}`}

      ${props =>
        /* Handle box if it contains main search input */

        props.searchContainer &&
        `
          max-width: 700px;

          & input{
            font-weight: normal;
            }
      `}
      
      ${props =>
        /* Handle box if it contains the primary logo */
        props.logoContainer && `max-width:66px;`}

      
      ${props => props.justifySelf && `justify-self: ${props.justifySelf};`}

      ${props =>
        props.flexOrder &&
        `
            order: ${props.flexOrder};
          `}
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
    `,
  },

  text: {
    extend: css`
      ${props => props.semiBold && `font-weight: 600;`}
      ${props => props.bold && `font-weight: 700;`}
    `,
  },
};

export default { customTheme };
