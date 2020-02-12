<template>
  <b-form-group id="input-group-1" :label="question.label" label-for="input-1">
    <small class="form-text text-muted mb-3 mt-n2" v-html="question.help" />
    <b-button-group style="width:100%" vertical>
      <Option
        v-for="(opt, index) in options"
        :key="index"
        :option="opt"
        :question="question"
      />
    </b-button-group>
  </b-form-group>
</template>

<script>
import Option from '~/components/Option'
export default {
  name: 'Radio',
  components: {
    Option
  },
  props: {
    question: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Array,
      default() {
        return [
          { value: '*', text: 'Any' },
          { value: 'YES', text: 'Yes' },
          { value: 'NO', text: 'No' }
        ]
      }
    }
  },
  methods: {
    select(question, newValue) {
      this.$store.commit('update', {
        question,
        newValue
      })
    },
    isActive(opt) {
      return this.question.selected === opt.value
    },
    isActiveStyling(opt) {
      return this.isActive(opt) ? 'dark' : 'outline-dark'
    },
    useRateForSelection(opt) {
      const filters = this.filters
      // eslint-disable-next-line
      console.log(filters)
      filters[this.question.col] = opt.value
      return this.$store.getters.getAverageUseForOption(filters)
    }
  }
}
</script>

<style>
.form-group > label {
  font-weight: 700;
  font-size: 20px;
  line-height: 1.1;
  margin-bottom: 1rem;
}
</style>
