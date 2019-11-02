import styled from 'styled-components';
import { Heading, Box, Grid, Button } from 'grommet';

export const Wrapper = styled(Box)`
  min-height: 80vh;
`;

export const AddButton = styled(Button)`
  border: 2px green solid;
  border-radius: 25px;
  text-align: center;

  > div {
    flex-direction: column;

    svg {
      margin: 10px auto;
    }
  }
`;

export const StageBox = styled(Box)`
  border: 2px green solid;
  border-radius: 25px;
  text-align: center;
  flex-direction: column;
`;

export const AdviceBox = styled(Box)`
  background-color: #f2f2f2;
  text-align: center;
  flex-direction: column;
`;
