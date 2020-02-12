<template>
  <div class="container mt-10">
    <div id="hero" class="row d-flex flex-row justify-content-between">
      <div class="col-lg-8">
        <h1 class="title display-3 weight-heavy mb-4">
          Are you likely to be a Public Charge?
        </h1>
        <p class="lede weight-medium">
          The government will deny your immigration application if it deems you
          “likely to become a public charge.” It defines “public charge” as
          <mark>
            51% probability of using most types of means-tested public benefits
          </mark>
          for more than 12 months in a 36-month period. Officials will assess
          your probability based on your individual characteristics. This tool
          allows you to view the benefits use rates for people with your
          demographic profile.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <b-alert
          id="top-line-calc"
          :class="useStyling"
          show
          variant="dark"
          class="sticky-top text-white border-0 text-center py-5"
        >
          <h1 class="display-4 weight-heavy">{{ averageUse | percent }}</h1>
          <p class="mb-0 help-text">
            Benefits Use Rate for people with your demographic profile
          </p>
        </b-alert>
      </div>
      <div class="col-lg-8">
        <b-form id="form-container" class="row d-flex flex-row mb-5">
          <Radio
            v-for="q in questions"
            :question="q"
            :key="q.label"
            :options="options"
            @change="update"
            class="col-lg-6 col-sm-6 col mb-6"
          />
        </b-form>
      </div>
    </div>
    <div class="alert alert-danger mb-5" role="alert">
      <strong>Note:</strong> These calculations only apply if you meet the
      minimum household income threshold. Not sure if you do? Check here:
      www.link.com
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
    },
    useStyling() {
      if (this.averageUse > 0.5) {
        return 'bg-danger'
      } else {
        return 'bg-primary'
      }
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
* {
  letter-spacing: -0.4px;
}
.title {
  line-height: 1.1;
}
.lede {
  font-size: 20px;
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
.letter-1 {
  letter-spacing: 1px;
}
.mt-10 {
  margin-top: 10rem;
}
.mb-10 {
  margin-bottom: 10rem;
}

#top-line-calc {
  font-size: 20px;
}

#top-line-calc .help-text {
  opacity: 0.7;
  line-height: 1.1;
}

#hero {
  margin-bottom: 6rem;
}

.sticky-top {
  top: 2rem;
}
</style>
