import Image from "next/image";
import type { CSSProperties } from "react";
import type { CommunityProfile } from "@/lib/content";
import { brandPalette } from "@/lib/brand";

type ProfileAvatarProps = {
  profile: CommunityProfile;
  className?: string;
  sizes?: string;
};

const accentMap = {
  blue: brandPalette.blue,
  green: brandPalette.green,
  yellow: brandPalette.yellow,
  pink: brandPalette.pink,
} as const;

export const defaultProfileAvatarSrc = "/profile-portraits/default-avatar.png";

export function ProfileAvatar({
  profile,
  className = "h-12 w-12",
  sizes = "48px",
}: ProfileAvatarProps) {
  const accent = accentMap[profile.accent];
  const imageSrc = profile.photoSrc ?? defaultProfileAvatarSrc;
  const hasProfilePhoto = Boolean(profile.photoSrc);

  return (
    <span
      style={{ "--accent": accent } as CSSProperties}
      className={`relative inline-flex shrink-0 overflow-hidden border border-[var(--accent)] bg-[rgba(255,255,255,0.02)] ${className}`}
    >
      <Image
        src={imageSrc}
        alt={hasProfilePhoto ? `Портрет: ${profile.name}` : "Стандартный аватар KODO"}
        fill
        sizes={sizes}
        className="object-cover saturate-[0.82]"
        style={hasProfilePhoto ? { objectPosition: profile.photoPosition } : undefined}
      />
      {hasProfilePhoto ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,11,0.04),rgba(8,8,11,0.44))]"
        />
      ) : null}
    </span>
  );
}
