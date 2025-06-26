import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import "./herobanner.css";

const HeroBanner = ({ title, subtitle, buttons, video }) => {
   const navigate = useNavigate();

   return (
      <section className="hero-banner">
         {title && <h2>{title}</h2>}
         {subtitle && <h3>{subtitle}</h3>}
         <div className="d-flex g-2">
            {buttons &&
               buttons.map((btn, idx) => {
                  return (
                     <Button
                        key={`btn-${idx}`}
                        variant="hero"
                        onClick={() => navigate(btn.href)}
                        className="d-flex g-2 align-items-center"
                     >
                        <span className="icon">{btn.leadingIcon}</span>
                        <span className="label mx-2">{btn.label}</span>
                        <span className="icon">{btn.trailingIcon}</span>
                     </Button>
                  );
               })}
         </div>
         {video && (
            <video>
               <source
                  autoPlay
                  muted
                  src={`/videos/${video.filename}`}
                  type={`video/${video.format}`}
               />
            </video>
         )}
      </section>
   );
};

export default HeroBanner;
