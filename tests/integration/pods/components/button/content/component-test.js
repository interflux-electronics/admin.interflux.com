import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | button/content', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders @text', async function (assert) {
    assert.expect(4);

    this.set('text', 'Click me');

    await render(hbs`
      <Button::Content
        @text={{this.text}}
      />
    `);

    assert.equal(this.element.querySelectorAll('span').length, 1);
    assert.equal(this.element.querySelectorAll('svg').length, 0);
    assert.equal(this.element.querySelectorAll('div').length, 0);
    assert.equal(this.element.innerText.trim(), this.text);
  });

  test('it renders @text, @icon and block content', async function (assert) {
    assert.expect(4);

    this.set('text', 'Click me');
    this.set('icon', 'chevron-right');

    await render(hbs`
      <Button::Content
        @text={{this.text}}
        @icon={{this.icon}}
      >
        <div></div>
      </Button::Content>
    `);

    assert.equal(this.element.querySelectorAll('span').length, 1);
    assert.equal(this.element.querySelectorAll('svg').length, 1);
    assert.equal(this.element.querySelectorAll('div').length, 1);
    assert.equal(this.element.innerText.trim(), this.text);
  });
});
