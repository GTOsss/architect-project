import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Button from './button';

const stories = storiesOf('button', module).addDecorator(centered);

stories.add('default', () => {

  return <Button />;
});
