'use client';

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  placeholder:string;
}

export const SearchBar = ({ placeholder } : Props) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term:string) => {
    const params = new URLSearchParams(searchParams);
    if(term) {
      params.set('search',term);
    }
    else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`)
  },300);
  return (
    <form className="h-full relative w-full max-w-md text-sm">
      <input 
      defaultValue={searchParams.get('search')?.toString()} 
      onChange={(e) => {
        handleSearch(e.target.value)
      }}
      type="search" 
      placeholder={ placeholder } 
      className="h-10 sm:h-full w-full rounded-md outline-none border border-neutral-200 indent-8 pr-2 transition-colors duration-200 focus:border-neutral-900" />
      <SearchIcon size={16} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-neutral-500" />
    </form>
  )
}
