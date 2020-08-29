import ModalRoute from 'interflux/pods/components/modal/route';
import { hash } from 'rsvp';

export default class DocumentRoute extends ModalRoute {
  model(params) {
    return hash({
      document: this.store.find('document', params.id)
      // delay: new Promise((resolve, reject) => setTimeout(reject, 3000))
    });
  }
}
