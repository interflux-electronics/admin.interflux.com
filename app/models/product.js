import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import ENV from 'interflux/config/environment';

export default class ProductModel extends Model {
  @alias('id') slug;
  @attr('string') name;
  @attr('string') label;
  @attr('string') status;

  @attr('string') pitch;
  @attr('string') summary;
  @attr('string') properties;
  @attr('string') instructions;

  @attr('number') rankAmongFamily;

  @attr('boolean') compliesWithROHS;
  @attr('boolean') compliesWithIEC;
  @attr('boolean') compliesWithIPCJSTD004A;
  @attr('boolean') compliesWithIPCJSTD004B;
  @attr('boolean') compliesWithIPCJSTD005;
  @attr('boolean') compliesWithISO;
  @attr('string') testResults;

  @belongsTo('product-family') productFamily;
  @alias('productFamily') family;

  @belongsTo('image', { inverse: 'product' }) image;

  @hasMany('image', { inverse: 'products' }) images;
  @hasMany('document') documents;
  @hasMany('quality') qualities;
  @hasMany('use') uses;

  @hasMany('product-image') productImages;
  @hasMany('product-document') productDocuments;
  @hasMany('product-quality') productQualities;
  @hasMany('product-use') productUses;

  @belongsTo('product', { inverse: 'inferiorProducts' }) superiorProduct;
  @hasMany('product', { inverse: 'superiorProduct' }) inferiorProducts;

  get url() {
    return `${ENV.wwwHost}/en/product/${this.slug}`;
  }

  get link() {
    return this.url.replace('https://', '').replace('http://', '');
  }

  get isOffline() {
    return this.status === 'offline';
  }

  get isOnline() {
    return !this.isOffline;
  }

  get isOutdated() {
    return this.status === 'outdated';
  }

  get isDiscontinued() {
    return this.status === 'discontinued';
  }
}
