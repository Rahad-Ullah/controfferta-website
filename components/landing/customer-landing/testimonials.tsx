"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Review {
  text: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    text: `"I submitted a request for solar panel installation and got multiple offers within a day. It was super easy and convenient."`,
    author: "Marco Ferretti",
    role: "Ferretti Windows Ltd",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=95",
    rating: 5,
  },
  {
    text: `"Great platform! I found a reliable contractor for my renovation project without any hassle."`,
    author: "Giulia Romano",
    role: "Romano Solar",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=95",
    rating: 5,
  },
  {
    text: `"The process was simple and clear. I received professional offers and chose the best one for my needs."`,
    author: "Alessandro Conti",
    role: "Conti Constructions",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=95",
    rating: 5,
  },
  {
    text: `"Outstanding service! Within hours I was connected with certified technicians who provided clear and competitive estimates."`,
    author: "Elena Bianchi",
    role: "Studio Architettura",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=95",
    rating: 5,
  },
  {
    text: `"We were able to compare multiple quotes without any phone spam. Selected the best company and the job was completed in time."`,
    author: "Matteo Rossi",
    role: "Rossi Impianti",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=95",
    rating: 5,
  },
  {
    text: `"Very transparent platform with real verified professionals. Saved me days of searching and calling different contractors."`,
    author: "Sofia De Luca",
    role: "De Luca Interiors",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=95",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#E5E5E5] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1527] tracking-tight">
            What Users Say
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: "inline-block w-2 h-2 rounded-full bg-slate-400 mx-1 cursor-pointer transition-all duration-300 opacity-60",
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
          {REVIEWS.map((rev, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <div className="bg-[#DFE1E2] rounded-2xl p-6 sm:p-7 border border-[#DADDE0] flex flex-col justify-between h-full min-h-[165px] transition-shadow duration-300 hover:shadow-md">
                {/* Quote Text */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed italic">
                  {rev.text}
                </p>

                {/* Bottom Row: User Info + Stars */}
                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-slate-300 shrink-0">
                      <Image
                        src={rev.avatar}
                        alt={rev.author}
                        fill
                        quality={95}
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug truncate">
                        {rev.author}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-none mt-0.5 truncate">
                        {rev.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 shrink-0 text-[#E8921B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#E8921B] stroke-[#E8921B]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
