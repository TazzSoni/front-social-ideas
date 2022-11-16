/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import NextImage from 'next/image';

export const Image = ({ useNextImage = false, alt, source, ...props }) => {
  if (useNextImage) {
    return <NextImage layout={'fill'} src={source} alt={alt} {...props} />;
  } else {
    return <img src={source} alt={alt} {...props} />;
  }
};

Image.propTypes = {
  alt: PropTypes.string,
  source: PropTypes.any,
  useNextImage: PropTypes.bool,
};
