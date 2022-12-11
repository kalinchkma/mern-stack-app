/**
 * Title: Banner slider component
 */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./slider.style.css";


// next arrow icon
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          width: "40px",
          zIndex: 999,
          border: "1px solid #fff",
          background: "rgb(255 217 217 / 11%)"
        }}
        onClick={onClick}
      ></div>
    );
  }

// prevesous arrow icon
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          width: "40px",
          zIndex: 999,
          border: "1px solid #fff",
          background: "rgb(255 217 217 / 11%)"
          }}
        onClick={onClick}
      ></div>
    );
  }



const SliderSystem = ({children, itemToShow,dot,...props}) => {

    // slider settings
const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "50px",
  slidesToShow: itemToShow,
  slidesToScroll: 1,
  prevArrow: <PrevArrow  />,
  nextArrow: <NextArrow  />,
  dots: dot,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 1500,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
}
  return (
        <Slider  {...settings}>
              {
                children
              }
        </Slider>
    );
}


export default SliderSystem;
