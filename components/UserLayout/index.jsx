import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Box, Stack, Meter, Grid, Text, Heading, Button } from 'grommet';
import { Achievement } from 'grommet-icons';
import Avatar from 'react-avatar';

import SliderRow from '../SliderRow';
import HighlightLink from '../HighlightLink';

const desktopColumns = ['.8fr', '1fr'];
const desktopRows = ['small', '1fr', '1fr'];
const desktopAreas = [
  { name: 'userData', start: [0, 0], end: [0, 0] },
  // { name: 'badges', start: [0, 1], end: [0, 1] },
  { name: 'slider1', start: [0, 1], end: [1, 1] },
  { name: 'slider2', start: [0, 2], end: [1, 2] }
];

const mobileColumns = ['1fr'];
const mobileRows = ['small', '1fr', '1fr'];
const mobileAreas = [
  { name: 'userData', start: [0, 0], end: [0, 1] },
  { name: 'slider1', start: [0, 1], end: [0, 1] },
  { name: 'slider2', start: [0, 2], end: [0, 2] }
];

function defineTitles(titles) {
  const selectedTitle = _.find(titles, o => o.selected === true);

  return selectedTitle === undefined ? '' : selectedTitle;
}

class UserLayout extends PureComponent {
  render() {
    const {
      responsiveSize,
      userData: { username, xp, courses, titles, user_type, id },
      userTakenCourses,
      token
    } = this.props;

    const xpMeter = [
      {
        value: xp,
        label: 'Experiencia de usuario'
      }
    ];

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
                  values={xpMeter}
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
                {defineTitles(titles)}
              </Text>
            </Box>
          </Box>
          {courses && user_type === 'teacher' && (
            <Box gridArea="slider1" as="section" pad="medium">
              <SliderRow
                responsiveSize={responsiveSize}
                headingLabel="Cursos Creados"
                cards={courses}
                toDashboard
              />
            </Box>
          )}
          {userTakenCourses && (
            <Box
              gridArea={user_type === 'teacher' ? 'slider2' : 'slider1'}
              as="section"
              pad="medium"
            >
              <SliderRow
                responsiveSize={responsiveSize}
                headingLabel="Cursos Tomados"
                cards={userTakenCourses}
              />
            </Box>
          )}
        </Grid>
        {user_type !== 'teacher' && (
          <Box margin={{ vertical: 'large' }}>
            <HighlightLink
              textLabel="¿Quieres enseñar lo que sabes?"
              anchorLabel="Regístrate como docente."
              anchorHref={`/users/${id}/account?at=${token}`}
              responsiveSize={responsiveSize}
            />
          </Box>
        )}
        {courses && user_type === 'teacher' && (
          <Box margin={{ vertical: 'large' }}>
            <HighlightLink
              textLabel="Revisa tus cursos en tu celular"
              anchorLabel="Descarga la App."
              anchorHref="/static/files/ManabuApp-57eefc76b47645228946e6be9fa0db25-signed.apk"
              download
              responsiveSize={responsiveSize}
            />
          </Box>
        )}
      </Box>
    );
  }
}

UserLayout.propTypes = {
  responsiveSize: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(PropTypes.any)
};

UserLayout.defaultProps = {
  userData: {}
};

export default UserLayout;
