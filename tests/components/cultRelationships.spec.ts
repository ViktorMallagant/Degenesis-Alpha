import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { i18n } from '../../src/i18n'
import { useCharacterStore } from '../../src/store'
import CultRelationshipsTab from '../../src/components/CultRelationshipsTab.vue'

const slotStub = {
  template: '<div><slot /></div>'
}

const buttonStub = {
  inheritAttrs: false,
  template: '<button v-bind="$attrs"><slot /></button>'
}

const dialogStub = {
  props: ['modelValue'],
  template: '<div v-if="modelValue" class="dialog-stub"><slot /></div>'
}

function mountTab(readonly = false) {
  return mount(CultRelationshipsTab, {
    props: { readonly },
    global: {
      plugins: [createPinia(), i18n],
      stubs: {
        VBtn: buttonStub,
        VDialog: dialogStub,
        VCard: slotStub,
        VCardTitle: slotStub,
        VCardText: slotStub,
        VCardActions: slotStub
      }
    }
  })
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('CultRelationshipsTab', () => {
  test('changes a relationship with left and right clicks', async () => {
    const wrapper = mountTab()
    const store = useCharacterStore()
    const firstCard = wrapper.find('.cult-card')

    await firstCard.trigger('click')
    expect(store.cultRelationships.spitalians).toBe(1)

    await firstCard.trigger('contextmenu')
    expect(store.cultRelationships.spitalians).toBe(0)

    await firstCard.trigger('contextmenu')
    expect(store.cultRelationships.spitalians).toBe(-1)
  })

  test('requires confirmation before resetting every relationship', async () => {
    const wrapper = mountTab()
    const store = useCharacterStore()
    store.setCultRelationship('spitalians', 3)
    store.setCultRelationship('palers', -2)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.dialog-stub').exists()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.dialog-stub').exists()).toBe(true)

    const buttons = wrapper.findAll('button')
    await buttons[buttons.length - 1].trigger('click')

    expect(Object.values(store.cultRelationships).every((value) => value === 0)).toBe(true)
  })

  test('does not allow changes in readonly mode', async () => {
    const wrapper = mountTab(true)
    const store = useCharacterStore()
    store.setCultRelationship('spitalians', 2)
    await wrapper.vm.$nextTick()

    const firstCard = wrapper.find('.cult-card')
    await firstCard.trigger('click')
    await firstCard.trigger('contextmenu')

    expect(store.cultRelationships.spitalians).toBe(2)
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})
