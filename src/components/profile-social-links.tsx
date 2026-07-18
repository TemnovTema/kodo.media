import type { CommunityProfile } from "@/lib/content";
import { SocialIcon } from "@/components/social-icon";

type ProfileSocialLinksProps = {
  profile: CommunityProfile;
};

export function ProfileSocialLinks({ profile }: ProfileSocialLinksProps) {
  return (
    <section className="space-y-3" aria-label={`Внешние ссылки: ${profile.name}`}>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        внешние площадки
      </p>
      <div className="flex flex-wrap gap-2">
        {profile.socials.map((social) => (
          <a
            key={social.network}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${social.network}: ${social.label}`}
            className="group inline-flex min-h-10 items-center gap-2 border border-[var(--color-border)] bg-[var(--color-panel)] px-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--color-text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--color-text)]"
          >
            <SocialIcon
              network={social.network}
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            />
            <span>{social.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
