import React from 'react';
import { mount } from 'enzyme';
import { KubernetesInventory } from './KubernetesInventory';
import { kubernetesStub, addActionStub, deleteActionStub } from './__mocks__/kubernetesStubs';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./Kubernetes.hooks');

describe('KubernetesInventory::', () => {
  it('renders table correctly', () => {
    const root = mount(
      <KubernetesInventory
        kubernetes={kubernetesStub}
        addKubernetes={addActionStub}
        deleteKubernetes={deleteActionStub}
        loading={false}
      />,
    );
    const rows = root.find('tr');

    expect(rows.length).toBe(kubernetesStub.length + 1);
  });
  xit('cancels delete cluster', () => {
    const root = mount(
      <KubernetesInventory
        kubernetes={kubernetesStub}
        addKubernetes={addActionStub}
        deleteKubernetes={deleteActionStub}
        loading={false}
      />,
    );
    const openDeleteModalButton = root
      .find('[data-qa="open-delete-modal-button"]')
      .find('button')
      .at(0);

    openDeleteModalButton.simulate('click');

    const cancelButton = root.find('[data-qa="cancel-delete-kubernetes-button"]').find('button');

    cancelButton.simulate('click');

    expect(root.find('tr').length).toBe(kubernetesStub.length + 1);
    expect(deleteActionStub).toHaveBeenCalledTimes(0);
  });
  xit('deletes cluster correctly', () => {
    const root = mount(
      <KubernetesInventory
        kubernetes={kubernetesStub}
        addKubernetes={addActionStub}
        deleteKubernetes={deleteActionStub}
        loading={false}
      />,
    );
    const openDeleteModalButton = root
      .find('[data-qa="open-delete-modal-button"]')
      .find('button')
      .at(0);

    openDeleteModalButton.simulate('click');

    const deleteButton = root.find('[data-qa="delete-kubernetes-button"]').find('button');

    deleteButton.simulate('click');

    expect(deleteActionStub.mock.calls[0][1]).toBe(false);
    expect(deleteActionStub.mock.calls.length).toBe(1);
  });

  it('deletes cluster correctly with force mode', () => {
    const root = mount(
      <KubernetesInventory
        kubernetes={kubernetesStub}
        addKubernetes={addActionStub}
        deleteKubernetes={deleteActionStub}
        loading={false}
      />,
    );
    const openDeleteModalButton = root
      .find('[data-qa="open-delete-modal-button"]')
      .find('button')
      .at(0);

    openDeleteModalButton.simulate('click');

    const selectForceMode = root.find('[data-qa="form-field-force"] input');

    selectForceMode.at(0).simulate('change', { target: { value: true } });

    const deleteButton = root.find('[data-qa="delete-kubernetes-button"]').find('button');

    deleteButton.simulate('click');

    expect(deleteActionStub.mock.calls[1][1]).toBe(true);
    expect(deleteActionStub.mock.calls.length).toBe(2);
  });
});
