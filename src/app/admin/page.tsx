import Link from "next/link";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Users,
  Package,
  FolderGit2,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [enquiries, products, projects, brands] = await Promise.all([
    db.enquiries.getAll(),
    db.products.getAll(),
    db.projects.getAll(),
    db.brands.getAll(),
  ]);

  // Compute live pipeline metrics
  const totalEnquiries = enquiries.length;
  const newLeads = enquiries.filter((e) => e.status === "New").length;
  const contactedLeads = enquiries.filter((e) => e.status === "Contacted").length;
  const quotesSent = enquiries.filter((e) => e.status === "Quotation Sent").length;
  const convertedLeads = enquiries.filter((e) => e.status === "Converted").length;

  return (
    <div className="flex bg-ivory-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-300 pb-6">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-timber">
                Overview & Operations
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
                Executive Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/configurator"
                className="px-4 py-2 bg-timber hover:bg-timber-600 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors flex items-center gap-1.5"
              >
                <span>Configurator CMS</span>
              </Link>
              <Link
                href="/admin/enquiries"
                className="px-4 py-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors"
              >
                Manage All Leads ({totalEnquiries})
              </Link>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-charcoal/60">
                <span>Total Enquiries</span>
                <Users className="w-4 h-4 text-timber" />
              </div>
              <span className="font-serif text-3xl font-medium text-walnut block">
                {totalEnquiries}
              </span>
              <span className="text-[11px] text-charcoal/50 block">All incoming leads</span>
            </div>

            <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-charcoal/60">
                <span>New / Uncontacted</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <span className="font-serif text-3xl font-medium text-amber-700 block">
                {newLeads}
              </span>
              <span className="text-[11px] text-amber-600/80 font-medium block">Action required</span>
            </div>

            <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-charcoal/60">
                <span>Quotations Sent</span>
                <FileText className="w-4 h-4 text-timber" />
              </div>
              <span className="font-serif text-3xl font-medium text-walnut block">
                {quotesSent}
              </span>
              <span className="text-[11px] text-charcoal/50 block">Formal pricing active</span>
            </div>

            <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-charcoal/60">
                <span>Converted Clients</span>
                <CheckCircle2 className="w-4 h-4 text-olive" />
              </div>
              <span className="font-serif text-3xl font-medium text-olive block">
                {convertedLeads}
              </span>
              <span className="text-[11px] text-olive/80 font-medium block">Orders finalized</span>
            </div>
          </div>

          {/* Catalog & Content Counts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-charcoal/60 block">Active Products</span>
                <span className="font-serif text-2xl font-medium text-walnut">{products.length}</span>
              </div>
              <Link href="/admin/products" className="text-xs font-semibold text-timber hover:text-walnut">
                Manage &rarr;
              </Link>
            </div>

            <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-charcoal/60 block">Showcase Projects</span>
                <span className="font-serif text-2xl font-medium text-walnut">{projects.length}</span>
              </div>
              <Link href="/admin/projects" className="text-xs font-semibold text-timber hover:text-walnut">
                Manage &rarr;
              </Link>
            </div>

            <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-charcoal/60 block">Brochure Brands</span>
                <span className="font-serif text-2xl font-medium text-walnut">{brands.length}</span>
              </div>
              <Link href="/admin/brands" className="text-xs font-semibold text-timber hover:text-walnut">
                Manage &rarr;
              </Link>
            </div>
          </div>

          {/* Recent Enquiries Table */}
          <div className="bg-white rounded-card border border-sand-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-sand-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-medium text-walnut">
                  Recent Inquiries & Quotes
                </h3>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Latest customer submissions across website and product pages.
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-timber hover:text-walnut inline-flex items-center gap-1"
              >
                <span>View All Inquiries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-ivory-50 text-walnut uppercase tracking-wider font-semibold border-b border-sand-200">
                  <tr>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Customer Name</th>
                    <th className="py-3.5 px-6">Phone</th>
                    <th className="py-3.5 px-6">Type</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {enquiries.slice(0, 5).map((enq) => (
                    <tr key={enq.id} className="hover:bg-ivory-50/60 transition-colors">
                      <td className="py-3.5 px-6 text-charcoal/60 whitespace-nowrap">
                        {formatDate(enq.createdAt)}
                      </td>
                      <td className="py-3.5 px-6 font-medium text-walnut">
                        {enq.fullName}
                      </td>
                      <td className="py-3.5 px-6 text-charcoal/80 font-mono">
                        {enq.phone}
                      </td>
                      <td className="py-3.5 px-6 text-charcoal/70">
                        {enq.customerType}
                      </td>
                      <td className="py-3.5 px-6 text-charcoal/70">
                        {enq.productCategory}
                      </td>
                      <td className="py-3.5 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-sm text-[11px] font-semibold ${
                            enq.status === "New"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "Converted"
                              ? "bg-emerald-100 text-emerald-800"
                              : enq.status === "Quotation Sent"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-sand-100 text-charcoal"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <Link
                          href={`/admin/enquiries?id=${enq.id}`}
                          className="font-semibold text-timber hover:text-walnut"
                        >
                          Manage &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
