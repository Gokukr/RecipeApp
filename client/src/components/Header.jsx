import { memo } from "react";
import hatimage from "../assets/hat.png";
// import search from "../assets/Vector.png";
import user from "../assets/Vector (1).png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = memo(() => {
  const navigator = useNavigate();
  const userId = Cookies.get("user_id");
  const userRole = Cookies.get("role");

  function handleProfileclick() {
    navigator("/user");
  }
  function handleFavClick() {
    navigator(`/api/${userId}/saved-recipes`);
  }
  function handleHomeClick() {
    navigator("/dashboard");
  }
  function handleReqClick() {
    navigator("/culinarianReq");
  }

  function handleRecipeReqClick() {
    navigator("/recipe-request");
  }
  const notify = (message) => toast(message);
  function handleLogout() {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user_id");
    notify("Logout Successfully");
    setTimeout(() => {
      navigator("/");
    }, 500);
  }
  function handleMyRecipes() {
    navigator("/my-recipes");
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
            className="flex flex-col items-start justify-start py-0 pr-[4px] pl-0"
          >
            <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] mr-6 ml-6 pr-6">
              Home
            </b>
          </div>
          {(userRole === "Admin" || userRole === "admin") && (
            <div className="shrink-0 z-[1] mr-6 ml-6 pr-6">
              <select
                style={{
                  appearance: "none",
                }}
                value="hi"
                className="h-10 text-5xl pt-1 text-center font-bold mq1050:w-0 w-40 rounded-md focus:border-none flex flex-col justify-center font-sans border-none outline-none"
                onChange={(e) => {
                  if (e.target.value === "culRequest") {
                    handleReqClick();
                  } else {
                    handleRecipeReqClick();
                  }
                }}
              >
                <option
                  // selected
                  hidden
                  value="requests"
                  className="text-6xl h-[40px] relative "
                >
                  <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] ml-6 mr-6 pr-6">
                    Requests
                  </b>
                </option>
                <option
                  className="text-4xl h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] mr-6 ml-6 pr-6"
                  value="culRequest"
                >
                  <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] ml-6 mr-6 pr-6">
                    Culinarian Requests
                  </b>
                </option>
                <option
                  className="text-4xl h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] mr-6 ml-6 pr-6"
                  value="recRequest"
                >
                  <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] ml-6 mr-6 pr-6">
                    Recipe Requests
                  </b>
                </option>
              </select>
            </div>
          )}
          <div
            onClick={handleFavClick}
            className="flex-[0.8226] flex flex-col items-start justify-start py-0 pr-[4px] pl-0"
          >
            <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] ml-6 mr-6 pr-6">
              Favorites
            </b>
          </div>

          <div
            onClick={handleLogout}
            className="flex-[0.8226] flex flex-col items-start justify-start py-0 pr-[4px] pl-0"
          >
            <b className="h-[30px] relative tracking-[0.03em] inline-block shrink-0 z-[1] ml-6 mr-6 pr-6">
              Logout
            </b>
            <ToastContainer className="text-lgi" />
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
