import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Meter, Grid, Text, Heading } from 'grommet';
import Avatar from 'react-avatar';

import SliderRow from '../SliderRow';
import HighlightLink from '../HighlightLink';

const cardsArray = [
  {
    id: 1,
    imageSrc: '/static/images/card_default.png',
    cardTitle: 'JavaScript desde cero - Curso Inicial',
    cardSubtitle: 'Darth Vader',
  },
  {
    id: 2,
    imageSrc: '/static/images/card_default.png',
    cardTitle: 'Callbacks vs. Requests en JavaScript',
    cardSubtitle: 'De la Rua',
  },
  {
    id: 3,
    imageSrc: '/static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: '/static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: '/static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: '/static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: '/static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
];

const desktopColumns = ['.8fr', '1fr'];
const desktopRows = ['small', '1fr'];
const desktopAreas = [
  { name: 'userData', start: [0, 0], end: [0, 0] },
  { name: 'badges', start: [0, 1], end: [0, 1] },
  { name: 'slider', start: [1, 1], end: [1, 1] },
];

const mobileColumns = ['1fr'];
const mobileRows = ['small', '1fr'];
const mobileAreas = [
  { name: 'userData', start: [0, 0], end: [0, 0] },
  { name: 'slider', start: [0, 1], end: [0, 1] },
];

const values = [
  {
    value: 65,
    color: 'brand',
    label: 'Experiencia acumulada',
    highlight: true,
  },
];

// TODO: Implement server logic here
const placeholders = [
  'badge1',
  'badge2',
  'badge3',
  'badge4',
  'badge5',
  'badge6',
  'badge7',
  'badge8',
];

class UserLayout extends PureComponent {
  render() {
    const {
      responsiveSize,
      userData: { username, xp },
    } = this.props;
    // TODO: receive user data

    return (
      <Box pad={{ horizontal: 'xsmall' }} as="div">
        <Grid
          rows={responsiveSize === 'small' ? mobileRows : desktopRows}
          columns={responsiveSize === 'small' ? mobileColumns : desktopColumns}
          gap="large"
          areas={responsiveSize === 'small' ? mobileAreas : desktopAreas}
          as="section"
        >
          <Box
            gridArea="userData"
            as="article"
            direction="row"
            wrap={false}
            align="center"
          >
            <Box align="center" pad="medium" responsive>
              <Stack anchor="center">
                <Meter
                  type="circle"
                  values={xp}
                  round
                  max={100}
                  size="110"
                  thickness="xsmall"
                  alignSelf="center"
                />
                <Box align="center">
                  <Avatar round size="90" name={username} />
                </Box>
              </Stack>
            </Box>
            <Box>
              <Heading sans level={3} responsive size="large">
                {username}
              </Heading>
              <Text color="brand" size="large" margin={{ top: 'small' }}>
                Suricata del codigo
              </Text>
            </Box>
          </Box>

          {responsiveSize !== 'small' && (
            <Box
              gridArea="badges"
              as="aside"
              border={{ color: 'brand', size: 'small', side: 'all' }}
              round="small"
            >
              <Box margin="medium">
                <Heading level={3} responsive color="gray1">
                  Logros
                </Heading>
              </Box>
              <Box
                direction="row"
                margin="medium"
                wrap
                justify="evenly"
                overflow={{ vertical: 'auto' }}
                height="300px"
              >
                {placeholders.map(placeholder => (
                  <Box
                    background="gray1"
                    round="full"
                    width="100px"
                    height="100px"
                    a11yTitle={placeholder}
                    key={placeholder}
                    animation="fadeIn"
                    margin="medium"
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box gridArea="slider" as="section">
            <SliderRow
              responsiveSize={responsiveSize}
              headingLabel="Tus cursos"
              cards={cardsArray}
            />
          </Box>
        </Grid>
        <Box margin={{ vertical: 'large' }}>
          <HighlightLink
            textLabel="¿Quieres enseñar lo que sabes?"
            anchorLabel="Regístrate como docente."
            anchorHref="#"
            responsiveSize={responsiveSize}
          />
        </Box>
      </Box>
    );
  }
}

UserLayout.propTypes = {
  responsiveSize: PropTypes.string.isRequired,
};

export default UserLayout;
