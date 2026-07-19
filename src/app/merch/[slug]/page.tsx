import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MerchProductDetail } from "@/components/merch-product-detail";
import { getMerchItemBySlug, merchItems } from "@/lib/content";

type MerchProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return merchItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: MerchProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMerchItemBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function MerchProductPage({ params }: MerchProductPageProps) {
  const { slug } = await params;
  const item = getMerchItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return <MerchProductDetail item={item} />;
}
