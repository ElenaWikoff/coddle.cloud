import { useState } from "react";
import { Mail, Linkedin, GitBranch } from "lucide-react";
import { Placeholder } from "react-bootstrap";
import { capitalizeEachWord } from "../../utils/functions.jsx"; // Ensure this function handles undefined or null
import "./card.css";

const AboutCard = ({ user, gitlab, loading }) => {
   const [flipped, setFlipped] = useState(false);

   const userRole = user?.role ? capitalizeEachWord(user.role) : "Unknown Role";

   // Get the avatar for the user
   const getAvatar = (user) => {
      return user?.avatar_url || "/images/default_avatar.png";
   };

   return (
      <div
         className="flip-card"
         onMouseEnter={() => setFlipped(true)}
         onMouseLeave={() => setFlipped(false)}
      >
         <div
            className={`flip-card-inner ${flipped ? "rotate-y-180" : ""}`}
         >
            {/* Front of the card with image */}
            <div className="flip-card-front">
               <div className="relative w-full h-full">
                  <img
                     src={getAvatar(user)}
                     alt={user.name}
                     className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="front-header">
                     <h3>{user.name}</h3>
                     <p>{userRole}</p>
                  </div>
               </div>
            </div>

            {/* Back of the card with details */}
            <div className="flip-card-back">
               <div className="top-section">
                  <img
                     src={getAvatar(user)}
                     alt={user.name}
                     className="w-14 h-14 rounded-full object-cover border-2 border-black mr-3"
                  />
                  <div>
                     <h3>{user.name}</h3>
                     <p>{userRole}</p>
                  </div>
               </div>

               {/* Bio */}
               <div className="text-section">
                  <span className="font-bold">Bio: </span>
                  <span>{user.bio}</span>
               </div>

               {/* Responsibilities */}
               <div className="text-section">
                  <span className="font-bold">Responsibilities: </span>
                  <span>{user.responsibilities}</span>
               </div>

               {/* Stats Section */}
               <div className="stats-section">
                  <p className="stats-title">Stats:</p>
                  <div className="stats-container">
                     <div className="stat-card">
                        <div className="stat-value">{!loading && gitlab ? gitlab.commits : "Loading..."}</div>
                        <div className="stat-label">Commits</div>
                     </div>
                     <div className="stat-card">
                        <div className="stat-value">{!loading && gitlab ? gitlab.issues : "Loading..."}</div>
                        <div className="stat-label">Issues</div>
                     </div>
                     <div className="stat-card">
                        <div className="stat-value">{!loading && gitlab ? gitlab.unitTests : "Loading..."}</div>
                        <div className="stat-label">Unit Tests</div>
                     </div>
                  </div>
               </div>

               {/* Social Media Icons */}
               <div className="social-icons">
                  <a
                     href={`mailto:${user.email}`}
                     aria-label="Send email"
                  >
                     <Mail className="icon" />
                  </a>

                  {/* LinkedIn Icon only, no description */}
                  {user.linkedin && (
                     <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className="social-icon-circle"
                     >
                        <Linkedin className="icon" />
                     </a>
                  )}

                  {/* GitLab Icon */}
                  {gitlab && (
                     <a
                        href={gitlab.web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitLab profile"
                        className="social-icon-circle"
                     >
                        <GitBranch className="icon" />
                     </a>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutCard;
