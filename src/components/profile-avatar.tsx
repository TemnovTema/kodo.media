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

export function ProfileAvatar({
  profile,
  className = "h-12 w-12",
  sizes = "48px",
}: ProfileAvatarProps) {
  const accent = accentMap[profile.accent];

  return (
    <span
      style={{ "--accent": accent } as CSSProperties}
      className={`relative inline-flex shrink-0 overflow-hidden border border-[var(--accent)] bg-[rgba(255,255,255,0.02)] ${className}`}
    >
      {profile.photoSrc ? (
        <Image
          src={profile.photoSrc}
          alt={`Портрет: ${profile.name}`}
          fill
          sizes={sizes}
          className="object-cover saturate-[0.82]"
          style={{ objectPosition: profile.photoPosition }}
        />
      ) : (
        <span className="relative z-10 flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--accent),rgba(8,8,11,0.96)_72%)] font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-text)]">
          {profile.avatarLabel}
        </span>
      )}
      {profile.photoSrc ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,11,0.04),rgba(8,8,11,0.44))]"
        />
      ) : null}
    </span>
  );
}
