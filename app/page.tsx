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
  HardDrive,
  ShieldCheck
} from "lucide-react";

// 定義服務類型介面
interface ServiceItem {
  name: string;
  icon: React.ReactNode;
  url: string;
  desc: string;
  type: "microsoft" | "google" | "school"; // 新增 school 類型
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

  const generateOneDriveUrl = (email: string) => {
    const userPath = email.replace(/[@.]/g, "_").toLowerCase();
    return `https://${MS_SHAREPOINT_PREFIX}-my.sharepoint.com/personal/${userPath}/_layouts/15/onedrive.aspx?login_hint=${encodeURIComponent(email)}&view=1`;
  };

  const handleRedirect = (service: ServiceItem) => {
    // 學校單一入口不需要學號參數，直接跳轉
    if (service.type === "school") {
      window.open(service.url, "_blank");
      return;
    }

    // 其他服務需要學號
    if (!studentId) {
      setError("請先輸入學號！");
      return;
    }

    let email = "";
    let finalUrl = "";

    if (service.type === "microsoft") {
      email = studentId.includes("@") ? studentId : `${studentId}@${MS_DOMAIN}`;
      
      if (service.url === "ONEDRIVE_SPECIAL") {
        finalUrl = generateOneDriveUrl(email);
      } else {
        const separator = service.url.includes("?") ? "&" : "?";
        finalUrl = `${service.url}${separator}login_hint=${encodeURIComponent(email)}`;
      }

    } else if (service.type === "google") {
      const cleanId = studentId.split("@")[0]; 
      email = `${cleanId}@${GOOGLE_DOMAIN}`;
      finalUrl = `https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(email)}&continue=${encodeURIComponent(service.url)}`;
    }

    window.open(finalUrl, "_blank");
  };

  // 服務列表
  const services: ServiceItem[] = [
    // --- 學校官方區塊 (置頂) ---
    {
      name: "單一入口", 
      // 使用 img 標籤直接顯示 Logo
      icon: <img 
        src="https://www-static.yuntech.edu.tw/images/mainmenu/about/yuntech_logo.jpg" 
        alt="YunTech Logo" 
        className="w-8 h-8 object-contain" 
      />,
      url: "https://webapp.yuntech.edu.tw", 
      desc: "教務/學務/選課系統",
      type: "school"
    },
    // --- Microsoft 區塊 ---
    {
      name: "Microsoft Apps", 
      icon: <LayoutGrid className="w-8 h-8 mb-2 text-indigo-900" />,
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

  // 輔助函式：取得卡片樣式
  const getCardStyle = (type: string) => {
    switch (type) {
      case 'google':
        return 'hover:border-red-200 hover:bg-red-50/30';
      case 'microsoft':
        return 'hover:border-blue-200 hover:bg-blue-50/30';
      case 'school':
        return 'hover:border-emerald-500 hover:bg-emerald-50/30 border-emerald-100 bg-emerald-50/10'; // 學校專屬綠色系
      default:
        return 'hover:border-gray-200';
    }
  };

  // 輔助函式：取得標籤樣式
  const getLabelStyle = (type: string) => {
    switch (type) {
      case 'google': return 'bg-red-100 text-red-600';
      case 'microsoft': return 'bg-blue-100 text-blue-600';
      case 'school': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header 區塊 */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">雲科大 數位服務傳送門</h1>
          <p className="opacity-90">整合 單一入口 • Microsoft 365 • Google Workspace</p>
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
                className="w-full px-4 py-3 text-lg text-gray-900 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase placeholder:normal-case caret-emerald-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRedirect(services[1]); // Enter 預設進 Outlook (或可改成 services[0] 進單一入口)
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => handleRedirect(service)}
                className={`flex flex-col items-center justify-center p-6 bg-white border rounded-xl hover:shadow-md transition-all duration-200 group text-center h-40 relative overflow-hidden cursor-pointer
                  ${getCardStyle(service.type)}
                  ${service.type === 'school' ? 'border-emerald-200 shadow-sm' : 'border-gray-200'} 
                `}
              >
                {/* 標籤：區分 Google / MS / School */}
                <div className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded
                  ${getLabelStyle(service.type)}
                `}>
                  {service.type === 'google' ? 'Google' : service.type === 'school' ? 'Official' : 'MS'}
                </div>

                <div className="transform group-hover:scale-110 transition-transform duration-200 mb-2">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{service.name}</h3>
                <p className="text-xs text-gray-500">{service.desc}</p>
                <div className={`mt-2 text-xs opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity
                   ${service.type === 'google' ? 'text-red-600' : service.type === 'school' ? 'text-emerald-600' : 'text-blue-600'}
                `}>
                  Open <ExternalLink size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer & Privacy 區塊 */}
        <div className="bg-gray-100 p-6 text-center text-xs text-gray-500">
          <p className="mb-4">非官方服務 • 自動整合 live 與 gemail 雙網域系統</p>
          
          <div className="max-w-lg mx-auto bg-white/60 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-1 text-emerald-700 font-bold">
              <ShieldCheck size={14} />
              <span>個資聲明</span>
            </div>
            <p className="leading-relaxed text-gray-600">
              本服務純靜態，所有資料處理皆在您的裝置上完成，<br/>
              伺服器<span className="font-bold text-gray-800">絕不保存</span>您的學號或密碼。
            </p>
          </div>

          <p>
            聯絡表單：
            <a 
              href="https://mail.brid.pw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-800 hover:underline transition-colors ml-1 font-medium"
            >
              B11123021@yuntech.edu.tw
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}