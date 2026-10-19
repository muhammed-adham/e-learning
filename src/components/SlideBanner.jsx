import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../styles/components/slidebanner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import BtnPrimary from "./BtnPrimary";

const SlideBanner = ({}) => {
  const defaultSlides = [
    {
      id: 1,
      image: "https://picsum.photos/id/1015/1600/600",
      title: "Learn Anything, Anytime",
      subtitle: "Hundreds of courses taught by expert instructors.",
      buttonText: "Browse Courses",
      buttonLink: "/courses",
    },
    {
      id: 2,
      image: "https://picsum.photos/id/1018/1600/600",
      title: "Grow Your Career",
      subtitle: "Earn certificates that employers recognize.",
      buttonText: "Get Started",
      buttonLink: "/signup",
    },
    {
      id: 3,
      image: "https://picsum.photos/id/1025/1600/600",
      title: "Study at Your Own Pace",
      subtitle: "Lifetime access on mobile and desktop.",
      buttonText: "Learn More",
      buttonLink: "/about",
    },
  ];

  return (
    <>
      <div className="container-inline">
        <div className="banner-slider">
          <Swiper
            // Swiper configuration
            modules={[
              Autoplay,
              Navigation,
              Pagination,
              EffectFade,
              Keyboard,
              A11y,
            ]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={defaultSlides.length > 1}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            grabCursor
            className="banner-swiper"
          >
            {/* Slider Content Start */}
            {defaultSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="banner-slide"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="banner-overlay" />
                  <div className="banner-content">
                    {slide.title && <h2>{slide.title}</h2>}
                    {slide.subtitle && <p>{slide.subtitle}</p>}
                    {slide.buttonText && (
                      <BtnPrimary
                        buttonText={slide.buttonText}
                        buttonLink={slide.buttonLink}
                      />
                    )}
                  </div>
                </div>
                {/* Slider Content End */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SlideBanner;
