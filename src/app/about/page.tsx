import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">About This Admin Page</CardTitle>
          <CardDescription>A simple and functional admin interface</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This is a simple Admin page that I built for this coding challenge. I kept it simple and functional based on the requirements, as there was only a limited amount of time.
          </p>
          <h3 className="text-xl font-semibold mb-4">Testing Instructions:</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">1. Search Filter Functionality</h4>
              <p className="mb-2"><strong>Objective:</strong> Verify that the search input filters company names, industries, and locations.</p>
              <p className="mb-2"><strong>Steps:</strong></p>
              <ol className="list-decimal list-inside pl-4 space-y-1">
                <li>Open the app: In your browser, navigate to http://localhost:3000</li>
                <li>Search field: At the top of the table, find the search input field (Search companies...).</li>
                <li>Enter a search query:
                  <ul className="list-disc list-inside pl-4">
                    <li>Type in a company name, industry, or location (e.g., "Technology", "Canada").</li>
                    <li>Observe the table being filtered based on your input.</li>
                  </ul>
                </li>
                <li>Clear the input: Clear the search field and check that the full table is restored.</li>
              </ol>
              <p className="mt-2"><strong>Expected Outcome:</strong></p>
              <ul className="list-disc list-inside pl-4">
                <li>The table should display rows matching the entered text based on any of the following:
                  <ul className="list-disc list-inside pl-4">
                    <li>Company Name</li>
                    <li>Industry</li>
                    <li>Location</li>
                  </ul>
                </li>
                <li>When cleared, all rows should be displayed again.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">2. Checkboxes for Bulk Actions</h4>
              <p className="mb-2"><strong>Objective:</strong> Test the checkboxes for bulk deletion functionality.</p>
              <p className="mb-2"><strong>Steps:</strong></p>
              <ol className="list-decimal list-inside pl-4 space-y-1">
                <li>Checkboxes: Click on a few checkboxes on the left of the table rows.</li>
                <li>Delete Button: After selecting rows, a "Delete Selected Data" button should appear below the table.</li>
                <li>Delete: Click the "Delete" button to simulate deletion.</li>
                <li>Confirm that the rows are removed from the table.</li>
                <li>Check the console to see the mock API request being made to delete these rows from db.json.</li>
              </ol>
              <p className="mt-2"><strong>Expected Outcome:</strong></p>
              <ul className="list-disc list-inside pl-4">
                <li>A "Delete Selected Data" button appears when one or more rows are selected.</li>
                <li>Clicking the delete button sends a delete request and removes the rows from the table.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">3. Ellipsis (...) Button Actions</h4>
              <p className="mb-2"><strong>Objective:</strong> Ensure the ellipsis button for individual row actions works correctly.</p>
              <p className="mb-2"><strong>Steps:</strong></p>
              <ol className="list-decimal list-inside pl-4 space-y-1">
                <li>Ellipsis button: On each row, click the ... button in the "Actions" column.</li>
                <li>Popup: A popup should appear with a delete button.</li>
                <li>Delete a single row: Click the delete button to remove the row from the table.</li>
                <li>Check that the row is deleted from both the table and db.json.</li>
              </ol>
              <p className="mt-2"><strong>Expected Outcome:</strong></p>
              <ul className="list-disc list-inside pl-4">
                <li>The ellipsis button shows a popup with a delete action.</li>
                <li>Clicking the delete action removes the row from the table and triggers a mock API delete request.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">4. Pagination</h4>
              <p className="mb-2"><strong>Objective:</strong> Test pagination through table pages and item limits.</p>
              <p className="mb-2"><strong>Steps:</strong></p>
              <ol className="list-decimal list-inside pl-4 space-y-1">
                <li>Pagination Controls: At the bottom of the table, use the pagination controls (Previous, Next, page numbers).</li>
                <li>Navigate to different pages.</li>
                <li>Page Limit: Use the "Rows per page" dropdown to change the number of rows shown per page (e.g., 5, 10, 20).</li>
                <li>URL QueryParams: Verify that pagination details (e.g., page number, row limit) are reflected in the URL as query parameters.
                  <ul className="list-disc list-inside pl-4">
                    <li>Example: ?pageSize=5&page=2.</li>
                  </ul>
                </li>
              </ol>
              <p className="mt-2"><strong>Expected Outcome:</strong></p>
              <ul className="list-disc list-inside pl-4">
                <li>Pagination should work, allowing you to navigate between pages.</li>
                <li>Changing the number of rows per page should update the display and be reflected in the URL.</li>
                <li>After refreshing the page, the table should remember the current page and item limit based on the URL parameters.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">5. Delete Request Simulation</h4>
              <p className="mb-2"><strong>Objective:</strong> Verify that deletions are simulated correctly with the mock API.</p>
              <p className="mb-2"><strong>Steps:</strong></p>
              <ol className="list-decimal list-inside pl-4 space-y-1">
                <li>Delete selected items: Either use the bulk delete functionality or the ellipsis button to delete individual items.</li>
                <li>Check the mock API: After deletion, check that the changes reflect in db.json.</li>
                <li>You can also check db_backup.json to compare the original and modified data.</li>
              </ol>
              <p className="mt-2"><strong>Expected Outcome:</strong></p>
              <ul className="list-disc list-inside pl-4">
                <li>The deleted rows should no longer appear in the table.</li>
                <li>The mock API should simulate a DELETE request and modify db.json to reflect the deletions.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}