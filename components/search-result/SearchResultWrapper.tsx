"use client";
import { useSearchParams } from "next/navigation";
import Search from "../header/Search";
import SearchResult from "./SearchResult";

export default function SearchResultWrapper() {
  const query = useSearchParams().get("q");

  return (
    <div className="py-[50px] max-w-[1200px] mx-auto w-full px-[30px]">
      <h3 className="uppercase text-[24px] text-center font-bold text-[#333]">
        KẾT QUẢ TÌM KIẾM CHO &quot;{query}&quot;
      </h3>
      <hr className="my-4" />
      <div className="px-3">
        <Search
          defaultValue={query || ""}
          inputStyle="border border-[#e6e6e6] focus:border-[#cdcdcd]"
        />
      </div>
      <div>
        <SearchResult />
      </div>
    </div>
  );
}
