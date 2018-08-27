import { createDecorator, VueDecorator } from 'vue-class-component'
import Vue, { ComponentOptions } from 'vue'

interface FirebaseComponentOptions extends ComponentOptions<Vue> {
  firebase?: object
}

interface VueFireReference {
  source: firebase.database.Reference
  asObject?: boolean
  cancelCallback?: () => void
  readyCallback?: () => void
}

export function FirebaseRefs(refs: Record<string, firebase.database.Reference | VueFireReference>): VueDecorator {
  return createDecorator((componentOptions: FirebaseComponentOptions, key) => {
    if (typeof componentOptions.firebase !== 'object') {
      componentOptions.firebase = refs
    } else {
      componentOptions.firebase = {
        ...componentOptions.firebase,
        ...refs,
      }
    }
  })
}
