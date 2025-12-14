import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 這裡是爬蟲讀取的重點區塊
export const metadata: Metadata = {
  title: "雲科大 數位服務傳送門 | YunTech Digital Portal",
  description: "國立雲林科技大學專屬數位服務入口，整合校務單一入口、Microsoft 365 (Outlook, OneDrive) 與 Google Workspace (Gmail, Drive)，提供一鍵快速登入服務。",
  icons: {
    icon: "https://www-static.yuntech.edu.tw/images/mainmenu/about/yuntech_logo.jpg", // 瀏覽器分頁的小圖示
  },
  openGraph: {
    title: "雲科大 數位服務傳送門",
    description: "雲科大教職員生專屬的快速登入儀表板。",
    type: "website",
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