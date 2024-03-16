import axios from 'axios';
import { useState } from 'react';

const Upload = () => {

    const [squareImages, setSquareImages] = useState([]);
    const [threeImages, setThreeImages] = useState([]);
    const [nineImages, setNineImages] = useState([]);
    const [fullImages, setFullImages] = useState([]);
    const [fourImages, setFourImages] = useState([]);
    const [sixteenImages, setSixteenImages] = useState([]);
    const [antiFullImages, setAntiFullImages] = useState([]);


    // console.log("squareImages,", squareImages)
    // console.log("threeImages", threeImages)
    // console.log("nineImages", nineImages)
    // console.log("fullImages", fullImages)
    // console.log("fourImages", fourImages)
    // console.log("sixteenImages", sixteenImages)
    // console.log("antiFullImages", antiFullImages)


    const uploadToImgbb = async formData => {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_api}`, formData);
        const uploadedImageUrl = response.data.data.url;
        console.log('Uploaded image URL:', uploadedImageUrl);
        return uploadedImageUrl
    }

    async function getImageAspectRatio(imageFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const aspectRatio = img.width / img.height;
                    resolve(aspectRatio);
                };
                img.onerror = function (error) {
                    reject(error);
                };
                img.src = e.target.result;
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(imageFile);
        });
    }


    const uploadImagesAndGetUrls = async (imageArray, linksArray, dimension) => {
        for (let i = 0; i < imageArray.length; i++) {
            const aspectRatio = await getImageAspectRatio(imageArray[i].file);
            console.log('Aspect ratio:', aspectRatio);
            const formData = new FormData();
            formData.append('image', imageArray[i].file);
            const url = await uploadToImgbb(formData);
            linksArray.push(url);
        }
        console.log(`Uploaded ${dimension} images:`, linksArray);
    };
    const handleSubmit = async e => {
        e.preventDefault();
        const links = {
            "square": [],
            // vertical 
            "three": [],
            "nine": [],
            "full": [],
            // horizontal
            "four": [],
            "sixteen": [],
            "antiFull": [],

        }

        try {

            await uploadImagesAndGetUrls(squareImages, links.square, "square");
            await uploadImagesAndGetUrls(threeImages, links.three, "three");
            await uploadImagesAndGetUrls(nineImages, links.nine, "nine");
            await uploadImagesAndGetUrls(fullImages, links.full, "full");
            await uploadImagesAndGetUrls(fourImages, links.four, "four");
            await uploadImagesAndGetUrls(sixteenImages, links.sixteen, "sixteen");
            await uploadImagesAndGetUrls(antiFullImages, links.antiFull, "antiFull");

            axios.post("https://kitty-backend-5zkctsu2u-wannabepros-projects.vercel.app/links", { links })
                .then(response => {
                    console.log('Post successful');
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error posting data:', error);
                });
            // Optionally, you can clear the images state after successful upload
            // setImages([]);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleFileChange = async e => {
        const files = e.target.files;
        if (files) {
            const newSquareImages = [];
            const newThreeImages = [];
            const newNineImages = [];
            const newFullImages = [];
            const newFourImages = [];
            const newSixteenImages = [];
            const newAntiFullImages = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > 5 * 1024 * 1024) {
                    console.log(`File at index ${i} exceeds 5MB`);
                }
                const reader = new FileReader();
                reader.onload = async () => {
                    const aspectRatio = await getImageAspectRatio(file);
                    console.log('Aspect ratio:', aspectRatio);
                    const imageObj = { url: reader.result, file };

                    if (aspectRatio.toFixed(2) >= 2.0) {
                        newAntiFullImages.push(imageObj);
                    } else if (aspectRatio.toFixed(2) >= 1.7) {
                        newSixteenImages.push(imageObj);
                    } else if (aspectRatio.toFixed(2) >= 1.2) {
                        newFourImages.push(imageObj);
                    } else if (aspectRatio.toFixed(2) >= 0.9) {
                        newSquareImages.push(imageObj);
                    } else if (aspectRatio.toFixed(2) >= 0.7) {
                        newThreeImages.push(imageObj);
                    } else if (aspectRatio.toFixed(2) >= 0.5) {
                        newNineImages.push(imageObj);
                    } else {
                        newFullImages.push(imageObj);
                    }

                    if (i === files.length - 1) {
                        setSquareImages(newSquareImages);
                        setThreeImages(newThreeImages);
                        setNineImages(newNineImages);
                        setFullImages(newFullImages);
                        setFourImages(newFourImages);
                        setSixteenImages(newSixteenImages);
                        setAntiFullImages(newAntiFullImages);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };





    const handleRemoveSquareImage = index => {
        const newSquareImages = [...squareImages];
        newSquareImages.splice(index, 1);
        setSquareImages(newSquareImages);
    };

    const handleRemoveThreeImage = index => {
        const newThreeImages = [...threeImages];
        newThreeImages.splice(index, 1);
        setThreeImages(newThreeImages);
    };

    const handleRemoveNineImage = index => {
        const newNineImages = [...nineImages];
        newNineImages.splice(index, 1);
        setNineImages(newNineImages);
    };

    const handleRemoveFullImage = index => {
        const newFullImages = [...fullImages];
        newFullImages.splice(index, 1);
        setFullImages(newFullImages);
    };

    const handleRemoveFourImage = index => {
        const newFourImages = [...fourImages];
        newFourImages.splice(index, 1);
        setFourImages(newFourImages);
    };

    const handleRemoveSixteenImage = index => {
        const newSixteenImages = [...sixteenImages];
        newSixteenImages.splice(index, 1);
        setSixteenImages(newSixteenImages);
    };

    const handleRemoveAntiFullImage = index => {
        const newAntiFullImages = [...antiFullImages];
        newAntiFullImages.splice(index, 1);
        setAntiFullImages(newAntiFullImages);
    };


    return (
        <div className="mx-auto pt-10">
            <form className='flex flex-col items-center' onSubmit={handleSubmit}> {/* Use onSubmit instead of action */}
                <input type="file" className="file-input text-white file-input-bordered file-input-error w-full max-w-xs" onChange={handleFileChange} multiple />
                <br />
                <br />
                <div className='columns-3 md:columns-5 gap-2'>

                    {/* For square images */}
                    {squareImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 hover:bg-[#3333] rounded-full px-[4px] m-1 right-0' onClick={() => handleRemoveSquareImage(index)}>✕</button>
                        </div>
                    ))}

                    {/* For three images */}
                    {threeImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 hover:bg-[#3333] rounded-full px-[5px] m-1 right-0' onClick={() => handleRemoveThreeImage(index)}>✕</button>
                        </div>
                    ))}

                    {/* For nine images */}
                    {nineImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 hover:bg-[#3333] rounded-full px-[5px] m-1 right-0' onClick={() => handleRemoveNineImage(index)}>✕</button>
                        </div>
                    ))}

                    {/* For full images */}
                    {fullImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 hover:bg-[#3333] rounded-full px-[5px] m-1 right-0' onClick={() => handleRemoveFullImage(index)}>✕</button>
                        </div>
                    ))}

                    {/* For four images */}
                    {fourImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 hover:bg-[#3333] rounded-full px-[5px] m-1 right-0' onClick={() => handleRemoveFourImage(index)}>✕</button>
                        </div>
                    ))}

                    {/* For sixteen images */}
                    {sixteenImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 hover:bg-[#3333] rounded-full px-[5px] m-1 right-0' onClick={() => handleRemoveSixteenImage(index)}>✕</button>
                        </div>
                    ))}

                    {/* For anti-full images */}
                    {antiFullImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 hover:bg-[#3333] rounded-full px-[5px] m-1 right-0' onClick={() => handleRemoveAntiFullImage(index)}>✕</button>
                        </div>
                    ))}


                    {/* For square images
                    {squareImages.map((image, index) => (
                        <div key={index} className='relative w-fit my-2'>
                            <img src={image.url} className='rounded' alt={`Uploaded ${index}`} style={{ maxWidth: '100%' }} />
                            <button type="button" className='absolute top-0 bg-white rounded-full px-[5px] m-1 right-0' onClick={() => handleRemoveSquareImage(index)}>✕</button>
                        </div>
                    ))} */}

                </div>
                <br />
                {(
                    squareImages.length === 0 &&
                    threeImages.length === 0 &&
                    nineImages.length === 0 &&
                    fullImages.length === 0 &&
                    fourImages.length === 0 &&
                    sixteenImages.length === 0 &&
                    antiFullImages.length === 0) ?
                    < h1
                        className="btn btn-disable"
                    >
                        Add Some Image
                    </h1>
                    :
                    <>
                        {<button
                            type="submit"
                            className="btn btn-error"
                        >
                            Upload
                        </button>}
                    </>
                }

            </form>
        </div >
    );
};

export default Upload;
