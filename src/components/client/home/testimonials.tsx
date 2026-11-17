"use client";

import { Star, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { PlatformReview } from "@/types/platform-review.interface";
import "swiper/css";
import "swiper/css/pagination";

function reviewName(review: PlatformReview) {
  return [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ");
}

export default function Testimonials({ reviews }: { reviews: PlatformReview[] | null }) {
  const slides = reviews ?? [];

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#E5E5E5] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1527] tracking-tight">
            What Users Say
          </h2>
        </div>

        {reviews === null ? (
          <p className="text-center text-sm text-slate-600">Reviews could not be loaded.</p>
        ) : slides.length === 0 ? (
          <p className="text-center text-sm text-slate-600">No reviews yet.</p>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={slides.length > 3}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "inline-block w-2 h-2 rounded-full bg-slate-400 mx-1 cursor-pointer transition-all duration-300 opacity-60",
              bulletActiveClass: "!w-6 !bg-[#00BC7D] !opacity-100",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="!pb-12"
          >
            {slides.map((review) => {
              const name = reviewName(review) || "Customer";
              const stars = Math.min(5, Math.max(0, review.rating));

              return (
                <SwiperSlide key={review._id} className="h-auto">
                  <div className="bg-[#DFE1E2] rounded-2xl p-6 sm:p-7 border border-[#DADDE0] flex flex-col justify-between h-full min-h-[165px] transition-shadow duration-300 hover:shadow-md">
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed italic">
                      &quot;{review.message}&quot;
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-300 shrink-0 flex items-center justify-center text-slate-600">
                          <User className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug truncate">
                          {name}
                        </h4>
                      </div>

                      <div
                        className="flex items-center gap-0.5 shrink-0 text-[#E8921B]"
                        aria-label={`${stars} out of 5`}
                      >
                        {Array.from({ length: stars }, (_, index) => (
                          <Star
                            key={index}
                            className="w-3.5 h-3.5 fill-[#E8921B] stroke-[#E8921B]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
