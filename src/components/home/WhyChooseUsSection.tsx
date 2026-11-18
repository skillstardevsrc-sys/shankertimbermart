import { Layers, CheckCircle2, Users, Compass, ShieldCheck, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";

const PILLARS = [
  {
    icon: Layers,
    title: "Unrivalled Product Range",
    desc: "From rough-sawn hardwood logs and kiln-dried timber to certified BWP plywood, designer veneer doors, uPVC windows, and turnkey modular kitchens—all under one roof.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic Material Standards",
    desc: "We verify every log and sheet. No unbranded substitutes, no compromised cores. When you order Burma Teak or IS:710 marine ply, you receive genuine certified material.",
  },
  {
    icon: Users,
    title: "Dedicated Segment Assistance",
    desc: "Customized workflows tailored for homeowners needing design advice, architects requiring finish samples, and contractors managing volume delivery schedules.",
  },
  {
    icon: Compass,
    title: "Turnkey Interior Integration",
    desc: "We bridge material supply with factory-grade modular manufacturing. Our in-house machinery ensures laser-straight edge banding and flawless joinery.",
  },
  {
    icon: CheckCircle2,
    title: "Objective Technical Guidance",
    desc: "Honest advice on wood species, dimensional stability, moisture tolerances, and exterior weathering before you place your order.",
  },
  {
    icon: MapPin,
    title: "Mettupalayam Road Showroom",
    desc: "Experience real timber grains, full-scale door displays, and window operation in person at 178-C, Mettupalayam Road, Coimbatore.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-ivory-100/70 border-t border-b border-sand-200 relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <SectionHeading
          tagline="Our Quality Standard"
          title="Why Choose Shankar Timber Mart"
          subtitle="A destination built on material authenticity, technical guidance, and seamless customer service."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-8 bg-white rounded-3xl border border-sand-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgb(43,29,21,0.08)] hover:-translate-y-1.5 transition-all duration-500 space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-sand-100/70 border border-sand-200/60 text-timber flex items-center justify-center group-hover:bg-walnut group-hover:text-sand-300 group-hover:scale-105 transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-walnut group-hover:text-timber transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
