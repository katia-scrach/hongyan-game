<template>
  <div class="min-h-screen">
    <Transition name="fade" mode="out-in">
      <StartScreen v-if="gameStore.currentScene === 'start'" key="start" />
      <TurntableSelect v-else-if="gameStore.currentScene === 'identity'" key="identity" />
      <div v-else-if="gameStore.currentScene === 'stage'" key="stage" class="min-h-screen">
        <ProgressBar 
          :current-stage="gameStore.currentStage"
          :progress="gameStore.progress"
          :completed-stages="gameStore.completedStages"
          :current-stage-data="gameStore.currentStageData"
        />
        <StagePlayer 
          :stage-data="gameStore.currentStageData"
          :is-interactive="gameStore.isCurrentStageInteractive"
          :current-question-index="gameStore.currentQuestionIndex"
          :has-received-mail="gameStore.hasReceivedMail"
          :stage-index="gameStore.currentStage"
          @select="gameStore.selectChoice"
        />
      </div>
      <OkrDashboard 
        v-else-if="gameStore.currentScene === 'stats'" 
        key="stats"
        :choices="gameStore.choices"
        @complete="gameStore.completeStats"
      />
      <WaitingScreen 
        v-else-if="gameStore.currentScene === 'waiting'" 
        key="waiting"
      />
      <ResultScreen 
        v-else-if="gameStore.currentScene === 'result'" 
        key="result"
        :selected-identity="gameStore.selectedIdentity"
        :choices="gameStore.choices"
        @restart="gameStore.resetGame"
      />
    </Transition>

    <MailSystem 
      :show="gameStore.showMail"
      :title="gameStore.mailTitle"
      :content="gameStore.mailContent"
      :mail-type="gameStore.mailType"
      @close="gameStore.closeMail"
    />
  </div>
</template>

<script setup>
import { useGameStore } from './stores/gameStore'
import StartScreen from './components/StartScreen.vue'
import TurntableSelect from './components/TurntableSelect.vue'
import ProgressBar from './components/ProgressBar.vue'
import StagePlayer from './components/StagePlayer.vue'
import OkrDashboard from './components/OkrDashboard.vue'
import WaitingScreen from './components/WaitingScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import MailSystem from './components/MailSystem.vue'

const gameStore = useGameStore()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
