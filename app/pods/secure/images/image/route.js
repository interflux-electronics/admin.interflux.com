import ModalRoute from 'interflux/pods/components/modal/route';
import { hash } from 'rsvp';

export default class ImageRoute extends ModalRoute {
  model(params) {
    return hash({
      image: this.store.find('image', params.id, { reload: true })
      // delay: new Promise((resolve, reject) => setTimeout(reject, 3000))
    });
  }
}
