<template>
  <div class="container">
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-7 my-2" v-for="p in posts" :key="p.id">
        <SearchForm />
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
</template>


<script>
import SearchForm from "../components/SearchForm.vue";
export default {
  setup() {
    onMounted(() => {
      getPosts();
    });

    return {
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
  components: { SearchForm },
};
</script>

<style lang="scss" scoped>
</style>