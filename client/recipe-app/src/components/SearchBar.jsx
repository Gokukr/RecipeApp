import search from "../assets/Search.png";

const SearchBar = () => {
  return (
    <div className="w-[331px] rounded-3xs bg-darkslategray-300 flex flex-row items-end justify-between pt-[13px] pb-3.5 pr-4 pl-9 box-border gap-[20px] max-w-full">
      <div className="h-[50px] w-[330px] relative rounded-3xs bg-darkslategray-300 hidden max-w-full" />
      <input
        className="w-[52px] [border:none] [outline:none] font-open-sans text-base bg-[transparent] h-[22px] relative tracking-[0.05em] text-whitesmoke text-left inline-block z-[1]"
        placeholder="Search"
        type="text"
      />
      <img
        className="h-[23px] w-[22.7px] relative overflow-hidden shrink-0 min-h-[23px] z-[1]"
        alt=""
        src={search}
      />
    </div>
  );
};

export default SearchBar;
