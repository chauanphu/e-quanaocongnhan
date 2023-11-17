
import Image from 'next/image';

export default function Banner ({image}) {
  return (
    <>
      <Image
        src={image}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }} 
        alt={'Banner'} />
    </>
  );
};