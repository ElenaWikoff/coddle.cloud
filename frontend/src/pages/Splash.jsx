import { Link } from "react-router";
import HeroBanner from "../components/herobanner/HeroBanner";
import PageContainer from "../components/PageContainer";
import Container from "react-bootstrap/esm/Container";
import { BsArrowRight } from "react-icons/bs";
import { RiMapPinFill } from "react-icons/ri";

const splashHero = {
   title: "Welcome to Coddle.cloud",
   subtitle: "Your premiere spot for fishing locales.",
   buttons: [
      {
         label: "Find Fishing Spots Now",
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
                  <h4>Find Nearby Fishing Spots</h4>
                  <p>
                     From pond to pier, we've done the research for you. Find
                     your fishing oasis or plan your next fishing trip around
                     our curated location data.
                  </p>
               </div>
               <Link className="cta" to="/spots">
                  View Spots <BsArrowRight />
               </Link>
            </div>
            <div className="flex-item">
               <div className="content">
                  <h4>Learn About Local Fish Species</h4>
                  <p>
                     Use our Fish Database to learn everything you can about the
                     fish species on our world.
                  </p>
               </div>
               <Link className="cta" to="/fish-species">
                  See FishDB <BsArrowRight />
               </Link>
            </div>
            <div className="flex-item">
               <div className="content">
                  <h4>Get Lure Recommendation</h4>
                  <p>
                     Catching fish requires the best tools available. See what
                     lures are the best options for you when planning your next
                     outing at the docks.
                  </p>
               </div>
               <Link className="cta" to="/lures">
                  Learn More <BsArrowRight />
               </Link>
            </div>
         </Container>
      </PageContainer>
   );
};

export default Splash;
