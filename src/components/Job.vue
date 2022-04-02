<script  lang="ts" setup>
import { useJobsStore } from "@/stores/jobs";
import { computed } from "vue";

interface JobProps {
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: Array<string>;
  tools: Array<string>;
}
const props = defineProps<JobProps>();
const store = useJobsStore();
const hasOptions = computed(() => store.hasOptionsFilter);
const currentOptions = computed(() => store.currentOptionsFilter);

const containOption = (option: string) => {
  return currentOptions.value.some((item) => item === option);
};
</script>

<template>
  <div
    class="job container"
    :class="{ 'job-new': props.new, 'margin-top': hasOptions }"
  >
    <div class="job-image">
      <img :src="props.logo" :alt="props.company" :title="props.company" />
    </div>
    <div class="job-info">
      <div class="d-flex mb">
        <h1 class="job-info-name">{{ props.company }}</h1>
        <p v-if="props.new" class="job-info-is-new">New !</p>
        <p v-if="props.featured" class="job-info-featured">Featured</p>
      </div>

      <p class="job-info-position">{{ props.position }}</p>

      <div class="d-flex job-info-extra mt">
        <p class="d-flex">{{ props.postedAt }} <span class="dot"></span></p>
        <p class="d-flex">{{ props.contract }} <span class="dot"></span></p>
        <p class="d-flex">{{ props.location }}</p>
      </div>
    </div>
    <div class="job-tools d-flex">
      <button
        v-for="(tool, index) in props.languages"
        :key="index"
        @click="store.addOption(tool)"
        :class="{ activated: containOption(tool) }"
      >
        {{ tool }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Job.scss";
</style>