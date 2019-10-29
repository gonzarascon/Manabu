import styled from 'styled-components';
import { Heading, Box, Grid } from 'grommet';

export const Wrapper = styled(Box)`
  min-height: 80vh;
`;

export const EditorWrapper = styled(Box)`
  & .classEditor {
    height: 100%;
    border: 1px solid black;
    padding: 20px;
    border-radius: 25px;
  }
`;

export const CustomPre = styled.pre`
  display: inline;
  & code {
    background-color: #f2f2f2;
    border-radius: 5px;
    padding: 5px;
    font-family: monospace;
  }
`;

export const Bold = styled.strong`
  font-weight: bold;
  margin: 0 2px;
`;
export const Italic = styled.em`
  font-style: italic;
`;

export const Underline = styled.u`
  font-style: underlined;
`;
