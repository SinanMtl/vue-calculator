import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Btn from '../components/BtnComp.vue';

describe('Button component', () => {
  const wrapper = mount(Btn);
  
  it('should be mounted', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be clicked', () => {
    wrapper.vm.$emit('click', 123);

    const emits = wrapper.emitted();

    expect(emits.click[0][0]).toBe(123)
  });
})

