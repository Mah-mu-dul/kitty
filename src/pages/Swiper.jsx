import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';


function SwiperPage() {


    const [images, setImages] = useState([
        {
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
    ])
    useEffect(() => {
        fetch('https://kitty-backend-5zkctsu2u-wannabepros-projects.vercel.app/images')
            .then(res => res.json())
            .then(data => data ? setImages(data) : "")

        console.log(images[0]);
    }, [])


    const handleImgClick = (e) => {

        console.log("clicked", e);
    }
    return (
        <div className="container mx-auto">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container w-[80%] mx-auto"
            >

                {
                    images[0]?.sixteen?.slice(images[0]?.sixteen?.length ? images[0]?.sixteen?.length - 6 : 0, images[0]?.sixteen?.length)?.map((image, index) => (
                        <SwiperSlide
                            className='w-fit '
                            key={index}>
                            <img onClick={() => handleImgClick(index)} className='rounded w-96 cover max-h-screen mx-auto' src={image} alt={`Image ${index}`} />
                        </SwiperSlide>
                    )
                    )}
                <div className="slider-controler">
                    <div >
                        <FaChevronLeft className="w-4 text-rose-600 swiper-button-prev slider-arrow" />
                    </div>
                    <div >
                        <FaChevronRight className="w-4 text-rose-600 swiper-button-next slider-arrow" />
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>


            <div className="cursor-pointer h-96 carousel carousel-vertical rounded-box">

                {images[0]?.three?.map((image, index) => <>
                    < div key={index} className="carousel-item mx-auto">
                        <img src={image} className="rounded-box h-96" />
                    </div>
                </>)}
                <div className="carousel-item mx-auto rounded">
                    <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
                </div>
                <div className="carousel-item mx-auto rounded">
                    <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" />
                </div>
            </div>
        </div >
    );
}

export default SwiperPage;

