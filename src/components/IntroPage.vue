<template>
  <v-main class="intro mb-0">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="introCard">
            <v-card-title class="d-flex align-center">
              {{ $t('messages.welcome') }}
              <img :src="`${baseUrl}solar-cross.png`" alt="" class="welcome-logo ml-2" />
            </v-card-title>
            <v-card-text>
              <div class="text-subtitle-1" v-html="$t('messages.introduction.whatIsIt')"></div>
              <p>{{ $t('messages.introduction.whatIsItText1') }}</p>
              <p>{{ $t('messages.introduction.whatIsItText2') }}</p>
              <i18n-t keypath="messages.introduction.whatIsItText3" tag="p">
                <a :href="config.sourceCodeGitlab" target="_blank">GitLab</a>
              </i18n-t>
              <p class="text-subtitle-1 mb-1">{{ $t('messages.introduction.credits.title') }}</p>
              <p class="mt-0">{{ $t('messages.introduction.credits.diskordanz') }}</p>
              <p class="mt-0">{{ $t('messages.introduction.credits.miokido') }}</p>
              <p class="mt-0">{{ $t('messages.introduction.credits.katsu') }}</p>

              <div class="bottom-row mt-4">
                <img
                  :src="`${baseUrl}intro-banner.png`"
                  alt="Degenesis"
                  class="intro-banner"
                />
                <div class="changelog-panel">
                  <Changelog />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import config from '@/config'
import Changelog from '@/components/Changelog.vue'
const baseUrl = import.meta.env.BASE_URL
</script>

<style scoped>
.intro {
  height: 100vh;
}

.introCard {
  max-width: 80em;
}

p {
  margin-top: 1em;
}

.welcome-logo {
  height: 1.4em;
  width: auto;
}

.bottom-row {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.intro-banner {
  display: block;
  width: auto;
  max-width: 45%;
  max-height: 380px;
  border-radius: 8px;
  flex-shrink: 0;
}

.changelog-panel {
  flex: 1;
  border-left: 2px solid #cc0000;
  padding-left: 24px;
}
</style>
