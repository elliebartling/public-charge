import Vue from 'vue'
import { round } from 'lodash'

Vue.filter('percent', (val) => {
  return round(val * 100) + '%'
})
