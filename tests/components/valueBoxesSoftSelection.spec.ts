import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ValueBoxes from '../../src/components/ValueBoxes.vue'

describe('ValueBoxes soft selection', () => {
  test('shows soft-selected points and toggles only filled points', async () => {
    const wrapper = mount(ValueBoxes, {
      props: {
        count: 6,
        value: 4,
        interactive: false,
        softInteractive: true,
        softSelected: [2]
      }
    })

    expect(wrapper.findAll('.box')[1].classes()).toContain('soft-selected')

    await wrapper.findAll('.boxContainer')[2].trigger('click')
    expect(wrapper.emitted('softChange')).toEqual([[3]])

    await wrapper.findAll('.boxContainer')[5].trigger('click')
    expect(wrapper.emitted('softChange')).toEqual([[3]])
  })

  test('displays saved marks without allowing changes when locked', async () => {
    const wrapper = mount(ValueBoxes, {
      props: {
        count: 4,
        value: 4,
        interactive: false,
        softInteractive: false,
        softSelected: [1]
      }
    })

    expect(wrapper.find('.box').classes()).toContain('soft-selected')
    await wrapper.find('.boxContainer').trigger('click')
    expect(wrapper.emitted('softChange')).toBeUndefined()
  })

  test('displays permanent selections with the darker state taking precedence', () => {
    const wrapper = mount(ValueBoxes, {
      props: {
        count: 4,
        value: 4,
        interactive: false,
        softSelected: [2, 3],
        permanentSelected: [3]
      }
    })

    expect(wrapper.findAll('.box')[1].classes()).toContain('soft-selected')
    expect(wrapper.findAll('.box')[2].classes()).toContain('permanent-selected')
    expect(wrapper.findAll('.box')[2].classes()).not.toContain('soft-selected')
  })
})
