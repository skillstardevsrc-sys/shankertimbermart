import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { EnquiryManager } from "@/components/admin/EnquiryManager";

export const revalidate = 0;

interface EnquiriesPageProps {
  searchParams: {
    id?: string;
  };
}

export default async function AdminEnquiriesPage({ searchParams }: EnquiriesPageProps) {
  const enquiries = await db.enquiries.getAll();

  return (
    <div className="flex bg-ivory-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="border-b border-sand-300 pb-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-timber">
              CRM & Lead Tracking
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
              Customer Enquiries & Quotations
            </h1>
          </div>

          <EnquiryManager
            initialEnquiries={enquiries}
            initialSelectedId={searchParams.id}
          />
        </div>
      </main>
    </div>
  );
}
