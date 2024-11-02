import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import RatingCard from './ratingCard';
const Rating = ({ ratings }) => {

    return (
        <div className='w-9/12 mx-auto my-5'>
            <hr className='text-[1px] text-richblack-600' />
            <h2 className='font-inter text-2xl text-center my-5 text-richblack-50'>Ratings from other students</h2>
            <div className='flex justify-center'>
                {
                    ratings?.length > 0 && <Swiper
                        slidesPerView={1}
                        spaceBetween={25}
                        loop={true}
                        modules={[FreeMode, Pagination]}
                        breakPoint={{
                            1024: {
                                slidesPerView: 3
                            },
                        }}
                    >
                        {
                            ratings?.map((rating) => (
                                <SwiperSlide>
                                    <RatingCard rating={rating}></RatingCard>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                }
            </div>
        </div>
    )
}
export default Rating