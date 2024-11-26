'use client';

import { useEffect, useState } from "react";
import { getContacts } from "../contact/actions";

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLeads();
  }, [currentPage]);

  const fetchLeads = async () => {
    try {
      const result = await getContacts(currentPage, 10);
      setLeads(result.contacts);
      setTotalPages(result.pages);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contact Form Leads</h1>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {lead.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {lead.phone || "-"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate text-sm text-gray-500">
                    {lead.message}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {formatDate(lead.createdAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          No leads found.
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
