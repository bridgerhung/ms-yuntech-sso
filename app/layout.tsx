import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 🟢 新增這一行：設定網站的基礎網址 (請換成你實際的 Vercel 網址或自訂網域)
  metadataBase: new URL("https://live.brid.pw"), 
  title: "雲科大 數位服務傳送門 | YunTech Digital Portal",
  description: "國立雲林科技大學專屬數位服務入口，整合校務單一入口、Microsoft 365 (Outlook, OneDrive) 與 Google Workspace (Gmail, Drive)，提供一鍵快速登入服務。",
  keywords: ["雲科大", "YunTech", "數位服務", "單一入口", "B11123021", "Microsoft 365", "Google Workspace"],
  icons: {
    icon: "https://webapp.yuntech.edu.tw/favicon.ico",
    shortcut: "https://webapp.yuntech.edu.tw/favicon.ico",
    apple: "https://webapp.yuntech.edu.tw/favicon.ico",
  },
  openGraph: {
    title: "雲科大 微軟服務傳送門",
    description: "微軟服務自動帶入 @live.yuntech.edu.tw",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // 因為有了 metadataBase，這裡會自動組合成 https://sso.brid.pw/og-image.jpg
        width: 1200,
        height: 630,
        alt: "雲科大數位服務傳送門預覽圖",
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