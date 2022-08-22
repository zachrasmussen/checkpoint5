<template>
  <form class="card account-form elevation-2" @submit.prevent="handleSubmit()">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.name"
          required
          name="name"
        />
      </div>
      <div class="my-3">
        <label for="email">email:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.email"
          required
          email="email"
        />
      </div>
      <div class="my-3">
        <label for="picture">picture:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.picture"
          required
          picture="picture"
        />
      </div>
      <div class="my-3">
        <label for="bio">bio:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.bio"
          required
          bio="bio"
        />
      </div>
      <div class="my-3">
        <label for="coverImg">coverImg:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.coverImg"
          required
          coverImg="coverImg"
        />
      </div>
      <div class="my-3">
        <label for="github">github:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.github"
          github="github"
        />
      </div>
      <div class="my-3">
        <label for="linkedin">linkedin:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.linkedin"
          linkedin="linkedin"
        />
      </div>
      <div class="my-3">
        <label for="resume">resume:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.resume"
          resume="resume"
        />
      </div>
      <!-- <div class="my-3 w-50">
        <label for="classYear">classYear:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.classYear"
          classYear="classYear"
        />
      </div>
      <div class="my-3 w-50">
        <label for="graduated">graduated:</label>
        <input
          type="text"
          class="form-control"
          v-model="editable.graduated"
          graduated="graduated"
        />
      </div> -->

      <div>
        <button type="submit" class="btn btn-primary w-100 mt-2">Save</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { router } from "../router.js";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});

    watchEffect(() => {
      if (!AppState.account) {
        return;
      }
      editable.value = { ...AppState.account };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value);
          router.push({
            name: "Profile",
            params: { profileId: editable.value.id },
          });
        } catch (error) {
          // logger.error("[Editing Account]", error);
          // Pop.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
