<template>
  <div class="min-h-screen bg-anime bg-overlay p-6 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 right-10 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div v-if="!hasReceivedMail && needMail" class="relative z-10 max-w-md mx-auto h-full flex flex-col items-center justify-center">
      <div class="text-center">
        <div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce-in">
          <Mail class="w-16 h-16 text-white" />
        </div>
        <h2 class="text-3xl font-kuaile text-white mb-4 text-shadow-anime">📧 等待邮件中...</h2>
        <p class="text-gray-300 font-xiaowei text-lg mb-8">正在接收来自{{ previousStageName }}的任务邮件</p>
        <div class="flex items-center justify-center gap-2 text-pink-200">
          <Loader2 class="w-6 h-6 animate-spin" />
          <span class="font-kuaile">邮件传输中...</span>
        </div>
      </div>
    </div>

    <div v-else class="relative z-10 max-w-md mx-auto">
      <div class="text-center mb-6">
        <div :class="[stageColor, 'w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-xl']">
          <component :is="currentIcon" class="w-8 h-8 text-white" />
        </div>
        <h2 class="text-2xl font-kuaile text-white mb-1 text-shadow-anime">{{ stageData?.name }}</h2>
        <p class="text-gray-300 font-xiaowei text-sm">{{ stageData?.description }}</p>
      </div>

      <div v-if="isInteractive && currentQuestion" class="card-anime p-6 animate-slide-up">
        <div class="flex items-center gap-3 mb-4">
          <span :class="[stageColor, 'w-8 h-8 rounded-full text-white text-sm flex items-center justify-center font-kuaile shadow-lg']">
            {{ currentQuestionIndex + 1 }}
          </span>
          <h3 class="text-lg font-kuaile text-gray-800">{{ currentQuestion.title }}</h3>
        </div>

        <div class="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 mb-6 border border-pink-100">
          <p class="text-gray-700 font-xiaowei text-sm leading-relaxed">{{ currentQuestion.story }}</p>
        </div>

        <div class="space-y-3">
          <button
            v-for="option in currentQuestion.options"
            :key="option.id"
            @click="handleSelect(currentQuestion.id, option.id)"
            class="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 group transform hover:scale-[1.02]"
          >
            <div class="flex items-start gap-3">
              <span :class="[stageColor, 'w-8 h-8 rounded-full text-white text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md']">
                {{ option.id }}
              </span>
              <div class="flex-1">
                <p class="text-gray-800 font-kuaile group-hover:text-pink-600 transition-colors">{{ option.label }}</p>
                <p class="text-gray-500 text-sm mt-1">{{ option.description }}</p>
                <p v-if="option.value" class="text-pink-500 text-xs mt-1 font-medium">效果：{{ option.value }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <div :class="[stageColor, 'w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-6 animate-pulse shadow-xl']">
          <component :is="currentIcon" class="w-14 h-14 text-white" />
        </div>
        <p class="text-white font-kuaile text-xl mb-4">正在自动处理{{ stageData?.name }}...</p>
        <div class="inline-flex items-center gap-2 text-sm text-pink-200">
          <Loader2 class="w-5 h-5 animate-spin" />
          系统自动选择中
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <div class="flex gap-2">
          <div 
            v-for="(_, qIndex) in stageData?.questions" 
            :key="qIndex"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="getStepClass(qIndex)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { 
  FileText, 
  Palette, 
  Code, 
  Server, 
  Smartphone, 
  Shield,
  Loader2,
  Mail
} from 'lucide-vue-next'

const props = defineProps({
  stageData: {
    type: Object,
    default: null
  },
  isInteractive: {
    type: Boolean,
    default: true
  },
  currentQuestionIndex: {
    type: Number,
    default: 0
  },
  hasReceivedMail: {
    type: Boolean,
    default: false
  },
  stageIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['select'])

const iconMap = {
  FileText,
  Palette,
  Code,
  Server,
  Smartphone,
  Shield
}

const colorMap = {
  FileText: 'bg-gradient-to-br from-pink-500 to-rose-400',
  Palette: 'bg-gradient-to-br from-purple-500 to-violet-400',
  Code: 'bg-gradient-to-br from-green-500 to-emerald-400',
  Server: 'bg-gradient-to-br from-orange-500 to-amber-400',
  Smartphone: 'bg-gradient-to-br from-yellow-500 to-lime-400',
  Shield: 'bg-gradient-to-br from-red-500 to-pink-400'
}

const stageNames = ['产品设计与运营', '视觉设计', '前端研发', '后端研发', '移动开发', '运维安全']

const currentIcon = computed(() => {
  return iconMap[props.stageData?.icon] || FileText
})

const stageColor = computed(() => {
  return colorMap[props.stageData?.icon] || 'bg-gradient-to-br from-gray-500 to-gray-400'
})

const currentQuestion = computed(() => {
  if (!props.stageData?.questions) return null
  return props.stageData.questions[props.currentQuestionIndex] || null
})

const needMail = computed(() => {
  return props.stageIndex > 0
})

const previousStageName = computed(() => {
  if (props.stageIndex > 0 && props.stageIndex <= stageNames.length) {
    return stageNames[props.stageIndex - 1]
  }
  return '上一环节'
})

const handleSelect = (questionId, optionId) => {
  emit('select', questionId, optionId)
}

const getStepClass = (qIndex) => {
  if (qIndex < props.currentQuestionIndex) {
    return 'bg-gradient-to-br from-green-400 to-emerald-500 scale-110'
  }
  if (qIndex === props.currentQuestionIndex) {
    return 'bg-gradient-to-br from-pink-400 to-rose-500 scale-125 shadow-lg shadow-pink-400/50'
  }
  return 'bg-gray-300'
}

watch(() => props.isInteractive, (newVal) => {
  if (!newVal && props.stageData) {
    setTimeout(() => {
      const defaultChoice = props.stageData.defaultChoice
      if (defaultChoice) {
        Object.entries(defaultChoice).forEach(([questionId, optionId]) => {
          emit('select', questionId, optionId)
        })
      }
    }, 1500)
  }
}, { immediate: true })

onMounted(() => {
  if (!props.isInteractive && props.stageData) {
    setTimeout(() => {
      const defaultChoice = props.stageData.defaultChoice
      if (defaultChoice) {
        Object.entries(defaultChoice).forEach(([questionId, optionId]) => {
          emit('select', questionId, optionId)
        })
      }
    }, 1500)
  }
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

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}
</style>
