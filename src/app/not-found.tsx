import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-ivory min-h-[70vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="font-serif text-8xl font-bold text-sand-300 block">
          404
        </span>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-medium text-walnut">
            Space Not Found
          </h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            The page or material catalogue you are searching for might have been moved, updated, or does not exist.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto py-3 px-6 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto py-3 px-6 border border-sand-300 hover:bg-sand-50 text-walnut text-xs font-semibold uppercase tracking-wider rounded-button transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-timber" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
