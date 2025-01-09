import space from "../LandingAssets/Space.mp4";
import Navbar from "../LandingComponents/Navbar";
import Landing from "../LandingComponents/Landing";
import Initiatives from "../LandingComponents/Initiatives";
import Funds from "../LandingComponents/Funds";
import Footer from "../LandingComponents/Footer";
import BackToTop from "../LandingComponents/BackToTop";

export default function LandingHome() {
  return (
    <>
      <Navbar />
      {/* <div className="relative w-full h-[700px] overflow-hidden">
        <video
          src={space}
          type="video/mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          Sorry, your browser doesn't support videos.
        </video>
        <div className="absolute bottom-[10%] right-[50%] transform translate-x-1/2 text-center">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold border-r-2 border-orange-500 whitespace-nowrap overflow-hidden animate-typing">
            ACTION, SERVICE, HOPE FOR AIDS...
          </h2>
        </div>
      </div> */}
      <Landing />
      <Initiatives />
      <Funds />
      <Footer />
      <BackToTop />
    </>
  );
}
