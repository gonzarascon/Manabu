import styled from 'styled-components';
import { Box, Button, Form, FormField } from 'grommet';

export const Wrapper = styled(Box)`
  min-height: 80vh;
`;

export const EditorWrapper = styled(Box)`
  & .classEditor {
    height: 100%;
    border: 2px solid #d9d9d9;
    padding: 20px;
    border-radius: 0px 0px 25px 25px;
  }
`;

export const AnswerField = styled(FormField)`
  border-bottom: none;

  & > div {
    border: none;
  }
`;

export const FormWrapper = styled(Box)``;

export const QuestionForm = styled(Form)`
  background-color: #f2f2f2;
  border-radius: 25px;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & div span {
    font-size: 0.9em;
  }
`;

export const SaveButton = styled(Button)`
  border-radius: 25px;
  background-color: var(--brand);
  height: 50px;
  color: white;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
`;

export const CustomPre = styled.pre`
  display: inline;
  line-height: 20px;
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
