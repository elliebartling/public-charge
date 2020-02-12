<template>
  <div id="app" class="container">
    <div id="hero" class="row d-flex flex-row justify-content-between">
      <div class="col-lg-8 col-md-10 col-12">
        <h1 class="title display-3 weight-heavy mb-4">
          Are you likely to be a Public&nbsp;Charge?
        </h1>
        <p class="lead weight-medium">
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
      <div class="col-lg-4 col-12 d-flex align-items-start">
        <b-alert
          id="top-line-calc"
          :class="useStyling"
          show
          variant="dark"
          class="sticky-top text-white border-0 text-center py-md-5 py-3"
        >
          <h1 class="c-display-4 weight-heavy">{{ averageUse | percent }}</h1>
          <p class="mb-0 help-text">
            Benefits Use Rate for people with your demographic profile
          </p>
        </b-alert>
      </div>
      <div class="col-lg-8 col-12">
        <b-form id="form-container" class="row d-flex flex-row mb-5">
          <Radio
            v-for="q in questions"
            :question="q"
            :key="q.label"
            :options="options"
            @change="update"
            class="col-lg-6 col-md-6 col-12 mb-6"
          />
        </b-form>
      </div>
    </div>
    <div class="alert alert-secondary mb-1 col-lg-8 offset-lg-4" role="alert">
      <strong>Note:</strong> These calculations only apply if you meet the
      minimum household income threshold of > 125% of the poverty line.
    </div>
    <div class="alert alert-light mb-5 col-lg-8 offset-lg-4" role="alert">
      <p>
        <strong>Additional Information:</strong>
      </p>
      <ol>
        <li>
          Include cash benefits from any state or local government, housing
          subsidies, Temporary Assistance for Needy Families (TANF),
          Supplemental Security Income (SSI), Supplemental Nutritional
          Assistance Program (SNAP or food stamps), Medicaid (if you went to the
          doctor or hospital obtained prescription drugs).
        </li>
      </ol>
    </div>
    <div class="footer row border-top mb-5 pt-4">
      <div class="col-md-6 col-12">
        <p>
          Data by David Bier @ The Cato Institute. App design & build by Ellen
          Bartling. Concept development by Daniel Bier.
        </p>
        <p>
          Powered by Vue.js & Bootstrap.
        </p>
      </div>
      <div class="col-md-6 col-12">
        <div class="w-100 d-md-flex justify-content-end align-items-center">
          <p class="mb-md-0 mr-3 font-weight-bold ">
            Embed this on your website:
          </p>
          <button
            v-clipboard:copy="embedCode"
            v-clipboard:success="handleCopyStatus"
            class="btn btn-primary"
          >
            Copy Embed Code
          </button>
        </div>
        <p class="w-100 text-right">
          <small v-if="copySucceeded === true">Copied!</small>
        </p>
      </div>
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
      copySucceeded: null,
      embedCode:
        '<!-- copy and paste me --><iframe id="public-charge-calculator-embed" src="https://public-charge-calculator.netlify.com/" style="border: 0px; width: 100%; height: 100%;"></iframe>',
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
    },
    handleCopyStatus(status) {
      this.copySucceeded = true
      setTimeout(() => {
        this.copySucceeded = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
* {
  letter-spacing: -0.4px;
}
#app {
  margin-top: 4rem;
  margin-bottom: 20rem;
  @media only screen and (min-width: 1292px) {
    margin-top: 10rem;
    margin-bottom: 4rem;
  }
}
.title {
  line-height: 1.1;
  font-size: 3rem;
  @media only screen and (min-width: 1292px) {
    font-size: 4rem;
  }
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
  font-size: 1rem;
  @media only screen and (min-width: 1292px) {
    font-size: 1.3rem;
  }
  @media only screen and (min-width: 768px) {
    font-size: 1.4rem;
  }
  @media only screen and (max-width: 1292px) {
    position: fixed;
    bottom: 10px;
    width: calc(100% - 40px);
    left: 20px;
    display: block;
    top: auto;
  }
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

.c-display-4 {
  font-size: 1.5rem;
  @media only screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
  @media only screen and (min-width: 1292px) {
    font-size: 3.5rem;
  }
}
</style>
