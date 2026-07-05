<template>
  <div class="min-h-screen bg-anime bg-overlay relative overflow-hidden flex flex-col items-center justify-center p-4">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div class="absolute bottom-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse" style="animation-delay: 0.5s;"></div>
    </div>

    <div class="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
      <h2 class="text-3xl font-kuaile text-white text-shadow-anime mb-2">请选择你的身份</h2>

      <div class="relative w-full flex items-center justify-center">
        <button 
          @click="prevIdentity"
          class="absolute left-0 z-10 w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 text-white"
        >
          <ChevronLeft class="w-8 h-8" />
        </button>

        <div class="relative w-48 h-48 mx-16">
          <Transition name="slide-fade" mode="out-in">
            <div 
              :key="currentIndex"
              class="w-full h-full rounded-3xl overflow-hidden shadow-2xl animate-bounce-in"
            >
              <img 
                :src="currentIdentity.image" 
                :alt="currentIdentity.name"
                class="w-full h-full object-cover"
              />
            </div>
          </Transition>
        </div>

        <button 
          @click="nextIdentity"
          class="absolute right-0 z-10 w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 text-white"
        >
          <ChevronRight class="w-8 h-8" />
        </button>
      </div>

      <div class="text-center">
        <h3 class="text-2xl font-kuaile text-white text-shadow-anime mb-2">{{ currentIdentity.name }}</h3>
        
        <div class="flex justify-center gap-2 mb-4">
          <div 
            v-for="(_, index) in identities" 
            :key="index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="index === currentIndex ? 'bg-pink-500 scale-125' : 'bg-white/50'"
          ></div>
        </div>
      </div>

      <div class="card-anime p-6 w-full">
        <div class="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 border border-pink-100">
          <h4 class="font-kuaile text-pink-600 mb-2">✨ 部门简介</h4>
          <p class="text-gray-700 text-sm leading-relaxed">{{ currentIdentity.description }}</p>
        </div>
      </div>

      <button 
        @click="confirmIdentity"
        class="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-kuaile text-xl rounded-full shadow-xl shadow-purple-500/30 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 glow-effect"
      >
        确认身份
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const currentIndex = ref(0)

const identities = [
  { 
    id: 'product', 
    name: '产品设计与运营部', 
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20business%20woman%20with%20white%20hair%20wearing%20sunglasses%20and%20black%20suit%20giving%20speech%20professional%20confident%20pink%20background%20chibi%20style&image_size=square',
    description: '结合数据分析，挖掘用户需求，产出PRD文档，精心绘制出产品的宏伟蓝图。' 
  },
  { 
    id: 'visual', 
    name: '视觉设计部', 
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20business%20man%20with%20black%20hair%20wearing%20sunglasses%20and%20black%20suit%20giving%20speech%20cool%20professional%20light%20gray%20background%20chibi%20style&image_size=square',
    description: '将产品原型视觉转化，在设计中追求美观，注重用户体验，确保每一个设计都能带给用户流畅而愉悦的交互感受。' 
  },
  { 
    id: 'frontend', 
    name: '前端研发部', 
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20girl%20with%20brown%20hair%20wearing%20glasses%20and%20business%20attire%20giving%20presentation%20friendly%20professional%20soft%20pink%20background%20chibi%20style&image_size=square',
    description: '利用HTML/CSS/JAVASCRIPT等前端开发的核心工具，针对PC端、移动端等不同的交互界面，采用不同的交互风格与技术。' 
  },
  { 
    id: 'backend', 
    name: '后端研发部', 
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20woman%20with%20long%20black%20hair%20wearing%20dark%20glasses%20and%20blue%20collared%20shirt%20professional%20mysterious%20light%20blue%20background%20chibi%20style&image_size=square',
    description: '深入理解产品背后的实际需求，将其转化为准确的数据模型和清晰的业务逻辑。' 
  },
  { 
    id: 'mobile', 
    name: '移动开发部', 
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20man%20with%20dark%20hair%20wearing%20round%20glasses%20and%20black%20suit%20nervous%20sweating%20determined%20red%20background%20chibi%20style&image_size=square',
    description: '深入研究APP开发精髓，用精湛的技艺雕琢着应用的框架，是引领创新的先锋。' 
  },
  { 
    id: 'operations', 
    name: '运维安全部', 
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20woman%20with%20brown%20hair%20wearing%20sunglasses%20and%20brown%20blazer%20professional%20confident%20light%20beige%20background%20chibi%20style&image_size=square',
    description: '肩负维护网校的服务器稳定性、安全性的重要使命，确保服务器运行如磐石般坚固、可靠。' 
  },
  { 
    id: 'solo', 
    name: '一个人就是一个团队', 
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20woman%20with%20long%20dark%20hair%20wearing%20sunglasses%20and%20white%20collared%20shirt%20cool%20mysterious%20light%20beige%20background%20chibi%20style&image_size=square',
    description: '挑战极限！体验从任务发布到产品上线的完整流程，一个人搞定所有环节。' 
  }
]

const currentIdentity = computed(() => {
  return identities[currentIndex.value] || identities[0]
})

const prevIdentity = () => {
  currentIndex.value = (currentIndex.value - 1 + identities.length) % identities.length
}

const nextIdentity = () => {
  currentIndex.value = (currentIndex.value + 1) % identities.length
}

const confirmIdentity = () => {
  gameStore.selectIdentity(currentIdentity.value.id)
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.4s ease-out forwards;
}
</style>
