import { BrandPageLoader } from "@/components/ui/BrandPageLoader";

export default function ProductLoading() {
  return (
    <BrandPageLoader
      message="Crafting Material Specifications..."
      subMessage="Natural Timber & Architectural Joinery"
      fullScreen={true}
    />
  );
}
