import React from 'react';
import { Box, Image, Text, Anchor, Heading } from 'grommet';
import { UserManager } from 'grommet-icons';

const CourseRow = ({ name, user, href }) => {
  return (
    <Box
      as="div"
      elevation="medium"
      width="100%"
      direction="row"
      height="120px"
      margin={{ vertical: 'small' }}
    >
      <Box as="figure" maxWidth="130px" height="100%">
        <Image src="/static/images/courseThumbnail.png" fit="cover" />
      </Box>
      <Box as="div" pad="small" direction="column" justify="center">
        <Anchor href={href} label={<Heading level={3}>{name}</Heading>} />
        <Box direction="row" margin={{ vertical: 'xsmall' }}>
          <UserManager size="20px" />
          <Text margin={{ horizontal: 'small' }}>{user}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseRow;
