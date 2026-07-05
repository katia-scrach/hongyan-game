<template>
  <div class="min-h-screen bg-anime bg-overlay p-6 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="relative z-10 max-w-md mx-auto">
      <div class="text-center mb-8">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-xl animate-pulse">
          <Loader2 class="w-12 h-12 text-white" />
        </div>
        <h2 class="text-3xl font-kuaile text-white mb-2 text-shadow-anime">等待其他部门处理...</h2>
        <p class="text-gray-300 font-xiaowei">你的工作已经完成，正在等待后续环节</p>
      </div>

      <div class="card-anime p-6 mb-6">
        <h3 class="font-kuaile text-gray-800 mb-4">进度追踪</h3>
        
        <div class="space-y-4">
          <div 
            v-for="(stage, index) in gameStore.waitingStages" 
            :key="stage.id"
            class="flex items-center gap-4"
          >
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
              :class="stage.completed ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-200'"
            >
              <Check v-if="stage.completed" class="w-6 h-6 text-white" />
              <component v-else :is="getIcon(stage.icon)" class="w-5 h-5 text-gray-400" />
            </div>
            
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <p 
                  class="text-sm font-medium transition-colors duration-300"
                  :class="stage.completed ? 'text-gray-800' : 'text-gray-500'"
                >
                  {{ stage.name }}
                </p>
                <span 
                  class="text-xs px-2 py-1 rounded-full transition-all duration-300"
                  :class="stage.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'"
                >
                  {{ stage.completed ? '已完成' : '进行中' }}
                </span>
              </div>
              
              <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="stage.completed ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-300'"
                  :style="{ width: stage.completed ? '100%' : '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-anime p-6">
        <h3 class="font-kuaile text-gray-800 mb-4">当前状态</h3>
        
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
            <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Mail class="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p class="text-gray-800 text-sm font-medium">邮件已发送</p>
              <p class="text-gray-500 text-xs">等待下一部门接收</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Users class="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p class="text-gray-800 text-sm font-medium">团队协作中</p>
              <p class="text-gray-500 text-xs">{{ completedCount }}/{{ gameStore.waitingStages.length }} 部门已完成</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="allCompleted" class="mt-8 text-center">
        <div class="animate-bounce-in">
          <div class="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-green-400/30">
            <PartyPopper class="w-12 h-12 text-white" />
          </div>
          <h3 class="text-3xl font-kuaile text-white mb-2 text-shadow-anime">所有任务已完成！</h3>
          <p class="text-gray-300 mb-6 font-xiaowei">产品开发圆满结束</p>
          <button 
            @click="finish"
            class="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-kuaile text-xl py-3 px-8 rounded-full shadow-xl shadow-green-400/30 transform hover:scale-105 transition-all duration-300"
          >
            查看成果
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { 
  Loader2, 
  Check, 
  Mail, 
  Users, 
  PartyPopper,
  FileText, 
  Palette, 
  Code, 
  Server, 
  Smartphone, 
  Shield,
  Send 
} from 'lucide-vue-next'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const iconMap = {
  Send,
  FileText,
  Palette,
  Code,
  Server,
  Smartphone,
  Shield
}

const getIcon = (iconName) => {
  return iconMap[iconName] || FileText
}

const completedCount = computed(() => {
  return gameStore.waitingStages.filter(s => s.completed).length
})

const allCompleted = computed(() => {
  return gameStore.waitingStages.length > 0 && gameStore.waitingStages.every(s => s.completed)
})

const finish = () => {
  gameStore.finishWaiting()
}

onMounted(() => {
  gameStore.waitingStages.forEach((stage, index) => {
    setTimeout(() => {
      gameStore.completeWaitingStage(stage.id)
    }, 1500 + index * 1200)
  })
})
</script>

<style scoped>
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
  animation: bounce-in 0.6s ease-out forwards;
}
</style>
