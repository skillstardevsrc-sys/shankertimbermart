import { BrandPageLoader } from "@/components/ui/BrandPageLoader";

export default function RootLoading() {
  return (
    <BrandPageLoader
      message="Loading Shankar Timber Mart..."
      subMessage="Crafting Spaces. Defining Living."
      fullScreen={true}
    />
  );
}
