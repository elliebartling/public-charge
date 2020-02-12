import { find } from 'lodash'
import data from '~/assets/data-overall.json'

export const state = () => ({
  questions: [
    {
      label: 'Household Income Greater Than 250% of the Poverty Line',
      help:
        'Is your household income at least 250% of the poverty line, or assets (minus debt) at least 5 times the difference between your household income and 250% of the poverty line? Include income from any member of your household.',
      selected: '*',
      col: 'in'
    },
    {
      label: 'Full-Time Employment',
      help:
        'Are you employed, or will you be employed when you receive status in the United States?',
      selected: '*',
      col: 'em'
    },
    {
      label: 'Use of Benefits',
      help:
        'Did you personally receive public benefits in the last year?<sup>1</sup>',
      selected: '*',
      col: 'be'
    },
    {
      label: 'English Fluency',
      help:
        'Do you speak English well or very well? Answer no only if you speak English not well or not at all.',
      selected: '*',
      col: 'en'
    },
    {
      label: 'College Degree',
      help: "Have you graduated college with at least a bachelor's degree?",
      selected: '*',
      col: 'ba'
    },
    {
      label: 'High School',
      help: 'Have you graduated from High School?',
      selected: '*',
      col: 'hs'
    },
    {
      label: 'Age',
      help: 'Are you below the age of 18 or above the age of 61?',
      selected: '*',
      col: 'ag'
    },
    {
      label: 'Household Members',
      help: 'Are there more than four members in your family?',
      selected: '*',
      col: 'hh'
    },
    {
      label: 'Health',
      help:
        'Is your health good, very good, or excellent? Answer no only if your health is fair or poor.',
      selected: '*',
      col: 'he'
    }
  ],
  filters: {
    in: '*',
    em: '*',
    en: '*',
    ba: '*',
    hs: '*',
    ag: '*',
    hh: '*',
    he: '*',
    be: '*'
  },
  data
})

export const mutations = {
  update(state, payload) {
    const { question, newValue } = payload
    question.selected = newValue

    const obj = {}
    state.questions.map((item) => {
      obj[item.col] = item.selected
    })
    state.filters = obj
  }
}

export const getters = {
  filters: (state) => {
    return state.filters
  },
  filteredData: (state) => {
    return find(state.data, state.filters)
  },
  averageUse: (state, getters) => {
    if (!getters.filteredData) return 'N/A'
    const { rate } = getters.filteredData || null
    return rate
  }
}

export const actions = {
  getAverageUseForOption({ state }, payload) {
    const { question, option } = payload
    return new Promise((resolve, reject) => {
      // Save a copy of our filters object
      const filters = { ...state.filters }

      // Change our question to have this option selected instead
      filters[question.col] = option.value

      const result = find(state.data, filters)

      if (result === undefined) return 'N/A'
      return result.rate
    })
  }
}
