/**
 * Title: Banner slider component
 */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./slider.style.css";

// mui styles importss

import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

// next arrow icon
const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
         
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          width: "40px",
          zIndex: 999,
          background: "rgb(255 217 217 / 0%)",
          color: "#fff"
        }}
        onClick={onClick}
      >
          <RedoIcon />
      </div>
    );
  }

// prevesous arrow icon
const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
          width: "40px",
          zIndex: 999,
          background: "rgb(255 217 217 / 0%)",
          color: "#fff"
          }}
        onClick={onClick}
      >
         <UndoIcon />
      </div>
    );
  }



const SliderSystem = ({children, itemToShow,dot,...props}) => {

    // slider settings
const settings = {
  infinite: true,
  slidesToShow: itemToShow,
  slidesToScroll: 1,
  prevArrow: <PrevArrow  />,
  nextArrow: <NextArrow  />,
  arrows: false,
  dots: dot,
  autoplay: true,
  speed: 600,
  autoplaySpeed: 4000,
  cssEase: "linear",
  pauseOnHover: true,
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
