import {Link} from '@shopify/hydrogen';
import heroVideo from '../../assets/videos/heroVideo.mp4';

export function Hero({height, top}) {
  return (
    <Link to={`/collections/all-merch`}>
      <section
        className={`rounded-b-[16px] md:rounded-b-[32px]  bg-black overflow-hidden relative justify-end flex flex-col w-full ${
          top && '-mt-nav'
        } ${
          height === 'full'
            ? 'h-screen'
            : 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]'
        }`}
      >
        <h1 className="absolute uppercase font-bold text-6xl md:text-8xl z-10 top-[15%] left-[5%]">
          New Drops
        </h1>
        <div className="video__warpper absolute inset-0 w-full h-full z-0 rounded-b-[16px] md:rounded-b-[32px] overflow-hidden">
          <video
            src={heroVideo}
            autoPlay
            loop
            playsInline
            muted
            className="w-full h-full object-cover object-center"
          ></video>
        </div>
      </section>
    </Link>
  );
}

// function SpreadMedia({data, loading, scale, sizes, width, widths}) {
//   if (data.mediaContentType === 'VIDEO') {
//     return (
//       <Video
//         previewImageOptions={{scale, src: data.previewImage.url}}
//         width={scale * width}
//         className="block object-cover w-full h-full"
//         data={data}
//         controls={false}
//         muted
//         loop
//         playsInline
//         autoPlay
//       />
//     );
//   }

//   if (data.mediaContentType === 'IMAGE') {
//     return (
//       <Image
//         widths={widths}
//         sizes={sizes}
//         alt={data.alt || 'Marketing Banner Image'}
//         className="block object-cover w-full h-full"
//         // @ts-ignore
//         data={data.image}
//         loading={loading}
//         width={width}
//         loaderOptions={{scale, crop: 'center'}}
//       />
//     );
//   }

//   return null;
// }
