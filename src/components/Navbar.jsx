import * as React from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
const Navbar = () => {
  const navContainerRef = React.useRef(null);

  const navItems = ["Nexucs", "Vault", "Prologue", "About", "Contact"];

  const audioElementRef = React.useRef(null);

  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);

  const [isIndicatorActive, setIsIndicatorActive] = React.useState(false);

  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isNavVisible, setIsNavVisible] = React.useState(true);

  React.useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  React.useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.5,
    });
  }, [isNavVisible]);

  const toggleAudio = () => {
    setIsAudioPlaying((prevState) => !prevState);
    setIsIndicatorActive((prevState) => !prevState);
  };

  React.useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className=" absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="img/logo.png" alt="Logo" className="w-10" />
            <Button
              id="buttons"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudio}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                className="hidden"
                ref={audioElementRef}
                src="audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
