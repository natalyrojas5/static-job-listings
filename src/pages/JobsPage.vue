<script setup lang="ts" >
import Job from "@/components/Job.vue";
import Filter from "@/components/Filter.vue";
import { useJobsStore } from "@/stores/jobs";
import { computed } from "vue";

const store = useJobsStore();
const hasOptions = computed(() => store.hasOptionsFilter);
</script>

<template>
  <main>
    <div class="header"></div>
    <div class="job-listings" :class="[!hasOptions ? 'margin-top' : '']">
      <Filter v-if="hasOptions" />
      <Job
        v-for="(job, index) in store.currentJobs"
        :key="index"
        :id="job.id"
        :company="job.company"
        :logo="job.logo"
        :new="job.new"
        :featured="job.featured"
        :position="job.position"
        :role="job.role"
        :level="job.level"
        :postedAt="job.postedAt"
        :contract="job.contract"
        :location="job.location"
        :languages="job.languages"
        :tools="job.tools"
      />
    </div>
  </main>
</template>

<style lang="scss">
.job-listings {
  max-width: 960px;
  margin: auto;
  &.margin-top {
    margin-top: 3.2rem;
    @media (max-width: 767.98px) {
      margin-top: 5rem;
    }
  }
}
</style>