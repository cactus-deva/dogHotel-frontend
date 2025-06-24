import samoyed from "../assets/samoyed.png";
import logo from "../assets/logo.png";
function Contact() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-50 md:mt-10">
      {/* BG image */}
      <div
        className="animate-fadeIn w-full absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${samoyed})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-md md:text-lg text-black p-10 bg-white/50 backdrop-blur-xs rounded-xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Contact Us
        </h2>
        <img src={`${logo}`} className="w-20 h-20 rounded-full mb-4" />
        <p className="mb-2">🏡 123 Sukhumvit Road Bangkok</p>
        <p className="mb-2">📞 Phone: 098 999 999</p>
        <p className="mb-2">✉️ Email: support@woofhotel.com</p>
        <p className="mb-2">🕐 Open: 9:00 - 19:00 (Daily)</p>
        <p className="mt-4">
          We’re happy to answer all your questions, please feel free to contact.
        </p>
      </div>
    </section>
  );
}

export default Contact;
