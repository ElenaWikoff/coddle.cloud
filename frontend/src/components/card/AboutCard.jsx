import { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Placeholder } from 'react-bootstrap';
import { capitalizeEachWord } from "../../utils/functions.jsx";  // Ensure this function handles undefined or null
import "./card.css";

const AboutCard = ({ user, loading }) => {
  const [flipped, setFlipped] = useState(false);

  // Handle if user is null or undefined
  const userRole = user && user.role ? capitalizeEachWord(user.role) : "Unknown Role";  // Default to "Unknown Role" if undefined

  // Display avatar or default man/woman stock image depending on your name
  const getAvatar = (user) => {
  if (user?.avatar_url) return user.avatar_url;

  const name = user?.name?.toLowerCase();
  if (name == "elena wikoff" || name == "jane huynh") {
    return "/images/woman_stock_img.jpeg";
  }

  return "/images/man_stock_img.png";
  };

  return (
    <>
      {!loading && user ? (
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
                {/* Image background */}
                <img
                  src={getAvatar(user)}
                  alt={user.name}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Gradient + Text overlay */}
                <div className="card-text z-10">
                  <h3 className="text-xl font-semibold text-orange text-bottom mb-1 z-20">{user.name}</h3>
                  <p className="text-blue-300 font-medium z-20 text-bottom">{userRole}</p>
                </div>
              </div>
            </div>

            {/* Back of the card with details */}
            <div className="flip-card-back absolute w-full h-full backface-hidden bg-[#b0d6f5] rounded-lg shadow-lg rotate-y-180 text-gray-900">
              <div className="h-full p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <img
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-left">{user.name}</h3>
                    <p className="text-[#307eb1] text-sm font-medium text-left">{userRole}</p> {/* Display the sanitized role */}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex">
                    <p className="text-sm font-bold w-20 flex-shrink-0">Username:</p>
                    <p className="text-sm leading-relaxed flex-1">{user.username}</p>
                  </div>

                  <div className="flex">
                    <p className="text-sm font-bold w-32 flex-shrink-0">GitLab:</p>
                    <p className="text-sm leading-relaxed flex-1">
                      <a href={user.web_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {user.web_url}
                      </a>
                    </p>
                  </div>

                  <div className="flex">
                    <p className="text-sm font-bold w-32 flex-shrink-0">Commits:</p>
                    <p className="text-sm leading-relaxed flex-1">{user.commits}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card className="h-100">
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={6} />
              <Placeholder xs={8} />
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default AboutCard;
