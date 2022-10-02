import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView';

describe('HomeView.vue', () => {
  it('renders label tag', () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.find('label').text()).equal('Teendő:');
  });
});
