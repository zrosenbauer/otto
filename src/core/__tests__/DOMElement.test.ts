import { Action } from '@bluenova/otto-browser';
import * as _ from 'lodash';

import { DOMElement } from '../DOMElement';

// Utils
// -----

function buildTestCore () {
  const actions: Action[] = [];
  const selector = 'div.test';

  function addAction (action: Action) {
    actions.push(action);
  }

  const domEl = new DOMElement({
    addAction,
    selector
  });

  return {
    getActions: () => actions,
    getElement: () => domEl,
    selector
  };
}

// Core
// -----

describe('uuid', () => {
  const uuidCondition = {
    fact: 'browser',
    path: '$.id',
    operator: 'equal',
    value: expect.any(String)
  };

  [
    {
      method: 'hasValue',
      args: ['foo']
    },
    {
      method: 'isVisible',
      args: []
    },
    {
      method: 'isHidden',
      args: []
    },
    {
      method: 'hasClass',
      args: ['foo']
    },
    {
      method: 'hasId',
      args: ['foo']
    },
    {
      method: 'isTagType',
      args: ['foo']
    }
  ].forEach((testCase) => {
    it(`adds uuid for method ${testCase.method}`, () => {
      const testUtil = buildTestCore();

      // @ts-ignore
      testUtil.getElement()[testCase.method](...testCase.args);

      const action = testUtil.getActions()[0];
      const conditions = _.get(action, 'conditions.all', []);
      const idCondition = _.find(conditions, {
        fact: 'browser',
        path: '$.id'
      });

      expect(idCondition).toEqual({
        fact: 'browser',
        path: '$.id',
        operator: 'equal',
        value: action.id
      });
    });
  });
});

// Methods
// -----

describe('click', () => {
  it('adds base navigation', () => {
    const testUtil = buildTestCore();

    testUtil.getElement().click();

    expect(testUtil.getActions())
      .toEqual([{
        type: 'click',
        id: expect.any(String),
        selector: testUtil.selector
      }]);
  });
});
