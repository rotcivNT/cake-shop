import { SearchIcon } from "lucide-react";

function Search() {
  return (
    <div className="flex items-stretch h-9">
      <input
        type="text"
        placeholder="Search..."
        className="rounded-l-[4px] px-3 text-[#333] w-full"
      />
      <p className="p-2 flex justify-center items-center bg-[#3d1a1a] rounded-r-[4px]">
        <SearchIcon size={18} />
      </p>
    </div>
  );
}

export default Search;
