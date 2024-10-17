"use client";

import { useState } from "react";
import { Trash2, Ellipsis, PenOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  useDeleteCompanyItem,
  useDeleteCompanyLists,
} from "@/hooks/mutations/useCompanyMutation";
import { useCompanyListQuery } from "@/hooks/queries/useCompanyListQuery";

import { useQueryState, parseAsInteger } from "nuqs";
import TableListsFilter from "./_components/Filters/TableListsFilter";
import TablePagination from "./_components/Pagination/Pagination";
import Lists from "../../components/Lists";
import CustomAlertDialog from "@/components/CustomAlertDialog";
import SkelatonTableLoader from "@/components/Loaders/SkeletonTableLoader";

export default function DashboardPage() {
  const [currentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [defaultPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(10)
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const { data, isLoading, isLoadingError,  } = useCompanyListQuery({
    searchText: searchTerm,
    page: currentPage,
    pageSize: defaultPageSize,
  });

  const { mutate: removeItem } = useDeleteCompanyItem();
  const { mutate: removeLists } = useDeleteCompanyLists();

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    setIsAllSelected(isChecked);
    if (isChecked)
      setSelectedRows(data?.list?.map((company) => company?.id) || []);
    if (!isChecked) {
      setSelectedRows([]);
      setIsAllSelected(false);
    }
  };

  const handleDeleteSelected = () => {
    removeLists({ ids: selectedRows });
    setSelectedRows([]);
    setIsAllSelected(false);
  };

  return (
    <div className="container mx-auto p-4">
      <PageTitle />
      <Filters setSearchTerm={setSearchTerm} />
      <Table>
        <TableHeaders
          checked={isAllSelected}
          onCheckedChange={(isChecked) => handleSelectAll(isChecked as boolean)}
        />
        <TableBody>
          {isLoading ? (
            <SkelatonTableLoader rowCount={3} columnCount={6} />
          ) : (
            <Lists
              data={data?.list ?? []}
              renderItem={(company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(company.id)}
                      onCheckedChange={() => handleSelectRow(company.id)}
                    />
                  </TableCell>
                  <TableCell>{company?.name}</TableCell>
                  <TableCell>{company?.industry}</TableCell>
                  <TableCell>{company?.location}</TableCell>
                  <TableCell>{company?.founded}</TableCell>
                  <TableCell>
                    <ActionButtons
                      onClick={() => removeItem({ id: company.id })}
                    />
                  </TableCell>
                </TableRow>
              )}
            />
          )}
          {(isLoadingError || data?.list.length === 0) && (
            <TableRow>
              <TableCell
                width="100%"
                height="200px"
                align="center"
                colSpan={12}
              >
                {data?.list.length === 0 && "No data available"}
                {isLoadingError &&
                  "Error Fetching data. Please refresh the page to refetch."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!!selectedRows?.length && (
        <CustomAlertDialog
          trigger={
            <div className="mt-4 mb-6 flex justify-end items-center">
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Selected Data
            </Button>
            </div>
          }
          title="Are you sure you want to delete the selected data?"
          description="This action cannot be undone. This will permanently delete the data in the list."
          onConfirm={handleDeleteSelected}
        />
      )}
      <TablePagination
        page={currentPage}
        pageSize={defaultPageSize}
        totalCount={data?.totalCount || 0}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
}

function PageTitle() {
  return (
    <h1 className="text-2xl font-bold mb-4">Company Privacy List Dashboard</h1>
  );
}

function TableHeaders({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={checked}
            onCheckedChange={(isChecked) =>
              onCheckedChange(isChecked as boolean)
            }
          />
        </TableHead>
        <TableHead>Company Name</TableHead>
        <TableHead>Industry</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Founded (Year)</TableHead>
        <TableHead className="w-[100px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}

function Filters({ setSearchTerm }: { setSearchTerm: (v: string) => void }) {
  return (
    <div className="my-11 flex justify-between items-center">
      <TableListsFilter
        onChange={({ searchTerm }) => {
          setSearchTerm(searchTerm ?? "");
        }}
      />
    </div>
  );
}

function ActionButtons({ onClick }: { onClick: () => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Button variant="ghost" size="icon" disabled>
          <PenOff className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClick}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
