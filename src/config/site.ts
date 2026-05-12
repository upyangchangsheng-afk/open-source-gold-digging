// 构建时由 transform-data.js 从 status.json 生成
let lastUpdate: string | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const status = require('../data/site-status.json');
  lastUpdate = status.lastUpdate || null;
} catch {
  // 文件不存在时忽略（开发模式）
}

export const site = {
  name: '开源挖宝',
  tagline: '用AI开源工具做能赚钱的小生意',
  description:
    '不只告诉你「能赚钱」——更告诉你第1天做什么、用什么工具、多久能接第一单。真实市场数据驱动，可操作的行动路线图。',
  url: 'https://open-source-gold-digging.vercel.app',
  author: '子龙酱思维重启',
  authorTitle: '独立AI项目分析师',
  lastUpdate,

  nav: [
    { label: '首页', href: '/' },
    { label: '商业场景', href: '/' },
    { label: '项目库', href: '/discover' },
    { label: '关于', href: '/about' },
    { label: '订阅', href: '/subscribe' },
  ],

  social: {
    email: 'upyangchangsheng@gmail.com',
    github: 'upyangchangsheng-afk',
    xiaohongshu: '子龙酱思维重启',
    douyin: '子龙酱思维重启',
  },
} as const;
