import { memo } from "react";
import hatimage from "../assets/hat.png";
// import search from "../assets/Vector.png";
import user from "../assets/Vector (1).png";

const Header = memo(() => {
  return (
    <header className="self-stretch h-[99px] bg-white overflow-hidden shrink-0 flex flex-row items-center justify-between py-[22px] pr-[95px] pl-[43px] box-border gap-[20px] top-[0] z-[99] sticky max-w-full text-left text-21xl text-darkslategray-100 font-mystery-quest mq450:pr-5 mq450:box-border mq750:pl-[21px] mq750:pr-[47px] mq750:box-border">
      <div className="self-stretch w-[269px] flex flex-row items-start justify-start gap-[9px]">
        <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
          <img
            className="w-9 h-9 relative object-cover z-[1]"
            loading="eager"
            alt=""
            src={hatimage}
          />
        </div>
        <h2 className="m-0 self-stretch flex-1 relative text-inherit tracking-[0.06em] font-normal font-inherit z-[1]">
          Cook buddy
        </h2>
      </div>
      <div className="w-[550px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border max-w-full text-5xl font-open-sans mq1050:w-0">
        <div className="self-stretch flex flex-row items-start justify-start gap-[29px] mq1050:hidden">
          <div className="flex flex-col items-start justify-start py-0 pr-[18px] pl-0">
            <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1]">
              Home
            </b>
          </div>
          <div className="flex-[0.8226] flex flex-col items-start justify-start py-0 pr-[22px] pl-0">
            <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1]">
              Cuisines
            </b>
          </div>
          <b className="h-[30px] flex-1 relative tracking-[0.03em] inline-block whitespace-nowrap z-[1]">
            About us
          </b>
          <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-[7px]">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="h-9 w-10 flex flex-col items-start justify-start py-0 pr-0 pl-0"
            >
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <img
            className="h-9 w-10 relative min-h-[36px]"
            loading="eager"
            alt=""
            src={user}
          />
        </div>
      </div>
    </header>
  );
});

export default Header;
