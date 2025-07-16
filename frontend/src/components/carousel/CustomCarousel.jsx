import Container from "react-bootstrap/esm/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FishCard from "../card/FishCard";
import "./carousel.css";
import LoadSpinner from "../LoadSpinner";
import LureCard from "../card/LureCard";

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

const CustomCarousel = ({ items, type, loading, preMessage, emptyMessage, query }) => {
   return (
      <Container
         fluid
         className={`${type}-carousel position-relative`}
         style={{ height: "175px" }}
      >
         {!items && 
            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                <p>{preMessage}</p>
            </div>
         }
         {(items && items.length === 0) && 
            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                <p>{emptyMessage}</p>
            </div>}
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
                  items.map((item) => {
                     if (type === "fish") {
                        return <FishCard
                           key={`item-${item.id}`}
                           fish={item}
                           inCarousel={true}
                           query={query}
                        />;
                     }
                     if (type === "lures") {
                        return <LureCard
                           key={`item-${item.id}`}
                           lure={item}
                           inCarousel={true}
                           query={query}
                        />;
                     }
                  })}
            </Carousel>
         )}
      </Container>
   );
};

export default CustomCarousel;
