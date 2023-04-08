<template>
  <v-layout class="layout-default">
    <v-app-bar class="header">
      <v-container>
        <v-row class="justify-space-between align-center">
          <v-col cols="1">
            <router-link :to="{ name: 'user' }" class="user">
              {{ store.getters.getAuth.user().username.toUpperCase() }}
            </router-link>
          </v-col>

          <v-col cols="2">
            <h2>Smart Eye</h2>
          </v-col>

          <v-col cols="7">
            <h3 class="text-red">{{ store.getters.active_classes }}</h3>
          </v-col>

          <v-col cols="2">
            <v-btn append-icon="mdi-logout" @click="logout"
              >Выход из системы</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import store from '@/store'

function logout() {
  store.getters.getAuth.logout({})
}
</script>

<style scoped>
.user {
  width: min-content;
  padding: 3px;
  border: 2px solid black;
  border-radius: 10px;
  font-weight: bold;
  text-decoration: none;
  color: black;
}
</style>
