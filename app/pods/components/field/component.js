import Component from '@glimmer/component';

import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FieldComponent extends Component {
  @service form;
  @service auth;

  id; // Unique across the app

  constructor() {
    super(...arguments);
    const id = this.form.getUniqueId();
    this.id = `field-${id}`;
  }

  // STATE

  // The value we're exposing to the user with this <Field> can be in 5 different states:
  get state() {
    // Server errors
    if (this.error) {
      return 'error';
    }

    // Validation warnings
    if (this.warning) {
      return 'warning';
    }

    // Valid and saving
    if (this.isSaving) {
      return 'saving';
    }

    // Valid and dirty
    if (this.isDirty) {
      return 'dirty';
    }

    // Saved, no changes
    return 'idle';
  }

  // On top of that
  @tracked hasFocus = false;
  @tracked hasHover = false;
  @tracked isSaving = false;
  @tracked error;

  // This method needs to be overwriten by the components that inherit this component.
  get isDirty() {
    console.warn('isDirty() is missing on', this.id, this.args.label);
    return false;
  }

  // This method needs to be overwriten by the components that inherit this component.
  get warnings() {
    console.warn('warnings() is missing on', this.id, this.args.label);
    return 'missing-method';
  }

  // FOCUS

  @action
  onFocus() {
    this.hasFocus = true;
  }

  @action
  onBlur() {
    this.hasFocus = false;
  }

  // HOVER

  @action
  onMouseOver() {
    this.hasHover = true;
  }

  @action
  onMouseOut() {
    this.hasHover = false;
  }

  // SAVE

  @tracked lastSavedValue;

  @action
  async save() {
    console.debug('saving');

    // Reset errors, allow second save attempt
    this.error = null;

    // Show saving state
    this.isSaving = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Remember the value
    const value = this.value;

    this.args.record
      .save({
        adapterOptions: {
          whitelist: [this.args.attribute]
        }
      })
      .then(() => {
        console.debug('save successful');
        this.lastSavedValue = value;
      })
      .catch((response) => {
        console.error('save failed');
        console.error(response);

        if (response.errors && response.errors[0] && response.errors[0].code) {
          const code = response.errors[0].code;

          if (code === 'forbidden-attribute') {
            // this.args.record.rollbackAttributes();
          }
          if (code === 'token-expired') {
            this.auth.reset(); // redirect to login
          }

          this.error = code;
        } else {
          this.error = 'unknown';
        }
      })
      .finally(() => {
        this.isSaving = false;
      });
  }
}
