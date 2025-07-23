import { Link } from "react-router";
import HeroBanner from "../components/herobanner/HeroBanner";
import PageContainer from "../components/PageContainer";
import Container from "react-bootstrap/esm/Container";
import { BsArrowRight } from "react-icons/bs";
import { RiMapPinFill } from "react-icons/ri";
import '../index.css';

const splashHero = {
   title: "Reel Spots in Real Time",
   subtitle: "Coddle.cloud",
   buttons: [
      {
         label: "🎣Find Spots",
         href: "/spots",
         leadingIcon: null,
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
            <div className="flex-item">
               <div className="content">
                  <h6>Texas</h6>
                  <h2>Locations</h2>
               </div>
               <Link className="cta" to="/spots">
                  View Spots <BsArrowRight />
               </Link>
            </div>
            <div className="flex-item">
               <div className="content">
                  <h6>From FishBase</h6>
                  <h2>Species</h2>
               </div>
               <Link className="cta" to="/fish-species">
                  See Species <BsArrowRight />
               </Link>
            </div>
            <div className="flex-item">
               <div className="content">
                  <h4>Get Lure Recommendations</h4>
                  <p>
                     Catching fish requires the best tools available. See what
                     lures are the best options for you when planning your next
                     outing at the docks.
                  </p>
               </div>
               <Link className="cta" to="/lures">
                  Check Baits <BsArrowRight />
               </Link>
            </div>
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
                     <Link to="/about" className="btn btn-primary mt-3">
                        Learn More About Us
                     </Link>
                  </div>
               </div>
            </Container>
         </div>
      </PageContainer>
   );
};

export default Splash;
