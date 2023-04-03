import Else from "./views/Else.svelte";
import Home from "./views/Home.svelte";
import Thing from "./views/Thing.svelte";

type ComponentView = {
  component?: typeof Home | typeof Thing | typeof Else,
  title?: string
}

const router = new Map<string, ComponentView>();
router.set('/', {component: Home, title: 'Dog Api'})
router.set('', router.get('/'))
router.set('home', router.get('/'))
router.set('thing', {component: Thing, title: 'Thing Page'})
router.set('else', {component: Else, title: 'Else, what up?'})


export default router;