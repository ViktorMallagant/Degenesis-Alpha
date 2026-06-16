<template>
  <v-main class="intro mb-0">
    <v-container>
      <v-row>
        <v-col class="float-left">
          <v-card class="introCard">
            <v-card-title>{{ $t('messages.welcome') }}</v-card-title>
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
</style>
