'use client';

import { useState } from 'react';
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
} from 'lucide-react';

export default function Home() {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  // 網域與 Tenant 設定
  const DOMAIN = 'live.yuntech.edu.tw';
  const SHAREPOINT_PREFIX = 'liveyuntechedu';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value.toUpperCase().trim());
    setError('');
  };

  const generateOneDriveUrl = (email: string) => {
    // OneDrive 底層儲存路徑目前仍主要使用 sharepoint.com 結構
    const userPath = email.replace(/[@.]/g, '_').toLowerCase();
    return `https://${SHAREPOINT_PREFIX}-my.sharepoint.com/personal/${userPath}/_layouts/15/onedrive.aspx?login_hint=${encodeURIComponent(
      email
    )}&view=1`;
  };

  const handleRedirect = (serviceUrl: string, serviceName: string) => {
    if (!studentId) {
      setError('請先輸入學號！');
      return;
    }

    let email = studentId.includes('@') ? studentId : `${studentId}@${DOMAIN}`;
    let targetUrl = '';

    if (serviceName === 'OneDrive') {
      targetUrl = generateOneDriveUrl(email);
    } else {
      // 判斷網址是否已經有參數，決定用 ? 或 & 連接
      const separator = serviceUrl.includes('?') ? '&' : '?';
      targetUrl = `${serviceUrl}${separator}login_hint=${encodeURIComponent(
        email
      )}`;
    }

    window.open(targetUrl, '_blank');
  };

  // 服務列表
  const services = [
    {
      name: 'Microsoft 365',
      icon: <LayoutGrid className="w-8 h-8 mb-2 text-indigo-900" />,
      url: 'https://www.microsoft365.com/',
      desc: '應用程式總覽',
    },
    {
      name: 'Outlook',
      icon: <Mail className="w-8 h-8 mb-2 text-blue-600" />,
      url: 'https://outlook.cloud.microsoft/mail/',
      desc: '學校 Email',
    },
    {
      name: 'OneDrive',
      icon: <Cloud className="w-8 h-8 mb-2 text-sky-500" />,
      url: 'ONEDRIVE_SPECIAL',
      desc: '個人雲端硬碟',
    },
    {
      name: 'Teams',
      icon: <Monitor className="w-8 h-8 mb-2 text-indigo-600" />,
      url: 'https://teams.cloud.microsoft/',
      desc: '線上會議/課程',
    },
    {
      name: 'Word',
      icon: <FileText className="w-8 h-8 mb-2 text-blue-800" />,
      url: 'https://word.cloud.microsoft/',
      desc: '文件編輯',
    },
    {
      name: 'Excel',
      icon: <Table className="w-8 h-8 mb-2 text-green-700" />,
      url: 'https://excel.cloud.microsoft/',
      desc: '試算表',
    },
    {
      name: 'PowerPoint',
      icon: <Presentation className="w-8 h-8 mb-2 text-orange-600" />,
      url: 'https://powerpoint.cloud.microsoft/',
      desc: '簡報製作',
    },
    {
      name: 'Power BI',
      icon: <BarChart3 className="w-8 h-8 mb-2 text-yellow-600" />,
      url: 'https://app.powerbi.com/',
      desc: '數據分析與視覺化',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header 區塊 */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">
            雲科大 Microsoft 365 傳送門
          </h1>
          <p className="opacity-90">
            支援 cloud.microsoft 與 Power Platform • 一鍵直達
          </p>
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
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase placeholder:normal-case"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRedirect(services[1].url, services[1].name);
                  }
                }}
              />
              <div className="absolute right-3 top-3.5 text-gray-400 font-mono text-sm pointer-events-none">
                @{DOMAIN}
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
            )}
          </div>
        </div>

        {/* 服務列表區塊 */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100">
          {/* 調整 Grid: 手機2欄，平板3欄，電腦4欄，以容納8個項目 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => handleRedirect(service.url, service.name)}
                className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 group text-center h-40"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{service.name}</h3>
                <p className="text-xs text-gray-500">{service.desc}</p>
                <div className="mt-2 text-xs text-emerald-600 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                  Open <ExternalLink size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center text-xs text-gray-500">
          非官方服務 • 使用 Microsoft 最新雲端架構 (cloud.microsoft)
        </div>
      </div>
    </main>
  );
}
