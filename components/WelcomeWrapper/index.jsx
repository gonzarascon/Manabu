import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

const backgroundOverlay = `
    linear-gradient( 
        rgba(20,20,20, .3), 
        rgba(20,20,20, .3))
    `;
const backgroundImage = `url(/static/images/welcome_background.jpg)`;

const backgroundResult = `${backgroundOverlay}, ${backgroundImage} bottom / cover no-repeat`;

const WelcomeWrapper = () => (
  <Box
    fill="horizontal"
    height="350px"
    background={backgroundResult}
    pad="large"
    justify="center"
    a11yTitle="Welcome section"
    as="section"
    margin={{ vertical: 'medium' }}
  >
    <Heading level={2} sans margin={{ vertical: 'medium' }}>
      Aprende. Enseña. Comparte
    </Heading>
    <Paragraph>
      Manabu es una plataforma educativa para desarrolladores.
      <br />
      Comienza ahora a adquirir nuevos conocimientos!
    </Paragraph>
  </Box>
);

export default WelcomeWrapper;
