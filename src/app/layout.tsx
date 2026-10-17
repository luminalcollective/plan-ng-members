import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PLAN | Membership Status Checker",
  description:
    "Verify your membership status with the Pipeline Professionals' Association of Nigeria (PLAN).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" data-theme="light">
      <body>{children}</body>
    </html>
  );
}