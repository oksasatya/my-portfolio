import React from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

type ImagePopupProps = {
	images: string[];
	setIsOpen: (v: boolean) => void;
	photoIndex: number;
	setPhotoIndex: (i: number) => void;
};

const ImagePopup: React.FC<ImagePopupProps> = ({
	                                               images,
	                                               setIsOpen,
	                                               photoIndex,
	                                               setPhotoIndex,
                                               }) => {
	if (!images || images.length === 0) return null;
	
	const validIndex = ((photoIndex % images.length) + images.length) % images.length; // safe modulo
	
	return (
		<Lightbox
			mainSrc={images[validIndex]}
			nextSrc={images[(validIndex + 1) % images.length]}
			prevSrc={images[(validIndex + images.length - 1) % images.length]}
			onCloseRequest={() => setIsOpen(false)}
			onMovePrevRequest={() => setPhotoIndex((validIndex + images.length - 1) % images.length)}
			onMoveNextRequest={() => setPhotoIndex((validIndex + 1) % images.length)}
		/>
	);
};

export default ImagePopup;
