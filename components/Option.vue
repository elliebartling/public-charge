<template>
  <b-button
    @click="select(question, option.value)"
    :variant="isActiveStyling"
    class="d-flex flex-row justify-content-between"
  >
    <span>
      {{ option.text }}
    </span>
    <span v-if="!isActive">{{ useRateForSelection }}</span>
  </b-button>
</template>

<script>
import { filter, round } from 'lodash'
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
      return this.isActive ? 'dark' : 'outline-dark'
    },
    useRateForSelection() {
      const filters = { ...this.filters }
      // Change our question to have this option selected instead
      filters[this.question.col] = this.option.value

      const result = filter(this.data, filters)[0]
      if (result === undefined) return 'N/A'
      return round(result.rate * 100, 1) + '%'
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
