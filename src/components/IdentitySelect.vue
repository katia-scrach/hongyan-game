<template>
  <div class="min-h-screen p-6 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-white mb-2">请选择你的身份</h2>
        <p class="text-gray-400">点击卡牌查看详情，选择你想要体验的部门</p>
      </div>

      <div class="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        <div 
          v-for="identity in identities" 
          :key="identity.id"
          class="card-flip h-48 cursor-pointer"
          :class="{ 'flipped': flippedCard === identity.id }"
          @click="flipCard(identity.id)"
        >
          <div class="card-flip-inner">
            <div class="card-flip-front bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-4">
              <div :class="[identity.color, 'w-14 h-14 rounded-xl flex items-center justify-center mb-3 shadow-lg']">
                <component :is="getIcon(identity.icon)" class="w-7 h-7 text-white" />
              </div>
              <h3 class="text-white font-semibold text-sm text-center">{{ identity.name }}</h3>
              <p class="text-gray-400 text-xs mt-1">点击查看详情</p>
            </div>

            <div class="card-flip-back bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md border border-white/20 p-4 flex flex-col">
              <h3 class="text-white font-bold text-sm mb-2">{{ identity.name }}</h3>
              <p class="text-gray-300 text-xs flex-1 overflow-y-auto scrollbar-hide mb-3">{{ identity.description }}</p>
              <p class="text-gray-400 text-xs flex-1 overflow-y-auto scrollbar-hide mb-3">{{ identity.detail }}</p>
              <button 
                @click.stop="selectIdentity(identity.id)"
                :class="[identity.color, 'w-full py-2 rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity']"
              >
                确认身份
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  FileText, 
  Palette, 
  Code, 
  Server, 
  Smartphone, 
  Shield, 
  Crown,
  Zap 
} from 'lucide-vue-next'
import { identities } from '../data/mockData'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const flippedCard = ref(null)

const iconMap = {
  FileText,
  Palette,
  Code,
  Server,
  Smartphone,
  Shield,
  Crown,
  Zap
}

const getIcon = (iconName) => {
  return iconMap[iconName] || FileText
}

const flipCard = (id) => {
  flippedCard.value = flippedCard.value === id ? null : id
}

const selectIdentity = (id) => {
  gameStore.selectIdentity(id)
}
</script>
