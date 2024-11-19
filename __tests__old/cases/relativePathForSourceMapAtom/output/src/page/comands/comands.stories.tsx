import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Comands from './comands';

const stories = storiesOf('comands', module).addDecorator(centered);

stories.add('default', () => {

  return <Comands />;
});
