import { memo } from "react";
import hatimage from "../assets/hat.png";
// import search from "../assets/Vector.png";
import user from "../assets/Vector (1).png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = memo(() => {
  const navigator = useNavigate();
  const userId = Cookies.get("user_id");

  function handleProfileclick() {
    navigator("/user");
  }
  function handleFavClick() {
    navigator(`/api/${userId}/saved-recipes`);
  }
  function handleHomeClick() {
    navigator("/dashboard");
  }

  return (
    <header className="self-stretch h-[99px] bg-white overflow-hidden shrink-0 flex flex-row items-center justify-between py-[22px] pr-[95px] pl-[43px] box-border gap-[20px] top-[0] z-[99] sticky max-w-full text-left text-21xl text-darkslategray-100 font-mystery-quest mq450:pr-5 mq450:box-border mq750:pl-[21px] mq750:pr-[47px] mq750:box-border">
      <div className="self-stretch w-[269px] flex flex-row items-start justify-end gap-[9px]">
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
        <div className="self-stretch flex flex-row items-start justify-end  mq1050:hidden">
          <div
            onClick={handleHomeClick}
            className="flex flex-col items-start justify-start py-0 pr-[18px] pl-0"
          >
            <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] ml-11 hover:cursor-pointer">
              Home
            </b>
          </div>
          <div
            onClick={handleFavClick}
            className="flex-[0.8226] flex flex-col items-start justify-start py-0 pr-[22px] pl-0"
          >
            <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] ml-12 mr-12 pr-6 hover:cursor-pointer">
              Favorites
            </b>
          </div>
          {/* <b className="h-[30px] flex-1 relative tracking-[0.03em] inline-block whitespace-nowrap z-[1]">
            About us
          </b> */}
          {/* <div className="flex flex-col items-start justify-start py-0 pr-[17px] pl-0">
            {/* <img
              className="w-[39px] h-[33px] relative overflow-hidden shrink-0"
              loading="eager"
              alt=""
              src={search}
            /> */}
          {/* </div> */}
          <img
            className="h-9 w-10 relative min-h-[36px]  "
            loading="eager"
            alt=""
            src={user}
            onClick={handleProfileclick}
          />
        </div>
      </div>
    </header>
  );
});

export default Header;
