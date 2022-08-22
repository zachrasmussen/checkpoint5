<template>
  <div class="search-form">
    <form @submit.prevent="search">
      <div class="input-group">
        <input class="form-control" type="text" required v-model="query" />
        <button class="btn btn-outline-success" type="submit">
          <i class="mdi mdi-magnify"></i>
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
export default {
  setup() {
    const query = ref("");

    return {
      query,
      async searchPosts() {
        try {
          await postsService.getPostsBySearch(query.value);
          query.value = "";
        } catch (error) {
          logger.error("[Searching Posts]", error);
          Pop.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
