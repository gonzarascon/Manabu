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
      gray1: '#707070',
      gray2: '#B4B4B4',
      gray3: '#C9C9C9',
      gray4: '#E1E1E1',
      primaryBrand: '#FF9D33',
    },
  },
  image: {
    extend: css`
      ${props =>
        /* Handle image if it's the primary logo */
        props.logo &&
        `
      max-width: 70px;
      height: 100%;
      `}
    `,
  },
  box: {
    extend: css`
      ${props =>
        /* Handle box if it contains the primary logo */

        props.logoContainer &&
        `
            max-width:70px;
        `}
    `,
  },
  anchor: {
    extend: css`
      font-weight: normal;
      color: #707070;
    `,
  },
};

export default { customTheme };
