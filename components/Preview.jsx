import { useEffect, useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { imageMap, interiorMap } from "@/lib/imageMap";
import "react-medium-image-zoom/dist/styles.css";

function Preview({ exterior, wheel, interior }) {
  const [loaded, setLoaded] = useState(false);

  const exteriorImage = imageMap[exterior]?.wheels[wheel];
  const interiorImage = interiorMap[interior];

  // Only set loaded to true once the images are available
  useEffect(() => {
    if (exteriorImage && interiorImage) {
      setLoaded(true);
    }
  }, [exteriorImage, interiorImage]);

  if (!loaded) return null; // Prevent rendering until data is ready

  return (
    <>
      {/* Exterior Image */}
      <Zoom>
        <Image
          src={exteriorImage}
          alt={`${exterior} - ${wheel}`}
          width={0}
          height={0}
          sizes="100%"
          className="h-96 w-full rounded-lg object-cover sm:h-[500px]"
        />
      </Zoom>

      {/* Exterior Description */}
      <section className="my-4 pl-2">
        <h3 className="text-2xl font-bold">
          {exterior}: {imageMap[exterior]?.finish} w/ {wheel}
        </h3>
        <p>{imageMap[exterior]?.description}</p>
      </section>

      {/* Interior Image */}
      <Zoom>
        <Image
          src={interiorImage}
          alt={`${interior} Interior`}
          width={0}
          height={0}
          sizes="100%"
          className="h-96 w-full rounded-lg object-cover sm:h-[500px]"
        />
      </Zoom>

      <section className="mt-4 pl-2">
        <h3 className="text-xl font-bold">Interior {interior}</h3>
      </section>
    </>
  );
}

export default Preview;
