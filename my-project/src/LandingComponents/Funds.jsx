import React, { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";

export default function Funds() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex items-center justify-center h-[300px] w-full bg-gradient-to-r from-[#133710] via-[#043d3acc] to-[#133710] bg-fixed bg-center"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 justify-items-center items-center">
        {/* Fact Item 1 */}
        <div className="flex flex-col items-center text-center">
          <svg
            height={isMobile ? 40 : 80}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="text-yellow-500"
            fill="currentColor"
          >
            <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193z" />
          </svg>
          {isVisible && (
            <CountUp
              end={20}
              duration={4}
              suffix="+"
              useEasing={true}
              className="text-white text-5xl font-bold mt-4"
            />
          )}
          <p className="text-white text-3xl font-semibold">NGOs</p>
        </div>

        {/* Fact Item 2 */}
        <div className="flex flex-col items-center text-center">
          <svg
            height={isMobile ? 40 : 80}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="text-yellow-500"
            fill="currentColor"
          >
            <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3z" />
          </svg>
          {isVisible && (
            <CountUp
              end={400}
              duration={4}
              suffix="+"
              useEasing={true}
              className="text-white text-5xl font-bold mt-4"
            />
          )}
          <p className="text-white text-3xl font-semibold">Volunteers</p>
        </div>

        {/* Fact Item 3 */}
        <div className="flex flex-col items-center text-center">
          <svg
            height={isMobile ? 35 : 70}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="text-yellow-500"
            fill="currentColor"
          >
            <path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4z" />
          </svg>
          {isVisible && (
            <CountUp
              end={10000}
              duration={4}
              suffix="+"
              useEasing={true}
              className="text-white text-5xl font-bold mt-4"
            />
          )}
          <p className="text-white text-3xl font-semibold">Our Goal</p>
        </div>

        {/* Fact Item 4 */}
        <div className="flex flex-col items-center text-center">
          <svg
            height={isMobile ? 35 : 70}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="text-yellow-500"
            fill="currentColor"
          >
            <path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
          </svg>
          {isVisible && (
            <CountUp
              end={5000}
              duration={4}
              suffix="+"
              useEasing={true}
              className="text-white text-5xl font-bold mt-4"
            />
          )}
          <p className="text-white text-3xl font-semibold">Raised</p>
        </div>
      </div>
    </div>
  );
}
