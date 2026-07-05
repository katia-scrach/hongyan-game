import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
const stages = [
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
        story: '甲方爸爸发来需求，要求设计一款全新的校园应用。作为产品经理，你需要先确定产品的定位——是帮同学们解决实际问题的工具，还是提供贴心服务的平台，亦或是展示校园风采的窗口？',
        options: [
          { id: 'A', label: '工具型产品', value: '像计算器一样实用', description: '专注解决用户特定需求' }, 
          { id: 'B', label: '服务型产品', value: '像外卖一样贴心', description: '提供全方位服务体验' }, 
          { id: 'C', label: '信息介绍型产品', value: '像展览馆一样好看', description: '精美展示各类信息' }
        ] 
      },
      { 
        id: 'layout', 
        title: '原型图绘制', 
        story: '产品定位确定后，你需要画出原型图。面对白板，你思考着什么样的布局最适合这款产品——是信息清晰的卡片式，还是视觉冲击强的通栏式，亦或是浏览体验流畅的瀑布流式？',
        options: [
          { id: 'A', label: '卡片式布局', value: '像朋友圈一样', description: '信息一目了然' }, 
          { id: 'B', label: '通栏布局', value: '像报纸一样', description: '视觉冲击力强' }, 
          { id: 'C', label: '瀑布流布局', value: '像小红书一样', description: '浏览体验流畅' }
        ] 
      },
      { 
        id: 'operation', 
        title: '运营方案', 
        story: '产品即将上线，运营方案必不可少。你需要制定一套推广策略——是在社交媒体上刷屏吸引眼球，还是在校园里摆摊发传单搞线下活动，亦或是双线并进全方位覆盖？',
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
        story: '产品部的原型图送到了设计部。看着这些黑白线框，你开始思考如何让它们变得生动有趣。是让界面圆润可爱像泡泡一样，还是保持方方正正简洁干练，亦或是混搭风格创意无限？',
        options: [
          { id: 'A', label: '圆润可爱', value: '像泡泡一样', description: '柔和亲切的视觉感受' }, 
          { id: 'B', label: '方方正正', value: '像积木一样', description: '简洁干练的设计风格' }, 
          { id: 'C', label: '混搭风格', value: '像乐高一样', description: '创意无限的组合设计' }
        ] 
      },
      { 
        id: 'color', 
        title: '涂色方案', 
        story: '风格确定后，配色是关键。你看着色板，思考什么样的颜色最能体现产品气质——是热情似火的红色，还是冷静专业的蓝色，亦或是纯净优雅的白色？',
        options: [
          { id: 'A', label: '热情红', value: '像火锅一样', description: '活力四射，引人注目' }, 
          { id: 'B', label: '科技蓝', value: '像天空一样', description: '冷静专业，科技感十足' }, 
          { id: 'C', label: '纯净白', value: '像云朵一样', description: '简洁优雅，干净清爽' }
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
        story: '设计稿已经完成，现在轮到前端登场。你开始思考界面动效——是追求简单清爽不喧宾夺主，还是打造炫酷动画视觉盛宴，亦或是设计丰富交互让用户爱不释手？',
        options: [
          { id: 'A', label: '简单清爽', value: '像微风一样', description: '流畅自然，不喧宾夺主' }, 
          { id: 'B', label: '炫酷动画', value: '像烟花一样', description: '华丽夺目，视觉盛宴' }, 
          { id: 'C', label: '交互丰富', value: '像游乐场一样', description: '趣味十足，爱不释手' }
        ] 
      },
      { 
        id: 'adapt', 
        title: '适配策略', 
        story: '动效确定后，适配策略也很重要。面对手机和电脑两种屏幕，你决定——是优先优化手机端让用户躺着玩，还是专注电脑端让用户坐着玩，亦或是两者兼顾让用户想咋玩咋玩？',
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
        story: '前端界面已经成型，现在需要后端支撑。面对海量数据，你思考存储方案——是追求稳定可靠像保险柜一样，还是灵活多变像变形金刚一样，亦或是高速闪电般响应？',
        options: [
          { id: 'A', label: '稳定可靠', value: '像保险柜一样', description: '数据安全有保障' }, 
          { id: 'B', label: '灵活多变', value: '像变形金刚一样', description: '随时调整适应需求' }, 
          { id: 'C', label: '高速闪电', value: '像火箭一样', description: '响应速度飞快' }
        ] 
      },
      { 
        id: 'architecture', 
        title: '系统架构', 
        story: '存储方案确定后，系统架构也需要设计。你看着架构图，思考如何组织代码——是简单直接像直饮水一样，还是分工明确像流水线一样，亦或是云端部署像孙悟空一样无处不在？',
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
        story: '后端已经就绪，现在轮到移动开发。面对安卓和iOS两个平台，你决定——是采用原生开发量身定制，还是跨平台开发一招鲜吃遍天，亦或是H5嵌入灵活轻便？',
        options: [
          { id: 'A', label: '原生开发', value: '量身定制', description: '性能最佳，体验最棒' }, 
          { id: 'B', label: '跨平台开发', value: '一招鲜吃遍天', description: '一套代码，多端运行' }, 
          { id: 'C', label: 'H5嵌入', value: '灵活轻便', description: '快速迭代，更新方便' }
        ] 
      },
      { 
        id: 'feature', 
        title: '特色功能', 
        story: '开发方式确定后，你开始思考特色功能。什么样的功能能让用户眼前一亮——是酷炫的手势操作，还是贴心的推送通知，亦或是随时随地都能用的离线功能？',
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
        story: '产品即将上线，运维工作至关重要。面对服务器部署，你决定——是采用简单直接的单机模式，还是互为备份的集群模式，亦或是弹性伸缩的云原生架构？',
        options: [
          { id: 'A', label: '单机模式', value: '独苗', description: '简单直接，成本低廉' }, 
          { id: 'B', label: '集群模式', value: '团队', description: '互为备份，稳定可靠' }, 
          { id: 'C', label: '云原生', value: '未来感', description: '弹性伸缩，智能调度' }
        ] 
      },
      { 
        id: 'security', 
        title: '安全防护', 
        story: '服务器就绪后，安全防护不能少。面对潜在的网络威胁，你决定——是采取基础防护防患未然，还是深度防御严防死守，亦或是全链路安全360度无死角防护？',
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

const identities = [
  { id: 'product', name: '产品策划及运营部', icon: 'FileText', color: 'bg-blue-500', description: '结合数据分析，挖掘用户需求', detail: '利用AXURE、墨刀等工具绘制原型图', stageIndex: 0 },
  { id: 'visual', name: '视觉设计部', icon: 'Palette', color: 'bg-purple-500', description: '将产品原型视觉转化', detail: '设计网校的IP形象，绘制易拉宝、海报', stageIndex: 1 },
  { id: 'frontend', name: '前端研发部', icon: 'Code', color: 'bg-green-500', description: '利用HTML/CSS/JAVASCRIPT等前端开发', detail: '将视觉设计中的无限创意通过代码转化', stageIndex: 2 },
  { id: 'backend', name: '后端研发部', icon: 'Server', color: 'bg-orange-500', description: '深入理解产品背后的实际需求', detail: '利用GOLANG等开发语言与数据库交互', stageIndex: 3 },
  { id: 'mobile', name: '移动开发部', icon: 'Smartphone', color: 'bg-pink-500', description: '深入研究APP开发精髓', detail: '利用JAVA/KOTLIN为ANDROID平台注入活力', stageIndex: 4 },
  { id: 'operations', name: '运维安全部', icon: 'Shield', color: 'bg-yellow-500', description: '肩负维护网校的服务器稳定性', detail: '参与新项目的部署工作，进行安全配置', stageIndex: 5 },
  { id: 'solo', name: '一个人就是一个团队', icon: 'Zap', color: 'bg-indigo-600', description: '挑战极限！体验完整流程', detail: '从产品设计到运维安全，独自完成所有环节', stageIndex: -1 }
]

export const useGameStore = defineStore('game', () => {
  const currentScene = ref('start')
  const currentStage = ref(0)
  const selectedIdentity = ref(null)
  const choices = ref({})
  const completedStages = ref([])
  const showMail = ref(false)
  const mailContent = ref('')
  const mailTitle = ref('')
  const currentQuestionIndex = ref(0)
  const mailType = ref('receive')
  const waitingStages = ref([])
  const hasReceivedMail = ref(false)

  const currentStageData = computed(() => {
    return stages[currentStage.value] || null
  })

  const progress = computed(() => {
    return ((currentStage.value) / stages.length) * 100
  })

  const isCurrentStageInteractive = computed(() => {
    if (!selectedIdentity.value) return false
    if (selectedIdentity.value === 'solo') return true
    const identity = identities.find(i => i.id === selectedIdentity.value)
    return identity && identity.stageIndex === currentStage.value
  })

  const advanceStage = () => {
    if (currentStage.value < stages.length - 1) {
      currentStage.value++
      currentQuestionIndex.value = 0
      hasReceivedMail.value = false
      
      if (selectedIdentity.value === 'solo') {
        setTimeout(() => {
          showIncomingMail(currentStage.value)
        }, 1500)
      }
    } else {
      currentScene.value = 'result'
    }
  }

  const autoCompleteStage = () => {
    const stage = stages[currentStage.value]
    if (stage && stage.defaultChoice) {
      choices.value[stage.id] = stage.defaultChoice
      completedStages.value.push(stage.id)
    }
    setTimeout(() => {
      advanceStage()
    }, 800)
  }

  const enterStatsMode = () => {
    stages.slice(1).forEach(stage => {
      if (stage.defaultChoice) {
        choices.value[stage.id] = stage.defaultChoice
        completedStages.value.push(stage.id)
      }
    })
    currentScene.value = 'stats'
  }

  const enterWaitingMode = () => {
    const remainingStages = stages.slice(currentStage.value + 1)
    if (remainingStages.length === 0) {
      currentScene.value = 'result'
      return
    }
    waitingStages.value = remainingStages.map(s => ({ ...s, completed: false }))
    currentScene.value = 'waiting'
  }

  const completeWaitingStage = (stageId) => {
    const stageIndex = waitingStages.value.findIndex(s => s.id === stageId)
    if (stageIndex !== -1) {
      waitingStages.value[stageIndex].completed = true
      const stage = stages.find(s => s.id === stageId)
      if (stage && stage.defaultChoice) {
        choices.value[stage.id] = stage.defaultChoice
        completedStages.value.push(stage.id)
      }
    }
  }

  const finishWaiting = () => {
    currentScene.value = 'result'
  }

  const selectIdentity = (identityId) => {
    selectedIdentity.value = identityId
    choices.value = {}
    completedStages.value = []
    currentQuestionIndex.value = 0
    hasReceivedMail.value = false
    
    const identity = identities.find(i => i.id === identityId)
    
    if (!identity) {
      currentScene.value = 'stage'
      currentStage.value = 0
      return
    }
    
    if (identity.stageIndex === -1) {
      currentScene.value = 'stage'
      currentStage.value = 0
    } else {
      currentStage.value = identity.stageIndex
      for (let i = 0; i < identity.stageIndex; i++) {
        const stage = stages[i]
        if (stage && stage.defaultChoice) {
          choices.value[stage.id] = stage.defaultChoice
          completedStages.value.push(stage.id)
        }
      }
      currentScene.value = 'stage'
      if (identity.stageIndex > 0) {
        setTimeout(() => {
          showIncomingMail(identity.stageIndex)
        }, 1500)
      }
    }
  }

  const showIncomingMail = (stageIndex) => {
    if (stageIndex <= 0) return
    
    const prevStage = stages[stageIndex - 1]
    if (!prevStage) return
    
    mailTitle.value = `${prevStage.name}任务完成`
    let content = `<h3>${prevStage.name}工作汇报</h3>`
    
    if (choices.value[prevStage.id]) {
      prevStage.questions.forEach(q => {
        const selectedOptionId = choices.value[prevStage.id][q.id]
        const selectedOption = q.options.find(o => o.id === selectedOptionId)
        if (selectedOption) {
          content += `<p><strong>${q.title}：</strong>${selectedOption.label} - ${selectedOption.value}</p>`
        }
      })
    }
    
    content += `<p>已完成${prevStage.name}环节，准备移交下一部门！</p>`
    mailContent.value = content
    mailType.value = 'receive'
    showMail.value = true
  }

  const selectChoice = (questionId, optionId) => {
    const stage = stages[currentStage.value]
    if (!stage) return

    if (!choices.value[stage.id]) {
      choices.value[stage.id] = {}
    }
    choices.value[stage.id][questionId] = optionId

    const questions = stage.questions
    if (currentQuestionIndex.value < questions.length - 1) {
      currentQuestionIndex.value++
    } else {
      generateSendMailPreview()
      showMail.value = true
    }
  }

  const generateSendMailPreview = () => {
    const stage = stages[currentStage.value]
    if (!stage || !choices.value[stage.id]) return

    mailTitle.value = `${stage.name}工作汇报`
    let content = `<h3>${stage.name}工作汇报</h3>`
    
    stage.questions.forEach(q => {
      const selectedOptionId = choices.value[stage.id][q.id]
      const selectedOption = q.options.find(o => o.id === selectedOptionId)
      if (selectedOption) {
        content += `<p><strong>${q.title}：</strong>${selectedOption.label} - ${selectedOption.value}</p>`
      }
    })
    
    content += `<p>已完成${stage.name}环节，准备发送给下一部门！</p>`
    mailContent.value = content
    mailType.value = 'send'
  }

  const closeMail = () => {
    showMail.value = false
    
    if (mailType.value === 'receive') {
      hasReceivedMail.value = true
    }
    
    if (mailType.value === 'send') {
      completedStages.value.push(stages[currentStage.value].id)
      
      if (selectedIdentity.value === 'solo') {
        advanceStage()
      } else {
        enterWaitingMode()
      }
    }
  }

  const resetGame = () => {
    currentScene.value = 'start'
    currentStage.value = 0
    selectedIdentity.value = null
    choices.value = {}
    completedStages.value = []
    showMail.value = false
    mailContent.value = ''
    mailTitle.value = ''
    currentQuestionIndex.value = 0
    mailType.value = 'receive'
    waitingStages.value = []
    hasReceivedMail.value = false
  }

  const startGame = () => {
    currentScene.value = 'identity'
  }

  const completeStats = () => {
    currentScene.value = 'result'
  }

  return {
    currentScene,
    currentStage,
    selectedIdentity,
    choices,
    completedStages,
    showMail,
    mailContent,
    mailTitle,
    currentQuestionIndex,
    currentStageData,
    progress,
    isCurrentStageInteractive,
    mailType,
    waitingStages,
    hasReceivedMail,
    advanceStage,
    autoCompleteStage,
    enterStatsMode,
    enterWaitingMode,
    completeWaitingStage,
    finishWaiting,
    selectIdentity,
    selectChoice,
    generateSendMailPreview,
    closeMail,
    resetGame,
    startGame,
    completeStats
  }
})
