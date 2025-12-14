"use client";

import { useState } from "react";
import { 
  ExternalLink, 
  Mail, 
  Cloud, 
  LayoutGrid, 
  FileText, 
  Monitor, 
  Table, 
  Presentation, 
  BarChart3,
  HardDrive
} from "lucide-react";

// 定義服務類型介面
interface ServiceItem {
  name: string;
  icon: React.ReactNode;
  url: string;
  desc: string;
  type: "microsoft" | "google"; 
}

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  // 網域設定
  const MS_DOMAIN = "live.yuntech.edu.tw";
  const GOOGLE_DOMAIN = "gemail.yuntech.edu.tw"; 
  const MS_SHAREPOINT_PREFIX = "liveyuntechedu"; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value.toUpperCase().trim());
    setError("");
  };

  // 微軟 OneDrive 特殊路徑生成
  const generateOneDriveUrl = (email: string) => {
    const userPath = email.replace(/[@.]/g, "_").toLowerCase();
    return `https://${MS_SHAREPOINT_PREFIX}-my.sharepoint.com/personal/${userPath}/_layouts/15/onedrive.aspx?login_hint=${encodeURIComponent(email)}&view=1`;
  };

  // 統一跳轉處理
  const handleRedirect = (service: ServiceItem) => {
    if (!studentId) {
      setError("請先輸入學號！");
      return;
    }

    let email = "";
    let finalUrl = "";

    // 1. 根據服務類型決定 Email 網域
    if (service.type === "microsoft") {
      // 處理微軟 Email
      email = studentId.includes("@") ? studentId : `${studentId}@${MS_DOMAIN}`;
      
      // 處理微軟 URL
      if (service.url === "ONEDRIVE_SPECIAL") {
        finalUrl = generateOneDriveUrl(email);
      } else {
        // 自動判斷是用 ? 或 & 連接參數
        const separator = service.url.includes("?") ? "&" : "?";
        finalUrl = `${service.url}${separator}login_hint=${encodeURIComponent(email)}`;
      }

    } else if (service.type === "google") {
      // 處理 Google Email
      const cleanId = studentId.split("@")[0]; 
      email = `${cleanId}@${GOOGLE_DOMAIN}`;

      // Google URL 處理
      finalUrl = `https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(email)}&continue=${encodeURIComponent(service.url)}`;
    }

    // 2. 開新視窗
    window.open(finalUrl, "_blank");
  };

  // 服務列表
  const services: ServiceItem[] = [
    // --- Microsoft 區塊 ---
    {
      name: "Microsoft Apps", // 已改名
      icon: <LayoutGrid className="w-8 h-8 mb-2 text-indigo-900" />,
      // 這裡只需放基礎網址，程式會自動補上 ?login_hint=...
      url: "https://m365.cloud.microsoft/apps/", 
      desc: "應用程式總覽",
      type: "microsoft"
    },
    {
      name: "Outlook",
      icon: <Mail className="w-8 h-8 mb-2 text-blue-600" />,
      url: "https://outlook.cloud.microsoft/mail/",
      desc: "微軟信箱 (Live)",
      type: "microsoft"
    },
    {
      name: "OneDrive",
      icon: <Cloud className="w-8 h-8 mb-2 text-sky-500" />,
      url: "ONEDRIVE_SPECIAL",
      desc: "微軟雲端硬碟 (1TB)",
      type: "microsoft"
    },
    {
      name: "Teams",
      icon: <Monitor className="w-8 h-8 mb-2 text-indigo-600" />,
      url: "https://teams.cloud.microsoft/",
      desc: "線上會議/課程",
      type: "microsoft"
    },
    // --- Google 區塊 ---
    {
      name: "GMail",
      icon: <Mail className="w-8 h-8 mb-2 text-red-600" />, 
      url: "https://mail.google.com/",
      desc: "學校 GMail 信箱",
      type: "google"
    },
    {
      name: "Google Drive",
      icon: <HardDrive className="w-8 h-8 mb-2 text-green-600" />, 
      url: "https://drive.google.com/",
      desc: "Google 雲端硬碟",
      type: "google"
    },
    // --- 其他 Office ---
    {
      name: "Word",
      icon: <FileText className="w-8 h-8 mb-2 text-blue-800" />,
      url: "https://word.cloud.microsoft/",
      desc: "文件編輯",
      type: "microsoft"
    },
    {
      name: "Excel",
      icon: <Table className="w-8 h-8 mb-2 text-green-700" />,
      url: "https://excel.cloud.microsoft/",
      desc: "試算表",
      type: "microsoft"
    },
    {
      name: "PowerPoint",
      icon: <Presentation className="w-8 h-8 mb-2 text-orange-600" />,
      url: "https://powerpoint.cloud.microsoft/",
      desc: "簡報製作",
      type: "microsoft"
    },
    {
      name: "Power BI",
      icon: <BarChart3 className="w-8 h-8 mb-2 text-yellow-600" />,
      url: "https://app.powerbi.com/",
      desc: "數據分析",
      type: "microsoft"
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header 區塊 */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">雲科大 數位服務傳送門</h1>
          <p className="opacity-90">整合 Microsoft 365 與 Google Workspace • 輸入學號一鍵登入</p>
        </div>

        {/* 輸入區塊 */}
        <div className="p-8 pb-4">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              請輸入學號
            </label>
            <div className="relative">
              <input
                type="text"
                value={studentId}
                onChange={handleInputChange}
                placeholder="例如：B11123021"
                // 這裡加入了 text-gray-900 (深色文字), bg-white (白底), caret-emerald-600 (綠色游標)
                className="w-full px-4 py-3 text-lg text-gray-900 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase placeholder:normal-case caret-emerald-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRedirect(services[1]); // Enter 預設進 Outlook
                  }
                }}
              />
              <div className="absolute right-3 top-3.5 text-gray-400 font-mono text-sm pointer-events-none">
                自動切換網域
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
            <p className="text-xs text-gray-400 mt-2 text-center">
              微軟服務帶入 @{MS_DOMAIN} <br/>
              Google 服務帶入 @{GOOGLE_DOMAIN}
            </p>
          </div>
        </div>

        {/* 服務列表區塊 */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => handleRedirect(service)}
                className={`flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 group text-center h-40 relative overflow-hidden cursor-pointer
                  ${service.type === 'google' ? 'hover:border-red-200 hover:bg-red-50/30' : 'hover:border-blue-200 hover:bg-blue-50/30'}
                `}
              >
                {/* 標籤：區分 Google / MS */}
                <div className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded
                  ${service.type === 'google' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}
                `}>
                  {service.type === 'google' ? 'Google' : 'MS'}
                </div>

                <div className="transform group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{service.name}</h3>
                <p className="text-xs text-gray-500">{service.desc}</p>
                <div className={`mt-2 text-xs opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity
                   ${service.type === 'google' ? 'text-red-600' : 'text-blue-600'}
                `}>
                  Open <ExternalLink size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center text-xs text-gray-500">
          非官方服務 • 自動整合 live 與 gemail 雙網域系統
        </div>
      </div>
    </main>
  );
}