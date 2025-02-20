
import { SearchBar } from './SearchBar';
import { CirclePlusIcon } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { ButtonExportCsv } from './ButtonExportCsv';

interface Props {
  placeholder: string;
  textButton: string;
  linkHref: string;
  buttonImportarCsv?: boolean;
}

export const SearchBarAndButtons = async ({ placeholder, textButton, linkHref, buttonImportarCsv }: Props) => {
  return (
    <div className='w-full flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between sm:h-10'>
      <SearchBar placeholder={placeholder} />
      <div className='flex items-center gap-x-4 h-full'>
        <Link href={linkHref} className={buttonVariants({ variant: 'default' })} title={textButton} >
          {textButton} <CirclePlusIcon />
        </Link>
        {
          buttonImportarCsv && (
            <Button type='button' variant={'outline'} title='Importar CSV'>
              Importar CSV
            </Button>
          )
        }
        <ButtonExportCsv />
      </div>
    </div>
  )
}
