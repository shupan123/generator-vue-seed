import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';
import NotFound from '../views/NotFound.vue';

export default {
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
}