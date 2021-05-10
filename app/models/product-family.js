import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import ENV from 'interflux/config/environment';

export default class ProductFamilyModel extends Model {
  @alias('id') slug;
  @attr('string') slug;
  @attr('string') nameSingle;
  @attr('string') namePlural;
  @attr('string') gist;
  @attr('string') theFullMonty;
  @attr('number') rank;

  @belongsTo('product-family', { inverse: 'children' }) productFamily;
  @hasMany('product-family', { inverse: 'productFamily' }) children;

  @hasMany('product') products;
  @hasMany('product-family-image') productFamilyImages;

  get url() {
    return `${ENV.publicHosts}/en/products/${this.slug}`;
  }

  get link() {
    return this.url.replace('https://', '').replace('http://', '');
  }

  get isSubFamily() {
    return this.productFamily.get('id') ? true : false;
  }

  get isMainFamily() {
    return !this.isSubFamily;
  }

  // Returns plural family name with first letter capitalised
  get label() {
    const str = this.namePlural || '';
    return str[0].toUpperCase() + str.slice(1);
  }

  get subsetOf() {
    return this.productFamily.get('namePlural') || '-';
  }
}
