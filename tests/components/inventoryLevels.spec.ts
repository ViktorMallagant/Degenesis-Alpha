import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import InventoryTab from '../../src/components/InventoryTab.vue'
import { ITEMS } from '../../src/config/items'
import { EditorMode } from '../../src/config/modes'
import { i18n } from '../../src/i18n'
import { useCharacterStore } from '../../src/store'

const slotStub = {
  template: '<div><slot /></div>'
}

const buttonStub = {
  inheritAttrs: false,
  template: '<button v-bind="$attrs"><slot /></button>'
}

function mountTab() {
  return mount(InventoryTab, {
    global: {
      plugins: [i18n],
      stubs: {
        HoverTooltip: slotStub,
        VBtn: buttonStub,
        VBtnToggle: slotStub,
        VCheckbox: slotStub,
        VChip: slotStub,
        VDivider: slotStub,
        VSelect: slotStub,
        VSpacer: slotStub,
        VTable: slotStub,
        VTextField: slotStub,
        VTooltip: slotStub,
      }
    }
  })
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Inventory item level controls', () => {
  test('shows a catalog selector and purchases the selected level with currency', async () => {
    const store = useCharacterStore()
    const item = ITEMS.find(candidate => candidate.levelable && candidate.cult === undefined)
    expect(item).toBeDefined()

    store.setEditorMode(EditorMode.Free)
    store.setManualLC(1000000)
    const wrapper = mountTab()

    const catalogRow = wrapper.findAll('tr').find(row =>
      row.text().includes(item!.name) && row.find('select[title="Select item level"]').exists()
    )
    expect(catalogRow).toBeDefined()

    await catalogRow!.find('select[title="Select item level"]').setValue('2')
    const currencyButton = catalogRow!.findAll('button').find(button => button.text().includes('Drafts'))
    expect(currencyButton).toBeDefined()
    await currencyButton!.trigger('click')

    expect(store.inventory).toHaveLength(1)
    expect(store.inventory[0].level).toBe(2)
  })

  test('shows an owned-item selector and changes one item level in place', async () => {
    const store = useCharacterStore()
    const item = ITEMS.find(candidate => candidate.levelable)
    expect(item).toBeDefined()

    store.addFreeItem(item!.id)
    const wrapper = mountTab()
    const selector = wrapper.find('select[title="Change item level"]')

    expect(selector.exists()).toBe(true)
    await selector.setValue('3')

    expect(store.inventory[0].level).toBe(3)
  })
})
