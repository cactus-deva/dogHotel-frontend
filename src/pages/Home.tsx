import bgImage from "../assets/pomeranian.png";
import playground from "../assets/playground.png";
import rooms from "../assets/rooms.png";
import reception from "../assets/reception.png";
import samoyed from "../assets/samoyed.png";
import westie from "../assets/westie.png";
import shihtzu from "../assets/shihtzu.png";
import maltese from "../assets/maltese.png";
import pom from "../assets/pom.png";
import poodle from "../assets/poodle.png";
import { Link } from "react-router-dom";

interface Feature {
  icon: string;
  title: string;
  text: string;
}

interface Gallery {
  src: string;
  title: string;
}

function Home() {
  const features: Feature[] = [
    {
      icon: `${reception}`,
      title: "Cozy Place",
      text: "Relax and feel like home",
    },
    {
      icon: `${rooms}`,
      title: "Private Rooms",
      text: "Spacious and private accomodations",
    },
    {
      icon: `${playground}`,
      title: "Playground",
      text: "Fun-filled outdoor activities daily",
    },
  ];

  const gallery: Gallery[] = [
    {
      src: `${shihtzu}`,
      title: "shih tzu",
    },
    {
      src: `${samoyed}`,
      title: "samoyed",
    },
    {
      src: `${westie}`,
      title: "westie",
    },
    {
      src: `${maltese}`,
      title: "maltese",
    },
    {
      src: `${pom}`,
      title: "pomeranian sleep",
    },
    {
      src: `${poodle}`,
      title: "poodle",
    },
  ];

  const token = localStorage.getItem("token");

  let link = "/";
  if (token) {
    link = "/booking";
  } else {
    link = "/register";
  }

  return (
    <main className="mt-[10px]">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${bgImage})`
        }}
        className="animate-fadeIn bg-cover bg-center w-full min-h-svh flex flex-col items-center justify-start rounded-md text-center px-6 py-20"
      >
  

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 pt-18 text-white opacity-70 drop-shadow-lg">
          A Luxury Stay for Your Dog
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-xl text-white opacity-70 drop-shadow-md">
          Experience the ultimate in dog hotel care and comfort — like no other.
        </p>
        <div className="mt-8">
          <Link
            to={link}
            className="bg-[#A88763] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#926f4e] transition"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-[#EDE6D6]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {features.map((feature, idx) => (
            <div key={idx}>
              <img
                src={feature.icon}
                alt={feature.title}
                className="mx-auto mb-4 h-auto w-auto rounded-lg"
              />
              <h3 className="text-lg md:text-xl font-semibold text-[#3B3B3B] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#3B3B3B] text-sm sm:text-base">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#FDF9F1] py-20 text-center px-6 mb-12 rounded-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#A88763] mb-4">
          Gallery
        </h2>
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
          {gallery.map((img, idx) => (
            <div key={idx}>
              <img
                src={img.src}
                alt={img.title}
                className=" mx-auto mb-4 h-auto w-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FDF9F1] py-20 text-center px-6 rounded-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#A88763] mb-4">
          Reviews from Customers
        </h2>
      </section>
    </main>
  );
}

export default Home;
