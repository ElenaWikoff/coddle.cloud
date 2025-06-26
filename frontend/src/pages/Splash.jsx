import { Link } from "react-router";
import HeroBanner from "../components/herobanner/HeroBanner";
import PageContainer from "../components/PageContainer";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
      filename: "splash-bg-video.mp4",
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
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit.
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
                     Doloribus suscipit soluta aliquid temporibus vitae id
                     totam?
                  </p>
               </div>
               <Link className="cta" to="/fish-species">
                  See FishDB <BsArrowRight />
               </Link>
            </div>
            <div className="flex-item">
               <div className="content">
                  <h4>Find Nearby Fishing Spots</h4>
                  <p>
                     Ipsam autem alias voluptatibus esse officia, perferendis
                     illum corrupti cupiditate blanditiis vitae.
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
