<template>
  <div class="dilemma-root">
    <div class="dilemma-header">
      <v-tooltip max-width="360" location="bottom">
        <template #activator="{ props }">
          <span v-bind="props" class="dilemma-title text-uppercase font-weight-bold" style="cursor:help;border-bottom:1px dotted #666">Compétences Spéciales</span>
        </template>
        <span>Lors de la création, vous devez trancher deux dilemmes qui définissent l'âme de votre personnage.<br><br>Il existe deux couples de compétences spéciales dans Degenesis et vous devez en choisir une seule à chaque fois.</span>
      </v-tooltip>
    </div>

    <div class="dilemma-row">
      <!-- Pulsions vs Concentration -->
      <div class="dilemma-block">
        <div class="dilemma-label mb-2">PULSIONS CONTRE CONCENTRATION</div>
        <v-btn-toggle
          :model-value="store.mentalPowerChoice"
          @update:model-value="v => v && store.setMentalPowerChoice(v)"
          mandatory
          density="compact"
          rounded="lg"
          class="dilemma-toggle"
        >
          <v-btn value="primal" :color="store.mentalPowerChoice === 'primal' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">Pulsions</span>
              <span class="dilemma-skill-attr">INS</span>
            </div>
          </v-btn>
          <v-btn value="focus" :color="store.mentalPowerChoice === 'focus' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">Concentration</span>
              <span class="dilemma-skill-attr">INT</span>
            </div>
          </v-btn>
        </v-btn-toggle>
        <div v-if="!store.mentalPowerChoice" class="dilemma-warning mt-1">
          ⚠ Choix requis
        </div>
        <div v-else class="dilemma-blocked mt-1">
          {{ store.mentalPowerChoice === 'primal' ? 'Concentration' : 'Pulsions' }} bloquée
        </div>
      </div>

      <div class="dilemma-separator"></div>

      <!-- Foi vs Volonté -->
      <div class="dilemma-block">
        <div class="dilemma-label mb-2">FOI CONTRE VOLONTÉ</div>
        <v-btn-toggle
          :model-value="store.mentalResistanceChoice"
          @update:model-value="v => v && store.setMentalResistanceChoice(v)"
          mandatory
          density="compact"
          rounded="lg"
          class="dilemma-toggle"
        >
          <v-btn value="faith" :color="store.mentalResistanceChoice === 'faith' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">Foi</span>
              <span class="dilemma-skill-attr">PSY</span>
            </div>
          </v-btn>
          <v-btn value="willpower" :color="store.mentalResistanceChoice === 'willpower' ? 'red-darken-2' : ''" size="small">
            <div class="dilemma-btn-content">
              <span class="dilemma-skill-name">Volonté</span>
              <span class="dilemma-skill-attr">PSY</span>
            </div>
          </v-btn>
        </v-btn-toggle>
        <div v-if="!store.mentalResistanceChoice" class="dilemma-warning mt-1">
          ⚠ Choix requis
        </div>
        <div v-else class="dilemma-blocked mt-1">
          {{ store.mentalResistanceChoice === 'faith' ? 'Volonté' : 'Foi' }} bloquée
        </div>
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
.dilemma-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.dilemma-title {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #bbb;
}
.dilemma-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}
.dilemma-block {
  flex: 1;
}
.dilemma-separator {
  width: 1px;
  background: rgba(255,255,255,0.1);
  align-self: stretch;
}
.dilemma-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #ccc;
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
  font-size: 12px;
  font-weight: 600;
}
.dilemma-skill-attr {
  font-size: 10px;
  opacity: 0.6;
}
.dilemma-warning {
  font-size: 11px;
  color: #ef9a9a;
}
.dilemma-blocked {
  font-size: 11px;
  color: #777;
}
</style>
