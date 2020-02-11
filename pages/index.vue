<template>
  <div class="container mt-5">
    <div class="alert alert-danger mb-5" role="alert">
      <strong>Note:</strong> These calculations only apply if you meet the
      minimum household income threshold. Not sure if you do? Check here:
      www.link.com
    </div>
    <div class="row d-flex flex-row justify-content-between">
      <div class="col-lg-6">
        <h1 class="title display-4 weight-heavy mb-4">
          Are you likely to be a Public Charge?
        </h1>
        <p class="weight-medium">
          Describe here what this app does, who it is for, and what a “public
          charge” is. Fusce vehicula dolor arcu, sit amet blandit dolor mollis
          nec. Donec viverra eleifend lacus, vitae ullamcorper metus. Sed
          sollicitudin ipsum quis nunc sollicitudin ultrices. Donec euismod
          scelerisque ligula.
        </p>
      </div>
      <div class="col-lg-4">
        <div class="jumbotron text-center">
          <p>Likelihood of use:</p>
          <span class="display-1 weight-heavy">{{ averageUse }}</span>
        </div>
      </div>
    </div>
    <b-form id="form-container" class="row d-flex flex-row mt-5 mb-5">
      <Radio
        v-for="q in questions"
        :question="q"
        :key="q.label"
        :options="options"
        @change="update"
        class="col-lg-4 col-sm-6 col mb-6"
      />
    </b-form>
    <div class="">
      {{ filteredData }}
      <p />
      {{ averageUse }}
    </div>
  </div>
</template>

<script>
import Radio from '~/components/Radio'

export default {
  components: {
    Radio
  },
  data() {
    return {
      options: [
        { value: '*', text: 'Any' },
        { value: 'YES', text: 'Yes' },
        { value: 'NO', text: 'No' }
      ]
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions
    },
    filters() {
      return this.$store.getters.filters
    },
    filteredData() {
      return this.$store.getters.filteredData
    },
    averageUse() {
      return this.$store.getters.averageUse
    }
  },
  methods: {
    update(event) {
      // eslint-disable-next-line
      console.log(event)
    }
  }
}
</script>

<style>
.title {
  line-height: 1.1;
}
.weight-heavy {
  font-weight: 800;
}
.weight-medium {
  font-weight: 500;
}
.form-group {
  margin-bottom: 4rem;
}
</style>
