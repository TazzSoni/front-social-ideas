import { Image } from './Image';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Components/Simple/Image',
  component: Image,
};

export const Default = args => <Image alt={'test'} {...args} />;

Default.args = {
  source:
    'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
};
