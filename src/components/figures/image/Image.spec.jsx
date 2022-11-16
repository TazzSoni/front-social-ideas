import { render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('<Image />', () => {
  it('renders the component', () => {
    render(<Image alt={'test-image'}/>);

    expect(screen.getByAltText('test-image')).toBeInTheDocument();
  });
});
