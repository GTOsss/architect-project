import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Clubs from './clubs';

const stories = storiesOf('clubs', module).addDecorator(centered);

stories.add('default', () => {

  return <Clubs />;
});
