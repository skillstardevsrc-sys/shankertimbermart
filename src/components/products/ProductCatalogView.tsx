"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product, ProductCategory } from "@/lib/types";

interface ProductCatalogViewProps {
  initialProducts: Product[];
  selectedCategory?: string;
  selectedSubcategory?: string;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All Products", value: "all" },
  { label: "Timber", value: "timber" },
  { label: "Plywood & MDF", value: "plywood-mdf" },
  { label: "Doors & WPC", value: "doors" },
  { label: "Windows & Fenesta", value: "windows" },
  { label: "Modular Interiors", value: "modular-interiors" },
];

export function ProductCatalogView({
  initialProducts,
  selectedCategory = "all",
  selectedSubcategory = "",
}: ProductCatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
  const [sortBy, setSortBy] = useState<"featured" | "name-asc" | "name-desc">("featured");

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category filter
        if (activeCategory !== "all" && p.category !== activeCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchSub = p.subcategory?.toLowerCase().includes(q);
          const matchBrand = p.associatedBrand?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchSub && !matchBrand) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        // Featured first by default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProducts, activeCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-card border border-sand-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wood, doors, windows, plywood..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-ivory-50 border border-sand-300 rounded-form focus:outline-none focus:ring-1 focus:ring-timber transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs text-charcoal/60 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium bg-ivory-50 border border-sand-300 rounded-form focus:outline-none focus:ring-1 focus:ring-timber text-charcoal"
            >
              <option value="featured">Featured First</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
              <option value="name-desc">Alphabetical (Z - A)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-sand-100">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs font-semibold rounded-button transition-all ${
                  isActive
                    ? "bg-walnut text-ivory shadow-sm"
                    : "bg-ivory text-charcoal/80 hover:bg-sand-100 hover:text-walnut border border-sand-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-charcoal/60 px-1">
        <span>
          Showing <strong className="text-walnut">{filteredProducts.length}</strong> material options
        </span>
        {searchQuery && (
          <span>
            Search query: &quot;{searchQuery}&quot;
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-16 rounded-card border border-sand-200 text-center space-y-4">
          <p className="font-serif text-2xl text-walnut">No matching materials found</p>
          <p className="text-sm text-charcoal/60 max-w-md mx-auto">
            We couldn&apos;t find materials matching your filter criteria. Try clearing your search query or selecting another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="px-5 py-2.5 bg-walnut text-ivory text-xs font-semibold uppercase tracking-wider rounded-button"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
