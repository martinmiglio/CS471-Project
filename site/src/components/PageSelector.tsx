import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PageSelector({
  href,
  currentPage,
  hasNextPage,
  query,
}: Readonly<{
  href: string;
  currentPage: number;
  hasNextPage: boolean;
  query?: Record<string, string>;
}>) {
  const prevPageQuery = new URLSearchParams({
    ...query,
    page: (currentPage - 1).toString(),
  }).toString();
  const nextPageQuery = new URLSearchParams({
    ...query,
    page: (currentPage + 1).toString(),
  }).toString();
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={href + "?" + prevPageQuery} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext href={href + "?" + nextPageQuery} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
