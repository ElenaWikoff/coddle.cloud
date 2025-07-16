import { capitalizeEachWord } from "../../utils/functions";
import "./card.css";

const Tag = ({ label, type }) => {

    const getColor = () => {
        if (type === "type") {
            return "var(--brand-accentGold)";
        }

        if (type === "distribution") {
            if (label.toLowerCase().includes("ocean")) {
                return "#0981D1";
            } else {
                return "#61934e";
            }
        }

        switch (label) {
            case "freshwater": return "var(--brand-secondary)";
            case "marine": return "var(--brand-primaryLight)";
            case "anadromous": return "linear-gradient(to right, var(--brand-primaryLight) , var(--brand-secondary))";
            default: return "var(--brand-secondarySlate)";
        };
    }

   return (
      <div className="tag" style={{background: `${getColor()}`}}>
         <span>{capitalizeEachWord(label)}</span>
      </div>
   );
};

export default Tag;
