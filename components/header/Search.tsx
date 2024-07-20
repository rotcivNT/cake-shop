/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  defaultValue?: string;
  inputStyle?: string;
}

function Search({ defaultValue = "", inputStyle }: IProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();
  const onSearch = () => {
    router.push(`/search/product?q=${query}`);
    !defaultValue && setQuery("");
  };
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex items-stretch h-9">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        className={cn("rounded-l-[4px] px-3 text-[#333] w-full", inputStyle)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <p
        onClick={onSearch}
        className="p-2 flex justify-center items-center bg-[#3d1a1a] rounded-r-[4px]"
      >
        <SearchIcon className="text-white" size={18} />
      </p>
    </div>
  );
}

export default Search;
