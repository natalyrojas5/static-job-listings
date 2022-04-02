import { defineStore } from 'pinia'
import jobs from '@/data/jobs'

export const useJobsStore = defineStore('job', {
  state: () => ({
    jobs,
    optionsFilter: [],
  }),
  getters: {
    currentJobs: (state) => state.jobs.map(job => {
      if (job.level) job.languages.unshift(job.level)
      if (job.role) job.languages.unshift(job.role)
      if (job.tools) job.languages.push(...job.tools)
      job.languages = [...new Set(job.languages)]
      return job
    }),
    hasOptionsFilter: (state) => {
      return state.optionsFilter.length > 0
    },
    currentOptionsFilter: (state) => {
      return state.optionsFilter
    }

  },
  actions: {
    filter() {
      const cantOptions = this.optionsFilter.length;

      if (cantOptions === 0) {
        this.jobs = jobs
        return
      }
      this.jobs = jobs.filter((job: any) => {
        const cantOptionsInJob = this.optionsFilter.filter((option: any) => job.languages.includes(option))
        return cantOptionsInJob.length === cantOptions
      })
    },
    addOption(option: string) {
      if (this.optionsFilter.includes(option)) return
      this.optionsFilter = [...this.optionsFilter, option];
      this.filter()
    },
    deleteOption(option: string) {
      this.optionsFilter = this.optionsFilter.filter((item: string) => item !== option)
      this.filter()
    },
    deleteOptions() {
      this.optionsFilter = [];
      this.jobs = jobs
    }
  }
})
