import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfilePage } from "@/components/profile-page";
import {
  communityProfiles,
  currentProfileSlug,
  getCommunityProfileBySlug,
} from "@/lib/content";

type CommunityProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return communityProfiles
    .filter((profile) => profile.slug !== currentProfileSlug)
    .map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({
  params,
}: CommunityProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getCommunityProfileBySlug(slug);

  if (!profile) {
    return {};
  }

  return {
    title: profile.name,
    description: `${profile.role}. ${profile.bio}`,
  };
}

export default async function CommunityProfilePage({
  params,
}: CommunityProfilePageProps) {
  const { slug } = await params;
  const profile = getCommunityProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  return <ProfilePage profile={profile} isCurrentUser={profile.slug === currentProfileSlug} />;
}
