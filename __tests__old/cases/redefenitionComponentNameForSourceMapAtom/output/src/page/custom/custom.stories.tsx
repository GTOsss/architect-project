import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Custom from './custom';

const stories = storiesOf('custom', module).addDecorator(centered);

stories.add('default', () => {

  return <Custom />;
});
