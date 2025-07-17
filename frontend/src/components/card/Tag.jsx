import { Link, useLocation } from "react-router";
import { capitalizeEachWord, getDistribution } from "../../utils/functions";
import "./card.css";
import Button from "react-bootstrap/esm/Button";

const Tag = ({ label, type, onClick }) => {

    const getColor = () => {
        if (type === "type") {
            return "var(--brand-accentGold)";
        }

        if (type === "application") {
            return "var(--brand-primary)";
        }

        if (type === "lure-type") {
            return "coral";
        }

        if (type === "distribution") {
            if (getDistribution(label).toLowerCase().includes("ocean")) {
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
      <Button variant="btn-tag" onClick={onClick} className="tag" style={{background: `${getColor()}`}}>
         <span>{capitalizeEachWord((type === "distribution") ? getDistribution(label) : label)}</span>
      </Button>
   );
};

export default Tag;
