import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import "./Carousal.css"
   
function Carousal() {
  return (
    <Carousel className="carousel">
      
      <Carousel.Item className="carousel-item"> 
       <img  src="https://i.postimg.cc/rFt1MfB3/rgukt-logo.jpg" alt="Second slide" />
        
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <img  src="https://i.postimg.cc/Nj3PQyC7/vcsir.jpg" alt="First slide" />
        
      </Carousel.Item>
      
    </Carousel>
  );
}

export default Carousal;

