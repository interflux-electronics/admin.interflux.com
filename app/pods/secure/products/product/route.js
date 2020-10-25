import ModalRoute from 'interflux/pods/components/modal/route';
import { hash } from 'rsvp';

export default class ProductRoute extends ModalRoute {
  model(params) {
    return hash({
      product: this.store.findRecord('product', params.id, {
        include: [
          'image',
          'features',
          'documents',
          'product_images',
          'product_images.image'
        ].join(','),
        reload: true
      })
      // delay: new Promise((resolve, reject) => setTimeout(reject, 3000))
    });
  }
}
