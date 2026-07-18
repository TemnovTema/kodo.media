import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile-page";
import { currentProfileSlug, getCommunityProfileBySlug } from "@/lib/content";

export const metadata: Metadata = {
  title: "Профиль",
  description: "Личный профиль участника KODO MEDIA.",
};

export default function CurrentProfilePage() {
  const profile = getCommunityProfileBySlug(currentProfileSlug);

  if (!profile) {
    return null;
  }

  return <ProfilePage profile={profile} isCurrentUser />;
}
