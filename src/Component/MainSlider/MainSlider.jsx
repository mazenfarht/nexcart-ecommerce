import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    arrows: false, // ✅ إظهار الأسهم
    autoplay: true, // ✅ تشغيل أوتوماتيك
    autoplaySpeed: 2000, // ✅ كل 15 ثانية
    pauseOnHover: true, // (اختياري) يقف لما تقف بالماوس
  };

  return (
    <div className="container position-relative">
      <div className="my-2">
        <Slider {...settings}>
          <div>
            <img
              className="w-100 "
              style={{ borderRadius: "10px" }}
              src="https://a.nooncdn.com/assets/img-1440x1440/en_dk_eg-hero-01.1777558638.5957658.png?width=2400"
              alt="slider"
            />
          </div>

          <div>
            <img
              className="w-100"
              style={{ borderRadius: "10px" }}
              src="https://a.nooncdn.com/mpcms/EN0003/assets/ae827e5e-7632-40f3-946f-b4757781e477.png?width=2400"
              alt="slider"
            />
          </div>

          <div>
            <img
              className="w-100"
              style={{ borderRadius: "10px" }}
              src="https://a.nooncdn.com/mpcms/EN0003/assets/a9d6e5c7-ebe3-47dc-b136-c693664a3c07.png?width=2400"
              alt="slider"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
