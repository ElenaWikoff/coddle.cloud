import { useState } from "react";
import Card from "react-bootstrap/Card";
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
         className="flip-card group h-96 w-full perspective-1000"
         onMouseEnter={() => setFlipped(true)}
         onMouseLeave={() => setFlipped(false)}
      >
         <div
            className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
               flipped ? "rotate-y-180" : ""
            }`}
         >
            {/* Front of the card with image */}
            <div className="flip-card-front absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
               <div className="relative w-full h-full z-0">
                  <img
                     src={getAvatar(user)}
                     alt={user.name}
                     className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="card-text z-10 font-sans">
                     <h3 className="text-xl font-semibold text-orange mb-1 z-20">
                        {user.name}
                     </h3>
                     <p className="text-blue-300 font-medium z-20">
                        {userRole}
                     </p>
                  </div>
               </div>
            </div>

            {/* Back of the card with details */}
            <div className="flip-card-back absolute w-full h-full backface-hidden bg-[#307eb1] rounded-lg shadow-lg rotate-y-180 text-black overflow-auto">
               <div className="h-full p-4 flex flex-col space-y-3">
                  {/* Top Section with Image, Name, and Role */}
                  <div className="flex items-center">
                     <img
                        src={getAvatar(user)}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-black mr-3"
                     />
                     <div>
                        <h3 className="text-base font-bold">{user.name}</h3>
                        <p className="text-sm">{userRole}</p>
                     </div>
                  </div>

                  {/* Bio */}
                  <div className="text-sm">
                     <span className="font-bold">Bio: </span>
                     <span className="font-normal">{user.bio}</span>
                  </div>

                  {/* Responsibilities */}
                  <div className="text-sm">
                     <span className="font-bold">Responsibilities: </span>
                     <span className="font-normal">
                        {user.responsibilities}
                     </span>
                  </div>

                  {/* GitLab URL */}
                  <div className="text-sm break-words">
                     <span className="font-bold">GitLab: </span>
                     {!loading && gitlab ? (
                        <a
                           href={gitlab.web_url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="underline text-black hover:text-yellow-100"
                        >
                           {gitlab.web_url}
                        </a>
                     ) : "Loading..."}
                  </div>

                  {/* Commits */}
                  <div className="text-sm">
                     <span className="font-bold">Commits: </span>
                     <span className="font-normal">
                        {!loading && gitlab ? gitlab.commits : "Loading..."}
                     </span>
                  </div>

                  {/* LinkedIn URL */}
                  {user.linkedin && (
                     <div className="text-sm break-words">
                        <span className="font-bold">LinkedIn: </span>
                        <a
                           href={user.linkedin}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="underline text-black hover:text-yellow-100"
                        >
                           {user.linkedin}
                        </a>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutCard;
