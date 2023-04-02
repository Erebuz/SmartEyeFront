<template>
  <div class="layout-default">
    <header class="header">
      <v-row>
        <v-col cols='2'>Smart Eye</v-col>

        <v-col cols='2'>
          <v-btn>Выход из системы</v-btn>
        </v-col>
      </v-row>
    </header>

    <router-view />
  </div>
</template>

<script lang="ts" setup></script>
