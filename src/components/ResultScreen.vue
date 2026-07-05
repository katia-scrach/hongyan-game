<template>
  <div class="min-h-screen bg-anime bg-overlay flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
    </div>

    <div class="celebration-container">
      <div class="balloon balloon-1">🎈</div>
      <div class="balloon balloon-2">🎈</div>
      <div class="balloon balloon-3">🎈</div>
      <div class="balloon balloon-4">🎈</div>
      <div class="balloon balloon-5">🎉</div>
      <div class="balloon balloon-6">🎉</div>
      <div class="confetti confetti-1"></div>
      <div class="confetti confetti-2"></div>
      <div class="confetti confetti-3"></div>
      <div class="confetti confetti-4"></div>
      <div class="confetti confetti-5"></div>
      <div class="confetti confetti-6"></div>
    </div>

    <div class="relative z-10 text-center max-w-md w-full">
      <div class="animate-bounce-in mb-6">
        <div class="text-7xl mb-4 transform hover:scale-110 transition-transform">{{ resultData?.badge }}</div>
      </div>

      <h1 class="text-4xl font-kuaile text-white mb-2 animate-fade-in" style="text-shadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,100,150,0.4)'">{{ resultData?.title }}</h1>
      <p class="text-gray-300 text-lg mb-8 animate-slide-up font-xiaowei">{{ resultData?.description }}</p>

      <div class="card-anime p-6 mb-8 animate-slide-up overflow-hidden relative">
        <div class="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-yellow-500 rounded-tl-xl"></div>
        <div class="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-yellow-500 rounded-tr-xl"></div>
        <div class="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-yellow-500 rounded-bl-xl"></div>
        <div class="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-yellow-500 rounded-br-xl"></div>
        
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-4 border-yellow-400 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500"></div>
          
          <div class="text-center">
            <div class="text-5xl mb-4">🏆</div>
            <h2 class="text-2xl font-kuaile text-yellow-700 mb-2">荣誉证书</h2>
            <p class="text-gray-600 font-xiaowei text-sm mb-4">Certificate of Achievement</p>
            
            <div class="bg-white/80 rounded-lg p-4 mb-4">
              <p class="text-gray-700 font-xiaowei leading-relaxed">
                兹证明<br/>
                <span class="text-pink-600 font-kuaile text-lg">{{ resultData?.title }}</span><br/>
                在红岩网校工作站招新体验活动中，{{ achievementText }}，表现出色！
              </p>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="text-left">
                <p class="text-gray-500 text-xs">红岩网校工作站</p>
                <p class="text-gray-500 text-xs">2026年秋季招新</p>
              </div>
              <div class="text-3xl">✦</div>
            </div>
          </div>
          
          <div class="absolute top-1/2 right-0 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-1/2 w-16 h-16 bg-orange-400/20 rounded-full blur-xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-6 mb-8 animate-slide-up border border-pink-200">
        <h3 class="text-gray-800 font-kuaile text-lg mb-4">你的产品产出</h3>
        <div class="space-y-3 text-left">
          <div 
            v-for="(stageChoices, stageId) in choices" 
            :key="stageId"
            class="bg-white/60 rounded-xl p-3 shadow-sm"
          >
            <p class="text-pink-600 text-sm font-kuaile">{{ getStageName(stageId) }}</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="(optionId, qId) in stageChoices" 
                :key="qId"
                class="text-gray-700 text-xs bg-gradient-to-r from-pink-100 to-orange-100 px-3 py-1 rounded-full font-medium"
              >
                {{ getOptionLabel(stageId, qId, optionId) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-4">
        <button 
          @click="handleRestart"
          class="flex-1 bg-white/20 hover:bg-white/30 text-white font-kuaile text-lg py-3 px-6 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
        >
          <RotateCcw class="w-5 h-5" />
          重新开始
        </button>
        <button 
          @click="showShareModal = true"
          class="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-kuaile text-lg py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
        >
          <Share2 class="w-5 h-5" />
          分享奖状
        </button>
      </div>

      <div class="mt-8 text-center">
        <p class="text-white/80 text-sm font-xiaowei">红岩网校工作站期待你的加入！</p>
        <div class="mt-4 flex justify-center gap-4">
          <span class="text-3xl animate-bounce">❤️</span>
          <span class="text-3xl animate-bounce" style="animation-delay: 0.2s;">💻</span>
          <span class="text-3xl animate-bounce" style="animation-delay: 0.4s;">🚀</span>
        </div>
        
        <div class="mt-6 flex justify-center gap-2">
          <span class="text-xl animate-wave">👏</span>
          <span class="text-xl animate-wave" style="animation-delay: 0.1s;">👏</span>
          <span class="text-xl animate-wave" style="animation-delay: 0.2s;">👏</span>
          <span class="text-xl animate-wave" style="animation-delay: 0.3s;">👏</span>
          <span class="text-xl animate-wave" style="animation-delay: 0.4s;">👏</span>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div 
        v-if="showShareModal" 
        @click.self="showShareModal = false"
        class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
      >
        <div class="max-w-md w-full animate-bounce-in">
          <div class="relative overflow-hidden">
            <div class="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-yellow-500 rounded-tl-xl"></div>
            <div class="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-yellow-500 rounded-tr-xl"></div>
            <div class="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-yellow-500 rounded-bl-xl"></div>
            <div class="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-yellow-500 rounded-br-xl"></div>
            
            <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-4 border-yellow-400 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500"></div>
              
              <div class="text-center">
                <div class="text-5xl mb-4">🏆</div>
                <h2 class="text-2xl font-kuaile text-yellow-700 mb-2">荣誉证书</h2>
                <p class="text-gray-600 font-xiaowei text-sm mb-4">Certificate of Achievement</p>
                
                <div class="bg-white/80 rounded-lg p-4 mb-4">
                  <p class="text-gray-700 font-xiaowei leading-relaxed">
                    兹证明<br/>
                    <span class="text-pink-600 font-kuaile text-lg">{{ resultData?.title }}</span><br/>
                    在红岩网校工作站招新体验活动中，{{ achievementText }}，表现出色！
                  </p>
                </div>
                
                <div class="flex justify-between items-center">
                  <div class="text-left">
                    <p class="text-gray-500 text-xs">红岩网校工作站</p>
                    <p class="text-gray-500 text-xs">2026年秋季招新</p>
                  </div>
                  <div class="text-3xl">✦</div>
                </div>
              </div>
              
              <div class="absolute top-1/2 right-0 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
              <div class="absolute bottom-0 left-1/2 w-16 h-16 bg-orange-400/20 rounded-full blur-xl -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
          
          <button 
            @click="showShareModal = false"
            class="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-kuaile text-lg py-3 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            关闭
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RotateCcw, Share2 } from 'lucide-vue-next'
import { stages, results } from '../data/mockData'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const props = defineProps({
  selectedIdentity: {
    type: String,
    default: null
  },
  choices: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['restart'])

const resultData = computed(() => {
  return results[props.selectedIdentity] || results.minister
})

const completedStagesCount = computed(() => {
  return Object.keys(props.choices).length
})

const achievementText = computed(() => {
  if (props.selectedIdentity === 'solo') {
    return '完成了6个环节的挑战'
  }
  const nameMap = {
    '产品设计与运营': '产品设计',
    '视觉设计': '视觉设计',
    '前端研发': '前端研发',
    '后端研发': '后端研发',
    '移动开发': '移动开发',
    '运维安全': '运维安全'
  }
  const storeIdentities = [
    { id: 'product', stageIndex: 1 },
    { id: 'visual', stageIndex: 2 },
    { id: 'frontend', stageIndex: 3 },
    { id: 'backend', stageIndex: 4 },
    { id: 'mobile', stageIndex: 5 },
    { id: 'operations', stageIndex: 6 },
    { id: 'solo', stageIndex: -1 }
  ]
  const identity = storeIdentities.find(i => i.id === props.selectedIdentity)
  if (identity && identity.stageIndex >= 0 && identity.stageIndex < stages.length) {
    const stage = stages[identity.stageIndex]
    const shortName = nameMap[stage.name] || stage.name
    return `完成了${shortName}环节的挑战`
  }
  const firstStageId = Object.keys(props.choices)[0]
  const stage = stages.find(s => s.id === firstStageId)
  if (stage) {
    const shortName = nameMap[stage.name] || stage.name
    return `完成了${shortName}环节的挑战`
  }
  return `完成了${completedStagesCount.value}个环节的挑战`
})

const getStageName = (stageId) => {
  const stage = stages.find(s => s.id === stageId)
  return stage?.name || stageId
}

const getOptionLabel = (stageId, questionId, optionId) => {
  const stage = stages.find(s => s.id === stageId)
  if (!stage) return optionId
  const question = stage.questions.find(q => q.id === questionId)
  if (!question) return optionId
  const option = question.options.find(o => o.id === optionId)
  return option?.label || optionId
}

const showShareModal = ref(false)

const handleRestart = () => {
  gameStore.resetGame()
  gameStore.startGame()
}
</script>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}

@keyframes float-up {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-10vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes fall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
  opacity: 0;
}

.animate-wave {
  animation: wave 0.5s ease-in-out infinite;
  display: inline-block;
}

.celebration-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 20;
}

.balloon {
  position: absolute;
  font-size: 2rem;
  animation: float-up 4s ease-in-out infinite;
}

.balloon-1 {
  left: 10%;
  animation-delay: 0s;
}

.balloon-2 {
  left: 30%;
  animation-delay: 1s;
}

.balloon-3 {
  left: 50%;
  animation-delay: 2s;
}

.balloon-4 {
  left: 70%;
  animation-delay: 3s;
}

.balloon-5 {
  left: 85%;
  animation-delay: 0.5s;
}

.balloon-6 {
  left: 15%;
  animation-delay: 2.5s;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  animation: fall 5s linear infinite;
}

.confetti-1 {
  left: 10%;
  background-color: #FF6B6B;
  animation-delay: 0s;
}

.confetti-2 {
  left: 25%;
  background-color: #4ECDC4;
  animation-delay: 1s;
}

.confetti-3 {
  left: 40%;
  background-color: #FFE66D;
  animation-delay: 2s;
}

.confetti-4 {
  left: 55%;
  background-color: #95E1D3;
  animation-delay: 0.5s;
}

.confetti-5 {
  left: 70%;
  background-color: #F38181;
  animation-delay: 1.5s;
}

.confetti-6 {
  left: 85%;
  background-color: #AA96DA;
  animation-delay: 2.5s;
}
</style>
