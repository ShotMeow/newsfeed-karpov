import React, { FC, ImgHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import './Image.css';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  skeleton?: boolean;
}

const Image: FC<Props> = ({ className, src = '', alt, onLoad, skeleton = false, ...restProps }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div
      className={classNames(
        'image',
        {
          'image--loaded': loaded,
          'skeleton-gradient': skeleton || (src.length > 0 && !loaded),
        },
        className
      )}
    >
      {src.length > 0 && (
        <img
          {...restProps}
          className="image__element"
          onLoad={(e) => {
            setLoaded(true);
            onLoad && onLoad(e);
          }}
          alt={alt}
          src={src}
        />
      )}
    </div>
  );
};

export default Image;
