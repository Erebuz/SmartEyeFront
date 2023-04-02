<template>
  <v-container class="h-100">
    <v-row class="justify-center align-center h-100">
      <v-col cols="3">
        <v-form @submit.prevent="login">
          <v-text-field placeholder="Введите логин" label="Логин" />
          <v-text-field placeholder="Введите пароль" label="Пароль" />
          <v-btn type="submit"></v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import router from "@/router";

function login() {
  router.push({ name: "general" });
}
</script>
