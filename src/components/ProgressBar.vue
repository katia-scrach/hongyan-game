<template>
  <div class="bg-gray-900/80 backdrop-blur-md border-b border-white/10 p-4">
    <div class="max-w-md mx-auto">
      <div class="flex items-center justify-between mb-2">
        <span class="text-white font-medium text-sm">{{ currentStageData?.name || '开始' }}</span>
        <span class="text-gray-400 text-xs">{{ currentStage + 1 }}/{{ stages.length }}</span>
      </div>
      
      <div class="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          class="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-500 ease-out"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <div class="flex justify-between mt-3">
        <div 
          v-for="(stage, index) in stages" 
          :key="stage.id"
          class="flex flex-col items-center"
        >
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            :class="getStageClass(index)"
          >
            <component :is="getIcon(stage.icon)" class="w-4 h-4" />
          </div>
          <span class="text-xs mt-1 truncate max-w-12" :class="getStageTextClass(index)">
            {{ stage.name.slice(0, 4) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Send, 
  FileText, 
  Palette, 
  Code, 
  Server, 
  Smartphone, 
  Shield 
} from 'lucide-vue-next'
import { stages } from '../data/mockData'

const props = defineProps({
  currentStage: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0
  },
  completedStages: {
    type: Array,
    default: () => []
  },
  currentStageData: {
    type: Object,
    default: null
  }
})

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

const getStageClass = (index) => {
  if (props.completedStages.includes(stages[index].id)) {
    return 'bg-green-500 text-white shadow-lg shadow-green-500/50'
  }
  if (index === props.currentStage) {
    return 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse-glow'
  }
  return 'bg-gray-600 text-gray-400'
}

const getStageTextClass = (index) => {
  if (props.completedStages.includes(stages[index].id)) {
    return 'text-green-400'
  }
  if (index === props.currentStage) {
    return 'text-red-400 font-medium'
  }
  return 'text-gray-500'
}
</script>
