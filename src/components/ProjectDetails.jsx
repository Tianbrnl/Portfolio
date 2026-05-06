import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  images = [],
  tags,
  closeModal,
}) => {
  const imageList = Array.isArray(image) ? image : [image].filter(Boolean);
  const galleryImages = images.length > 0 ? images : imageList;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = galleryImages[currentImageIndex] || image;
  const hasMultipleImages = galleryImages.length > 1;

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [image, images]);

  const showPreviousImage = () => {
    setCurrentImageIndex((index) =>
      index === 0 ? galleryImages.length - 1 : index - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((index) =>
      index === galleryImages.length - 1 ? 0 : index + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="relative w-[min(42rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] overflow-y-auto border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute z-30 p-2 rounded-sm cursor-pointer top-4 right-4 bg-midnight/80 hover:bg-gray-500"
          aria-label="Close project details"
        >
          <img src="/assets/close.svg" alt="Close" className="w-6 h-6" />
        </button>
        <div className="relative overflow-hidden rounded-t-2xl bg-primary">
          <img
            src={currentImage}
            alt={`${title} screenshot ${currentImageIndex + 1}`}
            className="w-full object-cover aspect-video"
          />

          {hasMultipleImages && (
            <>
              <button
                onClick={showPreviousImage}
                className="absolute flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full cursor-pointer left-4 top-1/2 bg-midnight/80 hover:bg-gray-500"
                aria-label="Previous project image"
              >
                <img
                  src="/assets/arrow-right.svg"
                  alt=""
                  className="w-5 rotate-180"
                />
              </button>
              <button
                onClick={showNextImage}
                className="absolute flex items-center justify-center w-10 h-10 -translate-y-1/2 rounded-full cursor-pointer right-4 top-1/2 bg-midnight/80 hover:bg-gray-500"
                aria-label="Next project image"
              >
                <img src="/assets/arrow-right.svg" alt="" className="w-5" />
              </button>
              <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
                {galleryImages.map((projectImage, index) => (
                  <button
                    key={projectImage}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "w-6 bg-white"
                        : "w-2 bg-white/50"
                    }`}
                    aria-label={`Show project image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 font-normal text-neutral-400">
              {subDesc}
            </p>
          ))}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-10 hover-animation"
                />
              ))}
            </div>
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
