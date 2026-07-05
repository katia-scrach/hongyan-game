export const identities = [
  {
    id: 'product',
    name: '产品设计与运营部',
    icon: 'FileText',
    color: 'bg-blue-500',
    description: '结合数据分析，挖掘用户需求，产出PRD文档，精心绘制出产品的宏伟蓝图。活跃于各部门之间，是促进各部门沟通的桥梁。',
    detail: '利用AXURE、墨刀等工具绘制原型图，在新媒体平台运营网校官方账号、创作优秀文案，制定活动策划。',
    stageIndex: 1
  },
  {
    id: 'visual',
    name: '视觉设计部',
    icon: 'Palette',
    color: 'bg-purple-500',
    description: '将产品原型视觉转化，在设计中追求美观，注重用户体验，确保每一个设计都能带给用户流畅而愉悦的交互感受。',
    detail: '设计网校的IP形象，绘制易拉宝、海报，利用PHOTOSHOP等设计软件制造出令人赞叹的视觉作品。',
    stageIndex: 2
  },
  {
    id: 'frontend',
    name: '前端研发部',
    icon: 'Code',
    color: 'bg-green-500',
    description: '利用HTML/CSS/JAVASCRIPT等前端开发的核心工具，针对PC端、移动端等不同的交互界面，采用不同的交互风格与技术。',
    detail: '将视觉设计中的无限创意通过精确的代码转化为生动的交互页面，创造出既美观又实用的网站和应用。',
    stageIndex: 3
  },
  {
    id: 'backend',
    name: '后端研发部',
    icon: 'Server',
    color: 'bg-orange-500',
    description: '深入理解产品背后的实际需求，将其转化为准确的数据模型和清晰的业务逻辑。',
    detail: '利用GOLANG等强大的开发语言，与数据库进行高效的交互，执行严格的数据分析和处理。',
    stageIndex: 4
  },
  {
    id: 'mobile',
    name: '移动开发部',
    icon: 'Smartphone',
    color: 'bg-pink-500',
    description: '深入研究APP开发精髓，用精湛的技艺雕琢着应用的框架，是引领创新的先锋。',
    detail: '利用JAVA/KOTLIN为ANDROID平台注入活力，或运用OBJECTIVE-C、SWIFT为IOS平台打造卓越的用户体验。',
    stageIndex: 5
  },
  {
    id: 'operations',
    name: '运维安全部',
    icon: 'Shield',
    color: 'bg-yellow-500',
    description: '肩负维护网校的服务器稳定性、安全性的重要使命，确保服务器运行如磐石般坚固、可靠。',
    detail: '参与新项目的部署工作，对环境进行安全配置，对系统进行持续的优化，利用LINUX应对潜在的各种风险和漏洞。',
    stageIndex: 6
  },
  {
    id: 'director',
    name: '站长',
    icon: 'Crown',
    color: 'bg-red-600',
    description: '运筹帷幄，决胜千里！作为站长，你负责下达任务，监督各部门进度。',
    detail: '选择任务方向后，进入OKR看板实时监控各部门工作进度，见证产品从0到1的诞生。',
    stageIndex: -2
  },
  {
    id: 'solo',
    name: '一个人就是一个团队',
    icon: 'Zap',
    color: 'bg-indigo-600',
    description: '挑战极限！体验从任务发布到产品上线的完整流程，一个人搞定所有环节。',
    detail: '从产品设计到运维安全，你将独自完成整个产品开发流程，成为真正的全栈人才！',
    stageIndex: -1
  }
]

export const stages = [
  {
    id: 'task',
    name: '任务发布',
    icon: 'Send',
    type: 'minister',
    description: '站长，新的任务来了，请选择一个方向！',
    questions: [
      {
        id: 'task_type',
        title: '请选择发送任务',
        options: [
          { id: 'A', label: '甲方爸爸来活了！', value: '为XX公司设计一款产品', description: '接到甲方的要求了，快来赚钱朋友们！' },
          { id: 'B', label: '小登们快来！', value: '展示魅力，吸引小登', description: '又一年招新，快来吸引小登朋友们！' },
          { id: 'C', label: '搞点内部优化', value: '掌上重邮迭代', description: '找点事干，快来内部优化朋友们！' }
        ]
      }
    ],
    defaultChoice: { task_type: 'A' }
  },
  {
    id: 'product',
    name: '产品设计与运营',
    icon: 'FileText',
    type: 'department',
    description: '产品部收到任务，开始规划产品蓝图！',
    questions: [
      {
        id: 'product_type',
        title: '产品综合设计',
        options: [
          { id: 'A', label: '工具型产品', value: '像计算器一样实用', description: '专注解决用户特定需求' },
          { id: 'B', label: '服务型产品', value: '像外卖一样贴心', description: '提供全方位服务体验' },
          { id: 'C', label: '信息介绍型产品', value: '像展览馆一样好看', description: '精美展示各类信息' }
        ]
      },
      {
        id: 'layout',
        title: '原型图绘制',
        options: [
          { id: 'A', label: '卡片式布局', value: '像朋友圈一样', description: '信息一目了然', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mobile%20app%20card%20layout%20design%20mockup%20modern%20UI&image_size=square' },
          { id: 'B', label: '通栏布局', value: '像报纸一样', description: '视觉冲击力强', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=website%20full%20width%20banner%20layout%20design%20mockup%20modern&image_size=landscape_16_9' },
          { id: 'C', label: '瀑布流布局', value: '像小红书一样', description: '浏览体验流畅', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=masonry%20waterfall%20grid%20layout%20design%20mockup%20modern&image_size=square' }
        ]
      },
      {
        id: 'operation',
        title: '运营方案',
        options: [
          { id: 'A', label: '线上推广', value: '朋友圈刷屏', description: '社交媒体全方位轰炸' },
          { id: 'B', label: '线下活动', value: '摆摊发传单', description: '校园内搞事情' },
          { id: 'C', label: '线上线下双线进行', value: '海陆空齐上阵', description: '全方位覆盖' }
        ]
      }
    ],
    defaultChoice: { product_type: 'A', layout: 'A', operation: 'A' }
  },
  {
    id: 'visual',
    name: '视觉设计',
    icon: 'Palette',
    type: 'department',
    description: '设计部开始施展魔法，让产品焕然一新！',
    questions: [
      {
        id: 'style',
        title: '优化原型图',
        options: [
          { id: 'A', label: '圆润可爱', value: '像泡泡一样', description: '柔和亲切的视觉感受' },
          { id: 'B', label: '方方正正', value: '像积木一样', description: '简洁干练的设计风格' },
          { id: 'C', label: '混搭风格', value: '像乐高一样', description: '创意无限的组合设计' }
        ]
      },
      {
        id: 'color',
        title: '涂色方案',
        options: [
          { id: 'A', label: '热情红', value: '像火锅一样', description: '活力四射，引人注目', color: '#D93025' },
          { id: 'B', label: '科技蓝', value: '像天空一样', description: '冷静专业，科技感十足', color: '#4285F4' },
          { id: 'C', label: '纯净白', value: '像云朵一样', description: '简洁优雅，干净清爽', color: '#FFFFFF' }
        ]
      }
    ],
    defaultChoice: { style: 'A', color: 'A' }
  },
  {
    id: 'frontend',
    name: '前端研发',
    icon: 'Code',
    type: 'department',
    description: '前端工程师开始敲代码，把设计变成现实！',
    questions: [
      {
        id: 'effect',
        title: '动效风格',
        options: [
          { id: 'A', label: '简单清爽', value: '像微风一样', description: '流畅自然，不喧宾夺主' },
          { id: 'B', label: '炫酷动画', value: '像烟花一样', description: '华丽夺目，视觉盛宴' },
          { id: 'C', label: '交互丰富', value: '像游乐场一样', description: '趣味十足，爱不释手' }
        ]
      },
      {
        id: 'adapt',
        title: '适配策略',
        options: [
          { id: 'A', label: '手机优先', value: '躺着玩', description: '移动端体验最佳' },
          { id: 'B', label: '电脑优先', value: '坐着玩', description: '桌面端体验最佳' },
          { id: 'C', label: '两者兼顾', value: '想咋玩咋玩', description: '全平台完美适配' }
        ]
      }
    ],
    defaultChoice: { effect: 'A', adapt: 'A' }
  },
  {
    id: 'backend',
    name: '后端研发',
    icon: 'Server',
    type: 'department',
    description: '后端工程师搭建数据支撑，让产品运转起来！',
    questions: [
      {
        id: 'database',
        title: '数据存储方案',
        options: [
          { id: 'A', label: '稳定可靠', value: '像保险柜一样', description: '数据安全有保障' },
          { id: 'B', label: '灵活多变', value: '像变形金刚一样', description: '随时调整适应需求' },
          { id: 'C', label: '高速闪电', value: '像火箭一样', description: '响应速度飞快' }
        ]
      },
      {
        id: 'architecture',
        title: '系统架构',
        options: [
          { id: 'A', label: '简单直接', value: '像直饮水一样', description: '结构清晰，易于维护' },
          { id: 'B', label: '分工明确', value: '像流水线一样', description: '各司其职，高效协作' },
          { id: 'C', label: '云端部署', value: '像孙悟空一样', description: '灵活扩展，无处不在' }
        ]
      }
    ],
    defaultChoice: { database: 'A', architecture: 'A' }
  },
  {
    id: 'mobile',
    name: '移动开发',
    icon: 'Smartphone',
    type: 'department',
    description: '移动开发工程师为手机端注入灵魂！',
    questions: [
      {
        id: 'dev_type',
        title: '开发方式',
        options: [
          { id: 'A', label: '原生开发', value: '量身定制', description: '性能最佳，体验最棒' },
          { id: 'B', label: '跨平台开发', value: '一招鲜吃遍天', description: '一套代码，多端运行' },
          { id: 'C', label: 'H5嵌入', value: '灵活轻便', description: '快速迭代，更新方便' }
        ]
      },
      {
        id: 'feature',
        title: '特色功能',
        options: [
          { id: 'A', label: '手势操作', value: '酷炫交互', description: '滑动、捏合，玩出花样' },
          { id: 'B', label: '推送通知', value: '贴心提醒', description: '重要消息，及时送达' },
          { id: 'C', label: '离线使用', value: '随时随地', description: '没网也能玩' }
        ]
      }
    ],
    defaultChoice: { dev_type: 'A', feature: 'A' }
  },
  {
    id: 'operations',
    name: '运维安全',
    icon: 'Shield',
    type: 'department',
    description: '运维工程师保驾护航，确保系统稳定安全！',
    questions: [
      {
        id: 'server',
        title: '服务器架构',
        options: [
          { id: 'A', label: '单机模式', value: '独苗', description: '简单直接，成本低廉' },
          { id: 'B', label: '集群模式', value: '团队', description: '互为备份，稳定可靠' },
          { id: 'C', label: '云原生', value: '未来感', description: '弹性伸缩，智能调度' }
        ]
      },
      {
        id: 'security',
        title: '安全防护',
        options: [
          { id: 'A', label: '基础防护', value: '戴口罩', description: '常规防护，防患未然' },
          { id: 'B', label: '深度防御', value: '穿防弹衣', description: '多重关卡，严防死守' },
          { id: 'C', label: '全链路安全', value: '钢铁侠', description: '360度无死角防护' }
        ]
      }
    ],
    defaultChoice: { server: 'A', security: 'A' }
  }
]

export const results = {
  product: {
    title: '产品策划大师',
    description: '你凭借出色的产品思维，成功规划了一款优秀的产品！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=product%20manager%20celebrating%20successful%20product%20launch%20modern%20office&image_size=square',
    badge: '🎯'
  },
  visual: {
    title: '视觉设计大神',
    description: '你的设计惊艳全场，让产品焕发出独特魅力！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=graphic%20designer%20showing%20beautiful%20design%20work%20creative%20studio&image_size=square',
    badge: '🎨'
  },
  frontend: {
    title: '前端技术达人',
    description: '代码在你手中变成了艺术品，完美呈现设计效果！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=frontend%20developer%20coding%20on%20multiple%20screens%20modern%20tech%20office&image_size=square',
    badge: '💻'
  },
  backend: {
    title: '后端架构师',
    description: '你搭建的系统稳固如山，数据流转顺畅无比！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=backend%20developer%20server%20infrastructure%20cloud%20computing%20data%20center&image_size=square',
    badge: '⚙️'
  },
  mobile: {
    title: '移动开发专家',
    description: '你的APP让用户爱不释手，体验堪称完美！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mobile%20app%20developer%20showing%20smartphone%20app%20interface%20modern&image_size=square',
    badge: '📱'
  },
  operations: {
    title: '运维安全卫士',
    description: '有你守护，系统固若金汤，安全无忧！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cybersecurity%20expert%20monitoring%20network%20security%20dark%20control%20room&image_size=square',
    badge: '🛡️'
  },
  director: {
    title: '卓越站长',
    description: '你运筹帷幄，成功领导各部门完成了产品开发！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=team%20leader%20monitoring%20project%20dashboard%20modern%20office%20command%20center&image_size=square',
    badge: '👑'
  },
  solo: {
    title: '全栈超人',
    description: '你一个人完成了所有环节，真正的全栈人才！',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=super%20developer%20working%20on%20multiple%20projects%20hero%20mode%20modern%20tech&image_size=square',
    badge: '⚡'
  }
}

export const hongyanIntro = {
  title: '红岩网校工作站',
  subtitle: '互联网产品开发运营的校级学生组织',
  description: '在校团委的指导下走出了一大批优秀的互联网人才，深受腾讯、字节跳动、百度等知名互联网企业青睐。',
  backstory: '曾经，有一份真挚的offer摆在我的面前，我没有珍惜，直到失去才追悔莫及。重来一世，我要......'
}
