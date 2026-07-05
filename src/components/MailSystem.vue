  <template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="card-anime max-w-md w-full shadow-2xl animate-bounce-in overflow-hidden">
        <div class="bg-gradient-to-r from-pink-500 to-orange-500 p-4 flex items-center gap-3">
          <Mail class="w-6 h-6 text-white" />
          <h3 class="text-white font-kuaile text-xl">{{ title }}</h3>
          <button @click="$emit('close')" class="ml-auto text-white/80 hover:text-white">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 bg-gradient-to-br from-[#fff5f5] to-[#fffaf0] min-h-[200px]">
          <div class="border-l-4 border-pink-500 pl-4 mb-4">
            <p class="text-gray-600 text-sm font-xiaowei">{{ mailType === 'send' ? '准备发送工作汇报' : '你有一封新邮件，请查收' }}</p>
          </div>
          <div class="prose prose-sm max-w-none font-xiaowei" v-html="content"></div>
        </div>
        
        <div class="p-4 bg-gray-50 flex justify-end">
          <button 
            @click="$emit('close')"
            class="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-kuaile text-lg py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Send class="w-4 h-4" />
            {{ mailType === 'send' ? '确认发送' : '接收任务' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Mail, X, Send } from 'lucide-vue-next'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  mailType: {
    type: String,
    default: 'receive'
  }
})

defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
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
