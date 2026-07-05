<template>
  <div class="min-h-screen relative overflow-hidden">
    <div class="absolute inset-0 bg-anime"></div>
    
    <div 
      class="movie-curtain-top absolute top-0 left-0 right-0 bg-black transition-transform duration-1500 ease-in-out"
      :style="{ height: curtainTopHeight }"
    ></div>
    <div 
      class="movie-curtain-bottom absolute bottom-0 left-0 right-0 bg-black transition-transform duration-1500 ease-in-out"
      :style="{ height: curtainBottomHeight }"
    ></div>

    <div v-if="showIntro" @click="enterMain" class="absolute inset-0 flex items-center justify-center z-20 cursor-pointer bg-black/60">
      <div class="text-center px-6 max-w-lg">
        <div 
          class="text-white font-xiaowei text-xl md:text-2xl leading-relaxed transition-opacity duration-1000"
          :style="{ opacity: textOpacity, textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,100,150,0.4)' }"
        >
          {{ displayedText }}
          <span v-if="isTyping" class="animate-pulse">|</span>
        </div>
        <div 
          v-if="showClickHint"
          class="mt-12 animate-bounce-gentle"
        >
          <div class="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-lg shadow-xl border-2 border-pink-200">
            <span class="text-pink-600 font-kuaile text-xl">我的一切</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showMain" class="relative z-10 min-h-screen bg-anime bg-overlay flex flex-col items-center justify-center p-6">
      <div class="text-center max-w-md">
        <div class="animate-bounce-in mb-6">
          <div class="w-28 h-28 mx-auto bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl shadow-pink-500/30">
            <Crown class="w-14 h-14 text-white" />
          </div>
        </div>

        <h1 class="text-4xl font-kuaile text-white mb-4 animate-fade-in" style="text-shadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,100,150,0.4)'">红岩网校工作站</h1>
        
        <div class="card-anime p-6 mb-6 animate-slide-up" style="animation-delay: 0.1s;">
          <p class="text-gray-800 font-kuaile text-lg mb-3">互联网产品开发运营的校级学生组织</p>
          <p class="text-gray-600 leading-relaxed font-xiaowei">在校团委的指导下走出了一大批优秀的互联网人才，深受腾讯、字节跳动、百度等知名互联网企业青睐。</p>
        </div>

        <button 
          @click="handleStart"
          class="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-kuaile text-xl py-4 px-8 rounded-full shadow-xl shadow-pink-500/30 transform hover:scale-105 transition-all duration-300 animate-bounce-in flex items-center justify-center gap-2"
          style="animation-delay: 0.4s;"
        >
          <Play class="w-6 h-6" />
          开始你的红岩之旅
        </button>
      </div>
    </div>

    <div 
      v-if="!showIntro && !showMain"
      @click="startIntro"
      class="absolute inset-0 z-30 cursor-pointer"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Crown, Play } from 'lucide-vue-next'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const curtainTopHeight = ref('50%')
const curtainBottomHeight = ref('50%')
const showIntro = ref(false)
const showMain = ref(false)
const showClickHint = ref(false)
const textOpacity = ref(0)
const displayedText = ref('')
const isTyping = ref(true)

const fullText = '曾经，有一份真挚的offer摆在我的面前，我没有珍惜，直到失去才追悔莫及，重来一世，我将拿回属于我的一切……'

let typingIndex = 0
let typingInterval = null

const startIntro = () => {
  curtainTopHeight.value = '0%'
  curtainBottomHeight.value = '0%'
  
  setTimeout(() => {
    showIntro.value = true
    textOpacity.value = 1
    startTyping()
  }, 1500)
}

const startTyping = () => {
  typingInterval = setInterval(() => {
    if (typingIndex < fullText.length) {
      displayedText.value += fullText[typingIndex]
      typingIndex++
    } else {
      isTyping.value = false
      clearInterval(typingInterval)
      
      setTimeout(() => {
        showClickHint.value = true
      }, 500)
    }
  }, 80)
}

const enterMain = () => {
  if (showClickHint.value) {
    showIntro.value = false
    showMain.value = true
  }
}

const handleStart = () => {
  gameStore.startGame()
}

onMounted(() => {
  setTimeout(() => {
    startIntro()
  }, 500)
})
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

@keyframes bounce-gentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-gentle {
  animation: bounce-gentle 1.5s ease-in-out infinite;
}

.text-shadow-anime {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 100, 150, 0.3);
}
</style>
