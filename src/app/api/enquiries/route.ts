import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      phone,
      email,
      customerType,
      productCategory,
      projectLocation,
      estimatedQuantity,
      requirementDescription,
      attachmentUrl,
      consent,
    } = body;

    // Strict validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").replace(/[\s\-\+\(\)]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "A valid 10-digit phone number is required." },
        { status: 400 }
      );
    }

    if (!requirementDescription || requirementDescription.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter your requirement description." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: "Consent to be contacted is required." },
        { status: 400 }
      );
    }

    // Save lead in local database
    const enquiry = await db.enquiries.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      customerType: customerType || "Homeowner",
      productCategory: productCategory || "Timber",
      projectLocation: projectLocation ? projectLocation.trim() : undefined,
      estimatedQuantity: estimatedQuantity ? estimatedQuantity.trim() : undefined,
      requirementDescription: requirementDescription.trim(),
      attachmentUrl: attachmentUrl || undefined,
      consent: Boolean(consent),
      source: "Website Enquiry Form",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Shankar Timber Mart. Our team has received your enquiry and will get in touch with you.",
        enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while processing your enquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const list = await db.enquiries.getAll();
    return NextResponse.json({ success: true, enquiries: list });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve enquiries." },
      { status: 500 }
    );
  }
}
