import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - ZZAV`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { id: "desc" },
    });

    if (products.length === 0) {
      return <div className="text-center">No products found</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div className="text-center">Error fetching products</div>;
  }
}
