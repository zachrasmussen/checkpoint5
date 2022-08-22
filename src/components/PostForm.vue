<template>
  <form @submit.prevent="handleSubmit()" class="create-post">
    <div class="mb-3">
      <label for="post" class="form-label"></label>
      <textarea
        class="form-control"
        name="post"
        id="post"
        rows="3"
        placeholder="Share something new"
        v-model="editable.body"
      ></textarea>
    </div>
    <div class="d-flex justify-content-between align-items-center pt-2">
      <!-- <div>
        <i class="mdi mdi-camera plane w-5"></i><span>Photo / Video</span>
      </div> -->
      <input
        class="w-50 mdi mdi-camera camera video-border"
        type="text"
        id="imgUrl"
        placeholder="Photo / Video"
        v-model="editable.imgUrl"
      />
      <button
        type="submit"
        class="text-end btn btn-outline w-5 mdi mdi-send"
        data-bs-dismiss="modal"
      >
        {{ editable.id ? "Save" : "Post" }}
      </button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";

export default {
  setup() {
    const editable = ref({});

    watchEffect(() => {
      if (!AppState.activePost) {
        return;
      }
      editable.value = { ...AppState.activePost };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await postsService.editPost(editable.value);
            Pop.success("Post Edited");
          } else {
            await postsService.createPost(editable.value);
            Pop.success("Successfully Posted");
          }
        } catch (error) {
          logger.error("[Create or Edit Post]", error);
          Pop.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.camera {
  font-size: 15px;
  margin-right: 10px;
  padding-left: 5px;
}

.video-border {
  border: none;
}
</style>
