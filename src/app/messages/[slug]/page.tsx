import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageThread } from "@/components/message-thread";
import {
  communityProfiles,
  currentProfileSlug,
  getCommunityProfileBySlug,
  getDirectConversationByProfile,
} from "@/lib/content";

type MessagePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return communityProfiles
    .filter((profile) => profile.slug !== currentProfileSlug)
    .map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: MessagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getCommunityProfileBySlug(slug);

  if (!profile) {
    return {};
  }

  return {
    title: `Диалог с ${profile.name}`,
    description: `Личная переписка с участником KODO: ${profile.name}.`,
  };
}

export default async function MessagePage({ params }: MessagePageProps) {
  const { slug } = await params;
  const participant = getCommunityProfileBySlug(slug);
  const currentProfile = getCommunityProfileBySlug(currentProfileSlug);

  if (!participant || !currentProfile || participant.slug === currentProfile.slug) {
    notFound();
  }

  const conversation = getDirectConversationByProfile(participant.slug);

  return (
    <MessageThread
      currentProfile={currentProfile}
      participant={participant}
      initialMessages={conversation?.messages ?? []}
    />
  );
}
