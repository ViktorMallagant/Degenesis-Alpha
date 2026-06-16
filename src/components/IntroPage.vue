<template>
  <v-main class="intro mb-0">
    <v-container>
      <v-row>
        <v-col class="float-left">
          <v-card class="introCard">
            <v-card-title class="d-flex align-center">
              {{ $t('messages.welcome') }}
              <img :src="`${baseUrl}solar-cross.png`" alt="" class="welcome-logo ml-2" />
            </v-card-title>
            <v-card-text>
              <div>
                <div class="text-subtitle-1" v-html="$t('messages.introduction.whatIsIt')"> </div>
                <p>{{ $t('messages.introduction.whatIsItText1') }}</p>
                <p>{{ $t('messages.introduction.whatIsItText2') }}</p>
                <i18n-t keypath="messages.introduction.whatIsItText3" tag="p">
                    <a :href="config.sourceCodeGitlab" target="_blank">GitLab</a>
                </i18n-t>
                <p class="text-subtitle-1 mb-1">{{ $t('messages.introduction.credits.title') }}</p>
                <p class="mt-0">{{ $t('messages.introduction.credits.diskordanz') }}</p>
                <p class="mt-0">{{ $t('messages.introduction.credits.miokido') }}</p>
                <p class="mt-0">{{ $t('messages.introduction.credits.katsu') }}</p>
                <img
                  :src="`${baseUrl}intro-banner.png`"
                  alt="Degenesis"
                  class="intro-banner mt-4"
                />
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

.intro-banner {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 380px;
  border-radius: 8px;
  margin-left: 0;
  margin-right: auto;
}
</style>
