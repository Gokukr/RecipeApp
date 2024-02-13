import SearchBar from "./SearchBar";

const Search = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start gap-[26px] max-w-full text-left text-13xl text-darkslategray-100 font-open-sans">
      <div className="self-stretch h-11 relative inline-block mq450:text-lgi mq750:text-7xl">
        <b>Explore</b>
        <span>{` `}</span>
        <b>{`variety of Cuisines `}</b>
      </div>
      <SearchBar />
    </div>
  );
};

export default Search;
