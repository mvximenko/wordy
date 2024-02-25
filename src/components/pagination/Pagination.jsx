import Button from './Button';
import { getPagination } from '@/utils/getPagination';
import LeftArrowIcon from '@/assets/left-arrow.svg?react';
import RightArrowIcon from '@/assets/right-arrow.svg?react';
import DoubleLeftArrowIcon from '@/assets/double-left-arrow.svg?react';
import DoubleRightArrowIcon from '@/assets/double-right-arrow.svg?react';

export const Pagination = ({ page, limit, items, setPage }) => {
  const totalPages = Math.ceil(items / limit);
  const pages = getPagination(page, totalPages, 10);

  return (
    <nav className='flex items-center justify-between mt-5'>
      <Button
        classes='disabled:opacity-50'
        disabled={page === 1}
        onClick={() => setPage(1)}
      >
        <DoubleLeftArrowIcon />
      </Button>

      <Button
        classes='disabled:opacity-50'
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <LeftArrowIcon />
      </Button>

      {pages.slice(0).map((value) => (
        <Button
          key={value}
          classes='disabled:border-gray-600'
          aria-current='page'
          onClick={() => setPage(value)}
          disabled={page === value}
        >
          {value}
        </Button>
      ))}

      <Button
        classes='disabled:opacity-50'
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        <RightArrowIcon />
      </Button>

      <Button
        classes='disabled:opacity-50'
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
      >
        <DoubleRightArrowIcon />
      </Button>
    </nav>
  );
};
