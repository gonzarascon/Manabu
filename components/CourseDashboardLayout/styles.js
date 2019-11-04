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

export const DeleteButton = styled(Button)`
  border-radius: 20px;
  max-width: 50px;
  max-height: 50px;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const StageBox = styled(Box)`
  border: 2px green solid;
  border-radius: 25px;
  text-align: center;
  flex-direction: column;
  position: relative;
  justify-content: center;
`;

export const AdviceBox = styled(Box)`
  background-color: #f2f2f2;
  text-align: center;
  flex-direction: column;
`;
