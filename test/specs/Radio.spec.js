import { mount } from '@vue/test-utils'
import test from 'ava'
import Radio from '../../components/Radio.vue'

test('is a Vue instance', (t) => {
  const wrapper = mount(Radio)
  t.is(wrapper.isVueInstance(), true)
})
