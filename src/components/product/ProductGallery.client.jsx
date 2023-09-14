import {MediaFile} from '@shopify/hydrogen/client';
import {ATTR_LOADING_EAGER} from '~/lib/const';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */

const getClasses = (l) => {
  // return l.toString() === '4'
  //   ? 'columns-4 md:columns-2 gap-2'
  //   : 'columns-5 md:columns-2 gap-2';

  const lStr = l.toString();
  switch (lStr) {
    case '1':
      return `columns-1 w-full`;
    case '2':
      return `columns-2 md:columns-1 gap-2 `;
    case '3':
      return `columns-3 md:columns-1 gap-2 `;
    case '4':
    case '5':
      return `columns-${lStr} md:columns-2 gap-2`;
    default:
      return '';
  }
};
export function ProductGallery({media, className, item}) {
  if (!media.length) {
    return null;
  }

  return (
    //swimlane md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className} gap-2
    <div
      className={`swimlane md:grid-flow-row hiddenScroll md:p-0 overflow-x-auto md:grid-rows-auto ${className} md:justify-center`}
    >
      <div className={getClasses(media.length)}>
        {media.map((med, i) => {
          let mediaProps = {};
          // const isFirst = i === 0;
          // const isFourth = i === 3;
          const isInFirst = i < 2;
          const isFullWidth = media.length === 1;
          med.image.height = 1000;
          med.image.width = 1000;
          const data = {
            ...med,
            image: {
              // @ts-ignore
              ...med.image,
              altText: med.alt || 'Product image',
            },
          };

          switch (med.mediaContentType) {
            case 'IMAGE':
              mediaProps = {
                width: 800,
                widths: [400, 800, 1200, 1600, 2000, 2400],
              };
              break;
            case 'VIDEO':
              mediaProps = {
                width: '100%',
                autoPlay: true,
                controls: false,
                muted: true,
                loop: true,
                preload: 'auto',
              };
              break;
            case 'EXTERNAL_VIDEO':
              mediaProps = {width: '100%'};
              break;
            case 'MODEL_3D':
              mediaProps = {
                width: '100%',
                interactionPromptThreshold: '0',
                ar: true,
                loading: ATTR_LOADING_EAGER,
                disableZoom: true,
              };
              break;
          }

          if (i === 0 && med.mediaContentType === 'IMAGE') {
            mediaProps.loading = ATTR_LOADING_EAGER;
          }

          const style = [
            isFullWidth ? 'w-[90vw] md:w-full' : 'w-[82vw] md:w-full',
            isInFirst ? ' h-[400px] ' : 'h-[400px] md:h-[550px] ',
            ' card-image rounded-[16px]',
          ].join(' ');

          return (
            <div
              className={style}
              // @ts-ignore
              key={med.id || med.image.id}
            >
              <MediaFile
                tabIndex="0"
                className={`fadeIn h-full w-full object-cover object-center rounded-[16px]`}
                data={data}
                sizes={
                  isFullWidth
                    ? '(min-width: 64em) 60vw, (min-width: 48em) 50vw, 90vw'
                    : '(min-width: 64em) 30vw, (min-width: 48em) 25vw, 90vw'
                }
                // @ts-ignore
                options={{
                  crop: 'center',
                  scale: 1,
                }}
                {...mediaProps}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
