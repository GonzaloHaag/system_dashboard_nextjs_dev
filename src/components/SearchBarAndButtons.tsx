
import { SearchBar } from './SearchBar';
import { CirclePlusIcon } from 'lucide-react';
import { buttonVariants } from './ui/button';
import Link from 'next/link';

interface Props {
  placeholder: string;
  textButton: string;
  linkHref: string;
  children?:React.ReactNode
}

export const SearchBarAndButtons = ({ placeholder, textButton, linkHref, children }: Props) => {
  return (
    <div className='w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between sm:h-10'>
      <SearchBar placeholder={placeholder} />
      <div className='flex items-center gap-x-4 h-full'>
        <Link href={linkHref} className={buttonVariants({ variant: 'default' })} title={textButton} >
          {textButton} <CirclePlusIcon />
        </Link>
        { children }
      </div>
    </div>
  )
}
