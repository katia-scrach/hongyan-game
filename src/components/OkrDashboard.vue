<template>
  <div class="min-h-screen bg-anime bg-overlay p-6 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="relative z-10 max-w-md mx-auto">
      <div class="text-center mb-8">
        <div class="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl flex items-center justify-center mb-4 shadow-xl glow-effect">
          <Crown class="w-10 h-10 text-white" />
        </div>
        <h2 class="text-3xl font-kuaile text-white mb-2 text-shadow-anime">OKR进度看板</h2>
        <p class="text-gray-300 font-xiaowei">实时监控各部门工作进度</p>
      </div>

      <div class="card-anime p-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">当前任务</p>
            <p class="text-gray-800 font-kuaile">{{ taskTitle }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <Check class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div 
          v-for="(department, index) in departments" 
          :key="department.id"
          class="card-anime p-4 transition-all duration-500 transform hover:scale-[1.02]"
          :class="{ 'ring-2 ring-green-400 bg-gradient-to-br from-green-50 to-emerald-50': department.completed }"
        >
          <div class="flex items-center justify-between mb-3">
            <div :class="[department.color, 'w-10 h-10 rounded-xl flex items-center justify-center shadow-md']">
              <component :is="getIcon(department.icon)" class="w-5 h-5 text-white" />
            </div>
            <span 
              class="text-xs font-kuaile px-2 py-1 rounded-full"
              :class="department.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'"
            >
              {{ department.completed ? '已完成' : '进行中' }}
            </span>
          </div>
          
          <p class="text-gray-800 text-sm font-kuaile mb-3 truncate">{{ department.name }}</p>
          
          <div class="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out shadow-md"
              :class="getProgressColor(index)"
              :style="{ width: `${department.progress}%` }"
            ></div>
          </div>
          
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-gray-500">{{ getStageName(department.id) }}</span>
            <span class="text-xs font-bold" :class="getProgressTextColor(index)">{{ department.progress }}%</span>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 mb-6 border border-green-200">
        <div class="flex items-center gap-2 mb-3">
          <Target class="w-5 h-5 text-green-500" />
          <h3 class="text-gray-800 font-kuaile">整体进度</h3>
        </div>
        <div class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-1000 shadow-md"
            :style="{ width: `${overallProgress}%` }"
          ></div>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-xs text-gray-500">{{ completedCount }}/{{ departments.length }} 部门已完成</span>
          <span class="text-lg font-bold text-green-500">{{ overallProgress }}%</span>
        </div>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(department, index) in departments" 
          :key="department.id"
          class="card-anime p-3 transition-all duration-300"
          :class="{ 'opacity-100': showDetails[index], 'opacity-60': !showDetails[index] }"
        >
          <div class="flex items-center justify-between cursor-pointer" @click="toggleDetail(index)">
            <div class="flex items-center gap-3">
              <div :class="[department.color, 'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md']">
                <component :is="getIcon(department.icon)" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-gray-800 text-sm font-kuaile">{{ department.name }}</p>
                <p class="text-gray-500 text-xs">{{ getStageName(department.id) }}</p>
              </div>
            </div>
            <ChevronDown 
              class="w-5 h-5 text-gray-400 transition-transform"
              :class="{ 'rotate-180': showDetails[index] }"
            />
          </div>
          
          <Transition name="slide">
            <div v-if="showDetails[index]" class="mt-3 pt-3 border-t border-gray-200">
              <div class="space-y-2">
                <div 
                  v-for="(choice, qId) in getDepartmentChoices(department.id)" 
                  :key="qId"
                  class="flex items-center gap-2 text-xs"
                >
                  <span class="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white text-xs flex items-center justify-center shadow-sm">✓</span>
                  <span class="text-gray-700">{{ choice }}</span>
                </div>
              </div>
            </div>
          </Transition>
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
            @click="$emit('complete')"
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
import { ref, computed, onMounted } from 'vue'
import { 
  Crown, 
  Check, 
  Target, 
  ChevronDown, 
  PartyPopper,
  FileText, 
  Palette, 
  Code, 
  Server, 
  Smartphone, 
  Shield 
} from 'lucide-vue-next'
import { stages } from '../data/mockData'

const props = defineProps({
  choices: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['complete'])

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

const departments = ref([
  { id: 'product', name: '产品策划及运营部', icon: 'FileText', color: 'bg-gradient-to-br from-pink-500 to-rose-400', progress: 0, completed: false },
  { id: 'visual', name: '视觉设计部', icon: 'Palette', color: 'bg-gradient-to-br from-purple-500 to-violet-400', progress: 0, completed: false },
  { id: 'frontend', name: '前端研发部', icon: 'Code', color: 'bg-gradient-to-br from-green-500 to-emerald-400', progress: 0, completed: false },
  { id: 'backend', name: '后端研发部', icon: 'Server', color: 'bg-gradient-to-br from-orange-500 to-amber-400', progress: 0, completed: false },
  { id: 'mobile', name: '移动开发部', icon: 'Smartphone', color: 'bg-gradient-to-br from-yellow-500 to-lime-400', progress: 0, completed: false },
  { id: 'operations', name: '运维安全部', icon: 'Shield', color: 'bg-gradient-to-br from-red-500 to-pink-400', progress: 0, completed: false }
])

const showDetails = ref([false, false, false, false, false, false])

const taskTitle = computed(() => {
  if (!props.choices.task) return '未选择任务'
  const taskStage = stages.find(s => s.id === 'task')
  const q = taskStage?.questions.find(q => q.id === 'task_type')
  const option = q?.options.find(o => o.id === props.choices.task.task_type)
  return option?.value || '未知任务'
})

const completedCount = computed(() => {
  return departments.value.filter(d => d.completed).length
})

const overallProgress = computed(() => {
  const total = departments.value.reduce((sum, d) => sum + d.progress, 0)
  return Math.round(total / departments.value.length)
})

const allCompleted = computed(() => {
  return departments.value.every(d => d.completed)
})

const getIcon = (iconName) => {
  return iconMap[iconName] || FileText
}

const getStageName = (stageId) => {
  const stage = stages.find(s => s.id === stageId)
  return stage?.name || stageId
}

const getProgressColor = (index) => {
  const colors = [
    'bg-gradient-to-r from-pink-400 to-rose-500',
    'bg-gradient-to-r from-purple-400 to-violet-500',
    'bg-gradient-to-r from-green-400 to-emerald-500',
    'bg-gradient-to-r from-orange-400 to-amber-500',
    'bg-gradient-to-r from-yellow-400 to-lime-500',
    'bg-gradient-to-r from-red-400 to-pink-500'
  ]
  return colors[index % colors.length]
}

const getProgressTextColor = (index) => {
  const colors = ['text-pink-500', 'text-purple-500', 'text-green-500', 'text-orange-500', 'text-yellow-600', 'text-red-500']
  return colors[index % colors.length]
}

const getDepartmentChoices = (stageId) => {
  if (!props.choices[stageId]) return []
  const stage = stages.find(s => s.id === stageId)
  if (!stage) return []
  
  const result = []
  stage.questions.forEach(q => {
    const optionId = props.choices[stageId][q.id]
    const option = q.options.find(o => o.id === optionId)
    if (option) {
      result.push(option.label)
    }
  })
  return result
}

const toggleDetail = (index) => {
  showDetails.value[index] = !showDetails.value[index]
}

const animateProgress = () => {
  departments.value.forEach((dept, index) => {
    setTimeout(() => {
      const interval = setInterval(() => {
        if (dept.progress < 100) {
          dept.progress += Math.random() * 20 + 10
          if (dept.progress >= 100) {
            dept.progress = 100
            dept.completed = true
            clearInterval(interval)
          }
        } else {
          clearInterval(interval)
        }
      }, 200)
    }, index * 600)
  })
}

onMounted(() => {
  setTimeout(() => {
    animateProgress()
  }, 500)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
  animation: bounce-in 0.6s ease-out forwards;
}
</style>
