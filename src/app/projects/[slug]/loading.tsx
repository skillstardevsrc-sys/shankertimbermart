import { BrandPageLoader } from "@/components/ui/BrandPageLoader";

export default function ProjectLoading() {
  return (
    <BrandPageLoader
      message="Loading Architectural Project Showcase..."
      subMessage="Executed Residential & Commercial Spaces"
      fullScreen={true}
    />
  );
}
