import { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Placeholder } from 'react-bootstrap';
import { capitalizeEachWord } from "../../utils/functions.jsx";  // Ensure this function handles undefined or null
import "./card.css";

const AboutCard = ({ user, loading }) => {
  const [flipped, setFlipped] = useState(false);

  const users = [
    {
      name: "Elena Wikoff",
      role: "Team Lead, Frontend Engineer",
      avatar_url: "/images/elena_pic.png",
      bio: "CS Major Senior at UT Austin",
      responsibilities: "Team Leader, UI/UX Design, and Frontend Developer",
      email: "elenawikoff@utexas.edu",
      linkedin: "https://www.linkedin.com/in/elena-wikoff",
    },
    {
      name: "Jane Huynh",
      role: "Backend Engineer",
      avatar_url: "/images/jane_pic.jpg",
      bio: "MSIS Data Science at UT Austin, AI Product Manager & Data Scientist",
      responsibilities: "Backend engineer & db designer, namecheap host and API design",
      email: "janehuynh@utexas.edu",
      linkedin: "https://www.linkedin.com/in/jane-huynh",
    },
    {
      name: "Perry Ehimuh",
      role: "Frontend Engineer",
      avatar_url: "/images/perry_pic.jpg",
      bio: "CS Major Senior at UT Austin",
      responsibilities: "UI/UX Design, and Frontend Developer",
      email: "perryehimuh@gmail.com",
      linkedin: "https://www.linkedin.com/in/perry-ehimuh/",
    },
    {
      name: "Yifan Guo",
      role: "Backend Engineer",
      avatar_url: "/images/tony_pic.jpg",
      bio: "Senior Computer Science student UT Austin",
      responsibilities: "backend developer, database design",
      email: "yifan.guo3517@gmail.com",
      linkedin: "https://www.linkedin.com/in/tony-guo-012c",
    },
    {
      name: "Ethan Do",
      role: "Backend Engineer",
      avatar_url: "/images/ethan_pic.png",
      bio: "Junior CS Student, UT Austin",
      responsibilities: "Backend Engineer",
      email: "ethando767243@gmail.com",
      linkedin: "https://www.linkedin.com/in/ethan-do",
    },
    {
      name: "John Bukoski",
      role: "Technical Reporter",
      avatar_url: "/images/john_pic.jpg",
      bio: "Senior CS Student @ UT Austin",
      responsibilities: "Technical Reporter, iOS developer",
      email: "jtbukoski@gmail.com",
      linkedin: "https://www.linkedin.com/in/john-bukoski/",
    },
  ];

  // Find the user in the users array based on the name passed in user prop
  const matchedUser = users.find((u) => u.name.toLowerCase() === user?.name?.toLowerCase());

  // If matched user exists, we merge its data with the passed user data
  const mergedUser = matchedUser ? { ...matchedUser, ...user } : user;  // Merge matched user and user prop

  const userRole = mergedUser?.role ? capitalizeEachWord(mergedUser.role) : "Unknown Role";

  // Get the avatar for the user
  const getAvatar = (user) => {
    return user?.avatar_url || "/images/default_avatar.png";
  };

  return (
    <>
      {!loading && mergedUser ? (
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
                  src={getAvatar(mergedUser)}
                  alt={mergedUser.name}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="card-text z-10 font-sans">
                  <h3 className="text-xl font-semibold text-orange mb-1 z-20">{mergedUser.name}</h3>
                  <p className="text-blue-300 font-medium z-20">{userRole}</p>
                </div>
              </div>
            </div>

            {/* Back of the card with details */}
            <div className="flip-card-back absolute w-full h-full backface-hidden bg-[#307eb1] rounded-lg shadow-lg rotate-y-180 text-black overflow-auto">
              <div className="h-full p-4 flex flex-col space-y-3">
                {/* Top Section with Image, Name, and Role */}
                <div className="flex items-center">
                  <img
                    src={getAvatar(mergedUser)}
                    alt={mergedUser.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-black mr-3"
                  />
                  <div>
                    <h3 className="text-base font-bold">{mergedUser.name}</h3>
                    <p className="text-sm">{userRole}</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="text-sm">
                  <span className="font-bold">Bio: </span>
                  <span className="font-normal">{mergedUser.bio}</span>
                </div>

                {/* Responsibilities */}
                <div className="text-sm">
                  <span className="font-bold">Responsibilities: </span>
                  <span className="font-normal">{mergedUser.responsibilities}</span>
                </div>

                {/* GitLab URL */}
                {mergedUser.web_url && (
                  <div className="text-sm break-words">
                    <span className="font-bold">GitLab: </span>
                    <a
                      href={mergedUser.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-black hover:text-yellow-100"
                    >
                      {mergedUser.web_url}
                    </a>
                  </div>
                )}

                {/* Commits */}
                <div className="text-sm">
                  <span className="font-bold">Commits: </span>
                  <span className="font-normal">{mergedUser.commits || 'No commits yet'}</span>
                </div>

                {/* LinkedIn URL */}
                {mergedUser.linkedin && (
                  <div className="text-sm break-words">
                    <span className="font-bold">LinkedIn: </span>
                    <a
                      href={mergedUser.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-black hover:text-yellow-100"
                    >
                      {mergedUser.linkedin}
                    </a>
                  </div>
                )}
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
