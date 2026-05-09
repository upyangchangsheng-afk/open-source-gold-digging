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
  tagline: '发现能赚钱的AI开源项目',
  description:
    '不只是告诉你"这是什么"，更告诉你"能不能赚钱、怎么做"。每周推荐3个能赚钱的AI开源项目。',
  url: 'https://open-source-gold-digging.vercel.app',
  author: '子龙酱思维重启',
  authorTitle: '独立AI项目分析师',
  lastUpdate,

  nav: [
    { label: '首页', href: '/' },
    { label: '发现项目', href: '/discover' },
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
