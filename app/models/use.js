import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import ENV from 'interflux/config/environment';

export default class UseModel extends Model {
  @attr('string') slug;
  @attr('string') icon;
  @attr('string') text;
  @attr('string') gist;
  @attr('number') rank;

  @hasMany('product-use') productUses;

  get products() {
    const rank = 'rankAmongProducts';
    const records = this.productUses;
    const ranked = records.filterBy(rank).sortBy(rank);
    const rankless = records.rejectBy(rank);
    const sorted = [...ranked, ...rankless];

    return sorted.map((record) => record.product);
  }

  @belongsTo('image') image;
  @hasMany('use-image') useImages;

  get images() {
    return this.useImages.sortBy('rankAmongImages');
  }

  get families() {
    return this.products.mapBy('family').uniqBy('id').filterBy('id');
  }

  get url() {
    return `${ENV.publicHost}/en/products/for-${this.id}`;
  }

  get link() {
    return this.url.replace('https://', '').replace('http://', '');
  }

  get label() {
    const str = this.text || '';
    return str[0].toUpperCase() + str.slice(1);
  }

  get iconURL() {
    return this.icon
      ? `${ENV.cdnHost}/${this.icon}`
      : `${ENV.cdnHost}/images/icons/check.svg`;
  }

  get canBeDeleted() {
    return this.productCount === 0 && this.imageCount === 0;
  }

  get productCount() {
    return this.products.length;
  }

  get imageCount() {
    return this.useImages.length;
  }
}
