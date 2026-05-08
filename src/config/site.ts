export const site = {
  name: '开源挖宝',
  tagline: '发现能赚钱的AI开源项目',
  description:
    '不只是告诉你"这是什么"，更告诉你"能不能赚钱、怎么做"。每周推荐3个能赚钱的AI开源项目。',
  url: 'https://open-source-gold-digging.vercel.app',
  author: '[你的ID]',
  authorTitle: '独立AI项目分析师',

  nav: [
    { label: '首页', href: '/' },
    { label: '发现项目', href: '/discover' },
    { label: '关于', href: '/about' },
    { label: '订阅', href: '/subscribe' },
  ],

  social: {
    email: '[email]',
    github: '[用户名]',
    v2ex: '[用户名]',
    xiaohongshu: '[账号名]',
    jike: '[账号名]',
  },
} as const;
