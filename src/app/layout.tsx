import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const fugue = localFont({
  src: "./fonts/Fugue-Regular.ttf",
  variable: "--font-fugue",
});

const fugueHeadline = localFont({
  src: "./fonts/fugue-headline.otf",
  variable: "--font-fugue-headline",
});

const fugueMono = localFont({
  src: "./fonts/fugue-mono.otf",
  variable: "--font-fugue-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kodo.media"),
  title: {
    default: "KODO MEDIA",
    template: "%s | KODO MEDIA",
  },
  description:
    "Онлайн-СМИ о вайб-кодинге: статьи, рубрики, лаборатория промта и тесты для тех, кто строит продукты вместе с агентами.",
  openGraph: {
    title: "KODO MEDIA",
    description:
      "Онлайн-СМИ о вайб-кодинге, промтах и агентной сборке продуктов.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${fugue.variable} ${fugueHeadline.variable} ${fugueMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#content"
          className="sr-only absolute left-4 top-4 z-50 border border-[var(--color-border-strong)] bg-[var(--color-panel-strong)] px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-text)] focus:not-sr-only"
        >
          Перейти к контенту
        </a>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="noise-overlay" aria-hidden="true" />
          <SiteHeader />
          <main id="content" className="site-frame relative z-10 pb-12 pt-4">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
