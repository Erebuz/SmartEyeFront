<template>
  <div class="live-video">
    <video-player
      :options="videoOptions"
      @mounted="set_video"
      @click="play"
    />
  </div>
</template>

<script lang="ts" setup>
import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import { VideoPlayer, VideoPlayerState } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { onMounted, onUnmounted, reactive, Ref, ref } from 'vue'
import Hls, { HlsConfig } from 'hls.js'
import { STREAM_BASE } from '@/plugins/http-common'


const videoOptions: VideoJsPlayerOptions = reactive({
  fluid: true,
  autoplay: true,
  controls: false,
  noUITitleAttributes: true,
})

let hls

const hls_options: Partial<HlsConfig> = {}

function create_hls() {
  hls = new Hls(hls_options)
  hls.loadSource(STREAM_BASE + "/video/stream.m3u8")
  hls.attachMedia(video.value)
}

function destroy_hls() {
  if (hls) {
    hls.destroy()
  }
}

const video_player = ref(null) as unknown as Ref<VideoJsPlayer>
const video = ref(null) as unknown as Ref<HTMLVideoElement>
const video_state = ref(null) as unknown as Ref<VideoPlayerState>

function set_video(ev: {
  video: HTMLVideoElement
  player: VideoJsPlayer
  state: VideoPlayerState
}) {
  video_player.value = ev.player
  video.value = ev.video
  video_state.value = ev.state
}


function play() {
  create_hls()

  if (!hls.media.playing) {
    hls.media.play()
    video_player.value.currentTime(video_state.value.duration - 1)
  }
}

function stop() {
  if (hls?.media) {
    hls.media.pause()
    destroy_hls()
  }
}
onMounted(() => {
  create_hls()
})

onUnmounted(() => {
  destroy_hls()
})
</script>

<style>
.live-video {
    width: 100%;
    height: 100%;
    position: relative;

    & .video-js {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
