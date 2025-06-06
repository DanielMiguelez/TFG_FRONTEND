import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Carousel.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const images = [
  require('../../media/istockphoto-697005428-612x612.jpg'),
  require('../../media/istockphoto-1286564398-612x612.jpg'),
  require('../../media/istockphoto-1370858758-612x612.jpg'),
];

export default function Carousel() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="w-full">
            <img 
            
              src={src} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-[50vh] object-cover rounded-lg" 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
