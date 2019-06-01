import { createGlobalStyle } from 'styled-components';
import constants from '../constants';

import {
  KadwaBold,
  KadwaBoldwf2,
  KadwaRegular,
  KadwaRegularwf2,
  WorkSansExtraBold,
  WorkSansExtraBoldwf2,
  WorkSansRegular,
  WorkSansRegularwf2,
  WorkSansSemiBold,
  WorkSansSemiBoldwf2,
} from './fonts';

const fontFace = constants.fontFace;

export const GlobalStyle = createGlobalStyle`

    ${fontFace(KadwaBold, KadwaBoldwf2, 'Kadwa', 'bold')};
    ${fontFace(KadwaRegular, KadwaRegularwf2, 'Kadwa', 'normal')};
    
    ${fontFace(WorkSansExtraBold, WorkSansExtraBoldwf2, 'WorkSans', 700)};
    ${fontFace(WorkSansSemiBold, WorkSansSemiBoldwf2, 'WorkSans', 600)};
    ${fontFace(WorkSansRegular, WorkSansRegularwf2, 'WorkSans', 'normal')};

`;
