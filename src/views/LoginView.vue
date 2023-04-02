<template>
  <v-container class="h-100">
    <v-row class="justify-center align-center h-100">
      <v-col cols="3">
        <v-form validate-on="submit" @submit.prevent="log_in">
          <v-text-field
            v-model="username"
            placeholder="Введите логин"
            label="Логин"
            :rules="[req]"
          />
          <v-text-field
            v-model="password"
            placeholder="Введите пароль"
            label="Пароль"
            :rules="[req]"
          />
          <v-btn type="submit" block>Вход</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import store from '@/store'

const username = ref('')
const password = ref('')

function log_in() {
  store.getters.getAuth.login({
    data: { username: username.value, password: password.value },
  })
}

const req = (val: string) => val.length > 0 || 'Обязательное поле'
</script>

<style></style>
