<template>
  <div class="img-fluid mt-5">
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
img {
  margin-left: 32px;
}
</style>
