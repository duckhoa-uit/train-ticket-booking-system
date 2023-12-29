import { useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ttbs/ui";

export function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}) {
  const pages = useMemo(() => {
    const temp = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      temp.push(i);
    }
    return temp;
  }, [totalItems, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePrevPage()} className="" />
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)} className="">
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={() => handleNextPage()} className="" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
