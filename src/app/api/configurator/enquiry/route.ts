import { NextRequest, NextResponse } from "next/server";
import { configuratorDb } from "@/lib/configurator/dbConfigurator";
import { ConfiguratorEnquirySubmission } from "@/lib/configurator/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body: ConfiguratorEnquirySubmission = await request.json();

    if (!body || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please configure at least one product before submitting." },
        { status: 400 }
      );
    }

    if (!body.customer?.fullName || !body.customer?.phone) {
      return NextResponse.json(
        { success: false, error: "Full name and contact phone number are required." },
        { status: 400 }
      );
    }

    // Phone validation
    const cleanPhone = body.customer.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const result = await configuratorDb.submitEnquiry(body);

    return NextResponse.json({
      success: true,
      message: "Your product configuration enquiry has been received successfully.",
      referenceCode: result.referenceCode,
      enquiryId: result.enquiryId,
      itemsCount: result.itemsCount,
      createdAt: result.createdAt,
    });
  } catch (error: any) {
    console.error("Configurator enquiry error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit configurator enquiry" },
      { status: 500 }
    );
  }
}
