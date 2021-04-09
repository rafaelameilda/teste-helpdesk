import { Notify } from 'quasar'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (/* { app, router, Vue ... } */) => {
  Notify.setDefaults({
    position: 'top-right',
    timeout: 0,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
  })
}
