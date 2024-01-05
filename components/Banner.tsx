import Image from "next/image";
import MyCarousel from "./MyCarousel";

type BannerProps = {
  image: any;
  alt: string;
  isCarousel?: boolean;
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30
  }
}
export default function Banner({ image, alt, isCarousel }: BannerProps) {
  return (
    <>
      {isCarousel ? (
        <MyCarousel responsive={responsive} withDot={true}>
          {image.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt={alt}
              priority={false}
            />
          ))}
        </MyCarousel>
      ) : (
        <Image
          key={image}
          src={image}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt={alt}
          priority={false}
        />
      )}
    </>
  );
}
