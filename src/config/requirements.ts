import type { Translatable, Translator } from "@/config/model";
import { type Property, Value, Origin, Skill, SkillWithAttribute, Attribute } from "./properties";

export interface Requirement<T extends Translatable> {
  items: T[]
  check(items: Array<Value<T>>): boolean
  format(translator: Translator): string
}

class MinimumValue<T extends Translatable> implements Requirement<T> {
  constructor(
    private item: T,
    private value: number
  ) {
    this.items = [item]
  }
  readonly items: T[]
  check(items: Array<Value<T>>): boolean {
    const actualItem = items.find((v) => v.property.name == this.item.name)
    if (actualItem) {
      return actualItem.value >= this.value
    }
    return false
  }
  format(translator: Translator): string {
    return `${this.item.format(translator)} >= ${this.value}`
  }
}

export function atLeastOrigin(item: Origin, value: number): Requirement<Origin> {
  return new MinimumValue(item, value)
}

class MaximumValue<T extends Translatable> implements Requirement<T> {
  constructor(
    private item: T,
    private value: number
  ) {
    this.items = [item]
  }
  readonly items: T[]
  check(items: Array<Value<T>>): boolean {
    const actualItem = items.find((v) => v.property.name == this.item.name)
    return actualItem ? actualItem.value <= this.value : true
  }
  format(translator: Translator): string {
    return `${this.item.format(translator)} <= ${this.value}`
  }
}

export function atMostOrigin(item: Origin, value: number): Requirement<Origin> {
  return new MaximumValue(item, value)
}

export function atLeastSkill(item: Skill, value: number): Requirement<SkillWithAttribute> {
  return new MinimumValue(new SkillWithAttribute(item), value)
}

export function atLeastAttribute(item: Attribute, value: number): Requirement<Attribute> {
  return new MinimumValue(item, value)
}

class Either<T extends Translatable> implements Requirement<T> {
  constructor(readonly requirements: Array<Requirement<T>>) {
    this.items = requirements.reduce((items, current) => items.concat(current.items), [] as T[])
  }
  readonly items: T[]
  check(items: Array<Value<T>>): boolean {
    return this.requirements.reduce((satisfied, current) => satisfied || current.check(items), false)
  }
  format(translator: Translator): string {
    return this.requirements.map((requirement) => requirement.format(translator)).join("/")
  }
}

export function either<T extends Property>(...requirements: Array<Requirement<T>>): Requirement<T> {
  return new Either(requirements)
}
