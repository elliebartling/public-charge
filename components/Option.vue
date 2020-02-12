<template>
  <b-button
    @click="select(question, option.value)"
    :variant="isActiveStyling"
    :disabled="!dataAvailable"
    class="d-flex flex-row justify-content-between"
  >
    <span>
      {{ option.text }}
    </span>
    <span v-if="dataAvailable" :class="{ 'is-selected': isActive }">
      <span class="icon">
        <b-icon v-if="greaterThanOverall" icon="arrow-up-right" />
        <b-icon v-if="lessThanOverall" icon="arrow-down-right" />
      </span>
      <span class="percent">
        {{ useRateForSelection | percent }}
      </span>
    </span>
    <span v-else>
      Not Enough Data
    </span>
  </b-button>
</template>

<script>
import { filter } from 'lodash'
export default {
  props: {
    question: {
      type: Object,
      default() {
        return {}
      }
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    data() {
      return this.$store.state.data
    },
    filters() {
      return this.$store.getters.filters
    },
    isActive() {
      return this.question.selected === this.option.value
    },
    isActiveStyling() {
      if (!this.dataAvailable) {
        return 'dark button-disabled'
      } else {
        return this.isActive ? 'dark' : 'outline-dark'
      }
    },
    overallUseRate() {
      return this.$store.getters.averageUse
    },
    lessThanOverall() {
      return this.useRateForSelection < this.overallUseRate
    },
    greaterThanOverall() {
      return this.useRateForSelection > this.overallUseRate
    },
    dataAvailable() {
      return this.useRateForSelection
    },
    useRateForSelection() {
      const filters = { ...this.filters }
      // Change our question to have this option selected instead
      filters[this.question.col] = this.option.value

      const result = filter(this.data, filters)[0]
      if (result === undefined) return false
      return result.rate
    }
  },
  methods: {
    select(question, newValue) {
      this.$store.commit('update', {
        question,
        newValue
      })
    }
  }
}
</script>

<style>
.is-selected {
  opacity: 0.5;
}

.button-disabled {
  color: #b6bdc1 !important;
  background-color: #505962 !important;
  cursor: not-allowed;
}
</style>
