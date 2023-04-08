<template>
  <v-container class="mt-8">
    <v-form @submit.prevent="save">
      <v-row class="flex-column">
        <v-col cols="4">
          <v-text-field
            v-model="username"
            label="Имя пользователя"
            hide-details
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model.number="password"
            label="Новый пароль"
            hide-details
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model.number="confirm"
            label="Подтверждение пароля"
            hide-details
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="4">
          <v-btn variant="outlined" type="submit">Сохранить</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="4">
        <router-link :to="{ name: 'general' }" class="btn">
          <v-btn variant="outlined">Назад</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import store from '@/store'

const username = ref(store.getters.getAuth.user().username)

const password = ref('')
const confirm = ref('')

function save() {
  store.dispatch('api_update_me', {
    password: password.value,
    username: username.value,
  })
}
</script>

<style scoped>
.btn {
  text-decoration: none;
  color: black;
}
</style>
