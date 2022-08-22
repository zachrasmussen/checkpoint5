<template>
  <div class="ad img-fluid p-1">
    <a href="">
      <img class="selectable" :src="ad.square" alt="" :title="ad.title" />
    </a>
  </div>
</template>



<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";

export default {
  props: {
    ad: { type: Ad, required: true },
  },
  setup() {
    return {};
  },
};
</script>




// <style lang="scss" scoped>
//
</style>
