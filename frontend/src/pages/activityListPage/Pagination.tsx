import { Pagination } from '@mui/material';
import { ChangeEvent } from 'react';

interface AppPaginationProps {
  actiesPerPage: number;
  totalActies: number;
  pageOnchange: (pageNum: number) => void;
}

export default function AppPagination({ actiesPerPage, totalActies, pageOnchange }: AppPaginationProps) {
  const numOfpages = Math.ceil(totalActies / actiesPerPage);

  const handleOnChange: (env: ChangeEvent<unknown>, page: number) => void = (env, page) => {
    env.preventDefault();
    pageOnchange(page);
  };

  return (
    <>
      <Pagination count={numOfpages} variant="outlined" color="secondary" onChange={handleOnChange} />
    </>
  );
}
