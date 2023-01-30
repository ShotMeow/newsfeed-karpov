import React, { CSSProperties, FC, ImgHTMLAttributes, useMemo, useState } from 'react';
import classNames from 'classnames';

import './Image.css';
import { TArticleImage, TExtendedImage } from '@features/articleItem/types';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  skeleton?: boolean;
  data?: TExtendedImage;
  maxWidth?: number;
  autoHeight?: boolean;
}

type TExtendedVariant = TArticleImage & {
  media?: string;
};

const Image: FC<Props> = ({
  className,
  data,
  src,
  alt,
  onLoad,
  skeleton = false,
  autoHeight = false,
  maxWidth = Number.POSITIVE_INFINITY,
  ...restProps
}) => {
  const [loaded, setLoaded] = useState(false);

  const hasImage = (src && src.length > 0) || (data && data.source?.length > 0);

  const variants: TExtendedVariant[] = useMemo(() => {
    if (!data) {
      return [];
    }
    const variants = data.variants.concat([]).filter((v) => v.width <= maxWidth);
    variants.sort((a, b) => {
      if (a.width === b.width) {
        return a.format < b.format ? 1 : -1;
      }
      return a.width - b.width;
    });
    const lastType = variants.length && variants[variants.length - 1].type;
    return variants.map<TExtendedVariant>((v) => {
      return {
        ...v,
        media: v.type === lastType ? 'all' : `(max-width: ${v.width}px)`,
      };
    });
  }, [data, maxWidth]);

  const mainSrc = useMemo(() => {
    if (src) {
      return src;
    }

    if (variants?.length) {
      const originalJpeg = variants.find((v) => v.type === 'original' && v.format === 'jpeg');
      if (originalJpeg) {
        return originalJpeg.url;
      }

      return variants[variants.length - 1].url;
    }
    return data?.source;
  }, [src, data?.source, variants]);

  const style = useMemo(() => {
    const style: Record<string, CSSProperties> = {};
    if (data?.stripped) {
      style['backgroundImage'] = `url(${data.stripped.url})` as React.CSSProperties;
    }
    if (autoHeight && variants?.length) {
      const wh = (variants[0].height * 100) / variants[0].width;
      style['--image-container-height'] = (wh + 'vw') as React.CSSProperties;
    }
    return style;
  }, [data]);

  return (
    <div
      style={style}
      className={classNames(
        'image',
        {
          'image--bg': !!style.backgroundImage,
          'image--loaded': loaded,
          'skeleton-gradient': !style.backgroundImage && (skeleton || (hasImage && !loaded)),
        },
        className
      )}
    >
      {hasImage && (
        <picture>
          {variants.map((variant, index) => {
            return <source key={index} srcSet={variant.url} type={'image/' + variant.format} media={variant.media} />;
          })}
          {
            <img
              {...restProps}
              className="image__element"
              onLoad={(e) => {
                setLoaded(true);
                onLoad && onLoad(e);
              }}
              alt={alt}
              src={mainSrc}
            />
          }
        </picture>
      )}
    </div>
  );
};

export default Image;
