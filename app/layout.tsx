import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "雲科大 數位服務傳送門 | YunTech Digital Portal",
  description: "國立雲林科技大學專屬數位服務入口，整合校務單一入口、Microsoft 365 (Outlook, OneDrive) 與 Google Workspace (Gmail, Drive)，提供一鍵快速登入服務。",
  keywords: ["雲科大", "YunTech", "數位服務", "單一入口", "B11123021", "Microsoft 365", "Google Workspace"],
  // 設定網站圖示
  icons: {
    icon: "https://webapp.yuntech.edu.tw/favicon.ico",
    shortcut: "https://webapp.yuntech.edu.tw/favicon.ico",
    apple: "https://webapp.yuntech.edu.tw/favicon.ico", // 作為手機加入主畫面的圖示後備
  },
  openGraph: {
    title: "雲科大 數位服務傳送門",
    description: "雲科大學生專屬的快速登入儀表板。",
    type: "website",
    images: [
      {
        url: "https://www-static.yuntech.edu.tw/images/mainmenu/about/yuntech_logo.jpg", // OG 分享預覽圖維持大張的 Logo
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>{children}</body>
    </html>
  );
}