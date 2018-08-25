import { createDecorator, VueDecorator } from 'vue-class-component';
import Vue, { ComponentOptions } from 'vue';

interface FirebaseComponentOptions extends ComponentOptions<Vue> {
  firebase?: object;
}

export function FirebaseRefs(refs: Record<string, firebase.database.Reference>): VueDecorator {
  return createDecorator((componentOptions: FirebaseComponentOptions, key) => {
    if (typeof componentOptions.firebase !== 'object') {
      componentOptions.firebase = refs;
    } else {
      componentOptions.firebase = {
        ...componentOptions.firebase,
        ...refs,
      };
    }
  });
}
