// TODO use later.
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

type TTablePaginationProps = {
  page?: number;
  pageSize?: number;
  totalCount?: number;
  pageSizeOptions?: number[];
};
export default function TablePagination({
  page = 1,
  pageSize = 10,
  totalCount = 0,
  pageSizeOptions = [5, 10, 20],
  // add props for customization if needed...
}: TTablePaginationProps) {
  return (
    <div className="flex items-center mt-4">
      <PaginationWithLinks
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        pageSizeSelectOptions={{
          pageSizeOptions,
        }}
      />
    </div>
  );
}
