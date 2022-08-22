<template>
  <div class="ad img-fluid p-1">
    <a href="">
      <img class="selectable" :src="ad.tall" alt="" :title="ad.title" />
    </a>
  </div>
</template>



<script>
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
