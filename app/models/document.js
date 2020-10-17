import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import ENV from 'interflux/config/environment';

export default class DocumentModel extends Model {
  @attr('string') path;
  @attr('string') name;

  @belongsTo('language') language;
  @belongsTo('document-category') documentCategory;
  @alias('documentCategory') category;

  get url() {
    return `${ENV.cdnHost}/${this.path}`;
  }
}
