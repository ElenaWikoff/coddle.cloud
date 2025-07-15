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
      role: "Technical Reporter",
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

  const matchedUser = users.find(u => u.name.toLowerCase() === user?.name?.toLowerCase());

  const userRole = user && user.role ? capitalizeEachWord(user.role) : "Unknown Role";

  const getAvatar = (user) => {
    if (user?.avatar_url) return user.avatar_url;

    const name = user?.name?.toLowerCase();
    const match = users.find((u) => u.name.toLowerCase() === name);
    if (match && match.avatar_url) return match.avatar_url;

    if (name === "elena wikoff" || name === "jane huynh") {
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
                <img
                  src={getAvatar(user)}
                  alt={user.name}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="card-text z-10 font-sans">
                  <h3 className="text-xl font-semibold text-orange mb-1 z-20">{user.name}</h3>
                  <p className="text-blue-300 font-medium z-20">{userRole}</p>
                </div>
              </div>
            </div>

            {/* Back of the card with details */}
            <div className="flip-card-back absolute w-full h-full backface-hidden bg-[#b0d6f5] rounded-lg shadow-lg rotate-y-180 text-gray-900">
              <div className="h-full p-6 flex flex-col">
                <div className="flex items-center mb-4">
                  <img
                    src={getAvatar(user)}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-left font-serif">{user.name}</h3>
                    <p className="text-[#307eb1] text-sm font-medium text-left font-serif">{userRole}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex">
                    <p className="text-sm font-bold w-20 flex-shrink-0 font-mono">Username:</p>
                    <p className="text-sm leading-relaxed flex-1 font-mono">{user.username}</p>
                  </div>

                  <div className="flex">
                    <p className="text-sm font-bold w-32 flex-shrink-0 font-mono">GitLab:</p>
                    <p className="text-sm leading-relaxed flex-1 font-mono">
                      <a href={user.web_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {user.web_url}
                      </a>
                    </p>
                  </div>

                  <div className="flex">
                    <p className="text-sm font-bold w-32 flex-shrink-0 font-mono">Commits:</p>
                    <p className="text-sm leading-relaxed flex-1 font-mono">{user.commits}</p>
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
