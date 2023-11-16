
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="/images/banner.jpg"
        layout="fill"
        objectFit="cover"
        alt="Banner Image"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">Welcome to our store</p>
        <button className="text-purple-500 bg-white px-4 py-2 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
