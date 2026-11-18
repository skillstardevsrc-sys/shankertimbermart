"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  Filter,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  X,
  FileText,
} from "lucide-react";
import { Enquiry, LeadStatus, CustomerType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface EnquiryManagerProps {
  initialEnquiries: Enquiry[];
  initialSelectedId?: string;
}

const STATUS_OPTIONS: LeadStatus[] = [
  "New",
  "Contacted",
  "Requirement Identified",
  "Quotation Sent",
  "Negotiation",
  "Converted",
  "Lost",
];

export function EnquiryManager({
  initialEnquiries,
  initialSelectedId,
}: EnquiryManagerProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(
    enquiries.find((e) => e.id === initialSelectedId) || null
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string>("All");

  const [newNoteText, setNewNoteText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Filtered inquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      if (statusFilter !== "All" && e.status !== statusFilter) return false;
      if (categoryFilter !== "All" && e.productCategory !== categoryFilter) return false;
      if (customerTypeFilter !== "All" && e.customerType !== customerTypeFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = e.fullName.toLowerCase().includes(q);
        const matchPhone = e.phone.includes(q);
        const matchEmail = e.email?.toLowerCase().includes(q);
        const matchReq = e.requirementDescription.toLowerCase().includes(q);
        const matchLoc = e.projectLocation?.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchEmail && !matchReq && !matchLoc) return false;
      }
      return true;
    });
  }, [enquiries, statusFilter, categoryFilter, customerTypeFilter, searchQuery]);

  // Update lead status
  const handleStatusChange = async (enquiryId: string, newStatus: LeadStatus) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? data.enquiry : e))
        );
        if (selectedEnquiry?.id === enquiryId) {
          setSelectedEnquiry(data.enquiry);
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Add internal note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNoteText.trim()) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNoteText.trim(), author: "Showroom Admin" }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? data.enquiry : e))
        );
        setSelectedEnquiry(data.enquiry);
        setNewNoteText("");
      }
    } catch (err) {
      console.error("Add note error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete enquiry
  const handleDelete = async (enquiryId: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
        if (selectedEnquiry?.id === enquiryId) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Search, Filters, CSV Export */}
      <div className="bg-white p-6 rounded-card border border-sand-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, requirement, location..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form focus:outline-none focus:ring-1 focus:ring-timber transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/enquiries/export"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-ivory text-walnut border border-sand-300 hover:bg-sand-100 rounded-button text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 text-timber" />
              <span>Export CSV</span>
            </a>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-sand-100 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-walnut uppercase mb-1">
              Lead Stage Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-ivory-50 border border-sand-300 rounded-form text-charcoal"
            >
              <option value="All">All Lead Stages</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-walnut uppercase mb-1">
              Category Filter
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-ivory-50 border border-sand-300 rounded-form text-charcoal"
            >
              <option value="All">All Product Categories</option>
              <option value="Timber">Timber</option>
              <option value="Plywood & MDF">Plywood & MDF</option>
              <option value="Doors">Doors</option>
              <option value="WPC">WPC</option>
              <option value="Windows">Windows</option>
              <option value="Modular Interiors">Modular Interiors</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-walnut uppercase mb-1">
              Customer Type Filter
            </label>
            <select
              value={customerTypeFilter}
              onChange={(e) => setCustomerTypeFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-ivory-50 border border-sand-300 rounded-form text-charcoal"
            >
              <option value="All">All Stakeholder Types</option>
              <option value="Homeowner">Homeowner</option>
              <option value="Architect">Architect</option>
              <option value="Interior Designer">Interior Designer</option>
              <option value="Contractor">Contractor</option>
              <option value="Builder">Builder</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: List Table + Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table */}
        <div className={`space-y-4 ${selectedEnquiry ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <div className="bg-white rounded-card border border-sand-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-ivory-50 border-b border-sand-200 flex items-center justify-between text-xs text-charcoal/70">
              <span>
                Found <strong>{filteredEnquiries.length}</strong> leads
              </span>
              <span>Click a lead row to open details & log internal notes</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-ivory-100 text-walnut uppercase tracking-wider font-semibold border-b border-sand-200">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {filteredEnquiries.map((enq) => {
                    const isSelected = selectedEnquiry?.id === enq.id;
                    return (
                      <tr
                        key={enq.id}
                        onClick={() => setSelectedEnquiry(enq)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-sand-100 font-medium"
                            : "hover:bg-ivory-50"
                        }`}
                      >
                        <td className="py-3 px-4 text-charcoal/60 whitespace-nowrap">
                          {formatDate(enq.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-walnut font-medium">
                          {enq.fullName}
                          {enq.projectLocation && (
                            <span className="block text-[11px] text-charcoal/50">
                              {enq.projectLocation}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-charcoal/80">
                          {enq.productCategory}
                        </td>
                        <td className="py-3 px-4 text-charcoal/70">
                          {enq.customerType}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-semibold ${
                              enq.status === "New"
                                ? "bg-amber-100 text-amber-800"
                                : enq.status === "Converted"
                                ? "bg-emerald-100 text-emerald-800"
                                : enq.status === "Quotation Sent"
                                ? "bg-blue-100 text-blue-800"
                                : enq.status === "Requirement Identified"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-sand-200 text-charcoal"
                            }`}
                          >
                            {enq.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Lead Detail & Action Drawer */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white p-6 rounded-card border border-sand-200 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-sand-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-charcoal/50 block">
                  REF: {selectedEnquiry.id}
                </span>
                <h3 className="font-serif text-2xl font-medium text-walnut">
                  {selectedEnquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-charcoal/50 hover:text-charcoal"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Selector */}
            <div className="p-4 bg-ivory-50 rounded-form border border-sand-200 space-y-2">
              <label className="block text-xs font-semibold text-walnut uppercase tracking-wider">
                Pipeline Lead Stage
              </label>
              <select
                disabled={isUpdating}
                value={selectedEnquiry.status}
                onChange={(e) =>
                  handleStatusChange(selectedEnquiry.id, e.target.value as LeadStatus)
                }
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-sand-300 rounded-form text-charcoal"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Contact Details */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-charcoal/80">
                <Phone className="w-4 h-4 text-timber shrink-0" />
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="font-medium hover:text-timber font-mono text-sm"
                >
                  {selectedEnquiry.phone}
                </a>
              </div>

              {selectedEnquiry.email && (
                <div className="flex items-center gap-2 text-charcoal/80">
                  <Mail className="w-4 h-4 text-timber shrink-0" />
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="hover:text-timber"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
              )}

              {selectedEnquiry.projectLocation && (
                <div className="flex items-center gap-2 text-charcoal/80">
                  <MapPin className="w-4 h-4 text-timber shrink-0" />
                  <span>{selectedEnquiry.projectLocation}</span>
                </div>
              )}
            </div>

            {/* Requirement Specifications */}
            <div className="space-y-2 pt-2 border-t border-sand-100 text-xs">
              <span className="font-semibold text-walnut uppercase tracking-wider block">
                Requirement Details:
              </span>
              <div className="p-3 bg-ivory-50 rounded-form text-charcoal/80 leading-relaxed">
                {selectedEnquiry.requirementDescription}
              </div>
              {selectedEnquiry.estimatedQuantity && (
                <div className="text-charcoal/70">
                  <strong className="text-walnut">Estimated Quantity: </strong>
                  {selectedEnquiry.estimatedQuantity}
                </div>
              )}
            </div>

            {/* Internal Notes History */}
            <div className="space-y-3 pt-3 border-t border-sand-100">
              <span className="font-semibold text-walnut uppercase tracking-wider text-xs block">
                Internal Showroom Notes ({selectedEnquiry.internalNotes?.length || 0})
              </span>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedEnquiry.internalNotes && selectedEnquiry.internalNotes.length > 0 ? (
                  selectedEnquiry.internalNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-2.5 bg-ivory-50 rounded-sm border border-sand-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-charcoal/50">
                        <span className="font-semibold text-walnut">{note.author}</span>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>
                      <p className="text-charcoal/80">{note.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-charcoal/50 italic">No notes logged yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Log quote dispatched, site visit scheduled..."
                  className="w-full p-2.5 text-xs bg-ivory-50 border border-sand-300 rounded-form focus:outline-none focus:ring-1 focus:ring-timber text-charcoal"
                />
                <button
                  type="submit"
                  disabled={isUpdating || !newNoteText.trim()}
                  className="px-4 py-1.5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold rounded-button transition-colors disabled:opacity-50"
                >
                  Log Internal Note
                </button>
              </form>
            </div>

            {/* Delete Lead Button */}
            <div className="pt-4 border-t border-sand-100 flex justify-between items-center text-xs">
              <span className="text-charcoal/40">Created {formatDate(selectedEnquiry.createdAt)}</span>
              <button
                onClick={() => handleDelete(selectedEnquiry.id)}
                className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
