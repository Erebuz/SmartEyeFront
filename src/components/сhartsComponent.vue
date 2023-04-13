<template>
  <chart
    v-if="series.length > 0"
    ref="chartRef"
    :constructor-type="'stockChart'"
    :options="chartOptions"
  />
</template>

<script lang="ts" setup>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import { computed, ComputedRef, ref } from 'vue'
import store from '@/store'

stockInit(Highcharts)

const chartRef = ref(null)

const data = computed(() => store.getters.getNN.activity_log)

const series = computed<Highcharts.SeriesOptionsType[]>(() => {
  const video = {
    type: 'area',
    name: 'Activity',
    data: data.value,
    marker: {
      enabled: true,
      symbol: 'circle',
    },
    states: {
      hover: {
        enabled: false,
      },
    },
    color: 'black',
    fillColor: {
      linearGradient: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
      },
      stops: [
        [0, 'rgba(0, 0, 0, 0.5)'],
        [1, 'rgba(0, 0, 0, 0.5)'],
      ],
    },
  } as Highcharts.SeriesOptionsType

  const s: Highcharts.SeriesOptionsType[] = [video]

  return s
})

const chartOptions: ComputedRef<Highcharts.Options> = computed(() => {
  return {
    time: {
      useUTC: false,
    },
    legend: {
      enabled: false,
    },
    chart: {
      zoomType: undefined,
      height: 600,
      animation: false,
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    xAxis: {
      type: 'linear',
      ordinal: false,
      labels: {
        formatter: (ctx) => {
          const cur = store.getters.getNN.activity_log_data.getTime()
          const point = ctx.value

          return new Date(cur + point * 200).toLocaleTimeString()
        },
      },
    },
    yAxis: {
      labels: {},
      minTickInterval: 1,
      max: 10,
      opposite: false,
    },
    tooltip: {
      formatter: function () {
        const cur = store.getters.getNN.activity_log_data.getTime()
        const point = this.x

        return new Date(cur + point * 200).toLocaleTimeString()
      },
    },
    series: series.value || [],
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  }
})
</script>
