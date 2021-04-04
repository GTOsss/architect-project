import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Stadiums from './stadiums';

const stories = storiesOf('stadiums', module).addDecorator(centered);

stories.add('default', () => {

  return <Stadiums />;
});
