import { Link } from "react-router";
import HeroBanner from "../components/herobanner/HeroBanner";
import PageContainer from "../components/PageContainer";
import Container from "react-bootstrap/esm/Container";
import { RiMapPinFill } from "react-icons/ri";
import { IoFish } from "react-icons/io5";
import '../index.css';
import Button from "react-bootstrap/esm/Button";

const splashHero = {
   title: "Reel Spots in Real Time",
   subtitle: "Coddle.cloud",
   buttons: [
      {
         label: "Find Fishing Spots",
         href: "/spots",
         leadingIcon: <IoFish />,
         trailingIcon: <RiMapPinFill />, 
      },
   ],
   video: {
      filename: "coddle_reel.mp4",
      format: "mp4",
   },
};

const Splash = () => {
   return (
      <PageContainer>
         <HeroBanner
            title={splashHero.title}
            subtitle={splashHero.subtitle}
            buttons={splashHero.buttons}
            video={splashHero.video}
         />
         <Container fluid className="m-0 p-0 columns light">
            <Link to="/spots" className="flex-item-link">
               <div className="flex-item">
                  <div className="content">
                  <h6>Local</h6>
                  <h1>Locations</h1>
                  </div>
               </div>
            </Link>
            <Link to="/fish-species?page=1&limit=12" className="flex-item-link">
               <div className="flex-item">
                  <div className="content">
                  <h6>From FishBase</h6>
                  <h1>Species</h1>
                  </div>
               </div>
            </Link>
            <Link to="/lures?page=1&limit=12" className="flex-item-link">
               <div className="flex-item">
                  <div className="content">
                  <h6>The Latest</h6>
                  <h1>Lures</h1>
                  </div>
               </div>
            </Link>
         </Container>

         {/* Welcome to Fishing Club Section with Image */}
         <div className="welcome-section bg-light py-5">
            <Container>
               <div className="d-flex align-items-center justify-content-between">
                  <div className="image-container">
                     <img
                        src="\images\fish_hold.png"
                        alt="Fishing Club"
                        className="img-fluid rounded"
                     />
                  </div>
                  <div className="text-container ms-4">
                     <h3>Coddle's Mission Statment</h3>
                     <p className="lead">
                        Coddle is your all-in-one fishing guide, helping anglers discover top fishing spots, 
                        learn about fish species, and choose the best bait and lures—everything you need to 
                        fish smarter, explore more, and catch better, all in one place.
                     </p>
                     <Button as={Link} to="/about">
                        Learn More About Us
                     </Button>
                  </div>
               </div>
            </Container>
         </div>
      </PageContainer>
   );
};

export default Splash;
