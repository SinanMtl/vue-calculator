import { describe, expect, it } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Calculator from '../components/CalculatorComp.vue';

describe('Calculator component', () => {
  const wrapper = mount(Calculator);

  it('should be mounted', () => {
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should be clicked any button', async () => {
    const btn = wrapper.find('[data-test="5"]');
    const screen = wrapper.find('[data-test="screen"]');

    await btn.trigger('click');
    await flushPromises();

    expect(screen.text()).toBe('5');
  });

  it('add 3', async () => {
    const btnAdd = wrapper.find('[data-test="+"]');
    const btn3 = wrapper.find('[data-test="3"]');
    const btnFinish = wrapper.find('[data-test="="]');
    const history = wrapper.find('[data-test="history"]');
    const screen = wrapper.find('[data-test="screen"]');

    await btnAdd.trigger('click');
    await btn3.trigger('click');
    await btnFinish.trigger('click');
    await flushPromises();

    expect(history.text()).toBe('5 + 3');
    expect(screen.text()).toBe('8');
  });
});
