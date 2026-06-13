<template>
  <div class="dilemma-root">
    <div class="dilemma-title text-uppercase text-caption font-weight-bold mb-3">Dilemmes psychiques</div>

    <!-- Pulsions vs Concentration -->
    <div class="dilemma-block mb-4">
      <div class="dilemma-label mb-1">
        <span class="font-weight-bold">Compétence mentale</span>
        <span class="dilemma-sub ml-2">— détermine comment vous gérez votre Égo</span>
      </div>
      <v-btn-toggle
        :model-value="store.mentalPowerChoice"
        @update:model-value="v => v && store.setMentalPowerChoice(v)"
        mandatory
        density="compact"
        rounded="lg"
        class="dilemma-toggle"
      >
        <v-btn value="primal" :color="store.mentalPowerChoice === 'primal' ? 'orange-darken-2' : ''" size="small">
          <div class="dilemma-btn-content">
            <span class="dilemma-skill-name">Pulsions</span>
            <span class="dilemma-skill-attr">INS</span>
          </div>
        </v-btn>
        <v-btn value="focus" :color="store.mentalPowerChoice === 'focus' ? 'orange-darken-2' : ''" size="small">
          <div class="dilemma-btn-content">
            <span class="dilemma-skill-name">Concentration</span>
            <span class="dilemma-skill-attr">INT</span>
          </div>
        </v-btn>
      </v-btn-toggle>
      <div v-if="!store.mentalPowerChoice" class="dilemma-warning mt-1">
        ⚠ Choix requis — la compétence non choisie sera définitivement bloquée
      </div>
      <div v-else class="dilemma-blocked mt-1">
        {{ store.mentalPowerChoice === 'primal' ? 'Concentration' : 'Pulsions' }} est bloquée (ne peut jamais être augmentée)
      </div>
    </div>

    <!-- Foi vs Volonté -->
    <div class="dilemma-block">
      <div class="dilemma-label mb-1">
        <span class="font-weight-bold">Rempart mental</span>
        <span class="dilemma-sub ml-2">— protège votre âme contre les attaques mentales</span>
      </div>
      <v-btn-toggle
        :model-value="store.mentalResistanceChoice"
        @update:model-value="v => v && store.setMentalResistanceChoice(v)"
        mandatory
        density="compact"
        rounded="lg"
        class="dilemma-toggle"
      >
        <v-btn value="faith" :color="store.mentalResistanceChoice === 'faith' ? 'deep-purple-lighten-1' : ''" size="small">
          <div class="dilemma-btn-content">
            <span class="dilemma-skill-name">Foi</span>
            <span class="dilemma-skill-attr">PSY</span>
          </div>
        </v-btn>
        <v-btn value="willpower" :color="store.mentalResistanceChoice === 'willpower' ? 'deep-purple-lighten-1' : ''" size="small">
          <div class="dilemma-btn-content">
            <span class="dilemma-skill-name">Volonté</span>
            <span class="dilemma-skill-attr">PSY</span>
          </div>
        </v-btn>
      </v-btn-toggle>
      <div v-if="!store.mentalResistanceChoice" class="dilemma-warning mt-1">
        ⚠ Choix requis — la compétence non choisie sera définitivement bloquée
      </div>
      <div v-else class="dilemma-blocked mt-1">
        {{ store.mentalResistanceChoice === 'faith' ? 'Volonté' : 'Foi' }} est bloquée (ne peut jamais être augmentée)
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/store'
const store = useCharacterStore()
</script>

<style scoped>
.dilemma-root {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
.dilemma-title {
  letter-spacing: 0.1em;
  color: #bbb;
}
.dilemma-label {
  font-size: 13px;
  color: #eee;
}
.dilemma-sub {
  font-size: 11px;
  color: #888;
  font-style: italic;
}
.dilemma-toggle {
  gap: 4px;
}
.dilemma-btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 2px 8px;
}
.dilemma-skill-name {
  font-size: 13px;
  font-weight: 600;
}
.dilemma-skill-attr {
  font-size: 10px;
  opacity: 0.7;
}
.dilemma-warning {
  font-size: 11px;
  color: #ef9a9a;
}
.dilemma-blocked {
  font-size: 11px;
  color: #888;
}
</style>
