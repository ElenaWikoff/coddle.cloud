import Container from "react-bootstrap/esm/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FishCard from "../card/FishCard";
import "./carousel.css";
import LoadSpinner from "../LoadSpinner";

const responsive = {
   superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 7,
      centerMode: false,
      infinite: false,
   },
   largeDesktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 6,
      centerMode: false,
      infinite: false,
   },
   desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      centerMode: false,
      infinite: false,
   },
   tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      centerMode: false,
      infinite: true,
   },
   mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      centerMode: true,
      partialVisible: true,
      infinite: true,
   },
};

const FishCarousel = ({ items, loading }) => {
   return (
      <Container
         fluid
         className="fish-carousel position-relative"
         style={{ height: "175px" }}
      >
         {!items && 
            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                <p>Click on spot to see fish species at location.</p>
            </div>
         }
         <LoadSpinner loading={loading} />
         {(!loading && items) && (
            <Carousel
                className="mx-auto"
               responsive={responsive}
               swipeable={true}
               draggable={true}
               removeArrowOnDeviceType={["tablet", "mobile"]}
               renderButtonGroupOutside={true}
               centerMode={true}
            >
               {items &&
                  items.map((fish) => {
                     return (
                        <FishCard
                           key={`fish-${fish.id}`}
                           fish={fish}
                           inCarousel={true}
                        />
                     );
                  })}
            </Carousel>
         )}
      </Container>
   );
};

export default FishCarousel;
