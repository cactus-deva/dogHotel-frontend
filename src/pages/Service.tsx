import deluxe from "../assets/Deluxe.png";
import suite from "../assets/Suite.png"
import vip from "../assets/VIP.png"
import { useLoading } from "../context/LoadingContext";

interface RoomType {
  image: string;
  name: string;
  size: string;
  price: number;
  description: string;
}

const roomTypes: RoomType[] = [
  {
    image: `${deluxe}`,
    name: "Deluxe Room",
    size: "2 x 2 meters",
    description: "Suites for small dog < 5 kgs.",
    price: 600,
  },
  {
    image: `${suite}`,
    name: "Suite Room",
    size: "3 x 3 meters",
    description: "Suites for medium dog about 6 - 10 kgs.",
    price: 800,
  },
  {
    image: `${vip}`,
    name: "VIP Room",
    size: "6 x 6 meters",
    description: "Suites for large dog more than 11 kgs.",
    price: 1200,
  },
];

function Service() {
  const { setIsLoading } = useLoading();
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <section className="flex flex-col bg-[#FDF9F1] py-20 min-h-screen px-6 overflow-hidden mt-60 md:mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-[#A88763] text-center mb-12">
        Our Rooms & Prices
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {roomTypes.map((room, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center"
          >
            <img
              src={room.image}
              alt={room.name}
              className="mb-4 rounded-md w-full object-cover h-56"
            />
            <h3 className="text-xl font-semibold text-[#A88763] mb-2">
              {room.name}
            </h3>
            <p className="text-[#3B3B3B]">Size {room.size}</p>
            <p className="text-[#3B3B3B] text-center">{room.description}</p>
            <p className="text-[#3B3B3B] font-medium mt-1">
              Price: {room.price} / night / dog
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full h-fit mt-30">
        <span className="text-center text-md md:text-3xl font-semibold text-[#A88763]">
          Check-in & Check-out time 09:00 - 19:00 daily
        </span>
      </div>
    </section>
  );
}

export default Service;
