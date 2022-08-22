<template>
  <div class="container">
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-7 my-2" v-for="p in posts" :key="p.id">
        <PostCard :post="p" />
      </div>
    </div>
  </div>

  <div class="row mb-5 pb-5 mt-5">
    <div class="col-6 text-end">
      <button
        @click="changePage(previousPage)"
        class="btn btn-outline-dark w-50"
        :disabled="!previousPage"
      >
        Previous
      </button>
    </div>

    <div class="col-6">
      <button
        @click="changePage(nextPage)"
        class="btn btn-outline-dark w-50"
        :disabled="!nextPage"
      >
        Next
      </button>
    </div>
  </div>

  <Modal id="create-post">
    <PostForm />
  </Modal>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      } catch (error) {
        logger.error("Getting Posts", error);
        Pop.error(error);
      }
    }

    onMounted(async () => {
      try {
        await postsService.getPosts();
      } catch (error) {}
    });

    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),

      async changePage(url) {
        console.log("url", url);
        try {
          await postsService.changePage(url);
        } catch (error) {}
      },
    };
  },
};
</script>

<style scoped lang="scss">
</style>
