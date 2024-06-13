import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import "./Carousal.css"
   
function Carousal() {
  return (
    <Carousel className="carousel">
      <Carousel.Item className="carousel-item">
        <img  src="./Slide1.JPG" alt="First slide" />
        
      </Carousel.Item>
      <Carousel.Item className="carousel-item"> 
       <img  src="./Slide2.JPG" alt="Second slide" />
        
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img  src="./Slide3.JPG" alt="Third slide" />
        
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousal;

