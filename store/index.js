import { filter, round } from 'lodash'
import data from '~/assets/data.json'

export const state = () => ({
  questions: [
    {
      label: 'Household Income',
      help:
        'Is your household income at least 250% of the poverty line, or assets (minus debt) at least 5 times the difference between your household income and 250% of the poverty line? Income income from any member of your household.',
      selected: '*',
      col: 'in'
    },
    {
      label: 'Full-Time Employment',
      help:
        'Are you employed, or do you have a job offer in the United States?',
      selected: '*',
      col: 'em'
    },
    {
      label: 'English Fluency',
      help: 'Do you speak English fluently?',
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
    },
    {
      label: 'Use of Benefits',
      help: 'Did you personally receive public benefits in the last year? *',
      selected: '*',
      col: 'be'
    },
    {
      label: 'Cit',
      help: 'Not sure',
      selected: '*',
      col: 'ci'
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
    be: '*',
    ci: '*'
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
    return filter(state.data, state.filters)[0]
  },
  averageUse: (state, getters) => {
    if (!getters.filteredData) return 'N/A'
    const { rate } = getters.filteredData || null
    return round(rate * 100, 1) + '%'
  }
}
