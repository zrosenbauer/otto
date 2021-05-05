import * as ottoBrowser from '@bluenova/otto-browser';
import * as _ from 'lodash';

import { DOMElement } from '../DOMElement';

// Utils
// -----

function buildTestCore () {
  const actions: ottoBrowser.DOMAction[] = [];
  const selector = 'div.test';

  function addAction (action: ottoBrowser.DOMAction) {
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

const baseUUIDConditionAssertion = {
  fact: 'browser',
  path: '$.id',
  operator: 'equal',
  value: expect.any(String)
};

// Core
// -----

interface Method {
  method: string;
  args: string[] | [string[]];
  actionOutput: Omit<ottoBrowser.DOMAction, 'id'> & {id: any};
}

// Assert Methods
// -----
// Add Assert methods here to test the I/O of creating an assertion. Follow
// the steps below to add a test case.
//
//  1. Add the object with all basic requirements: "method", "args" (method arguments) and "selector"
//  2. Add in the conditions for the specific assertion
//
// Limitations
// - requires "selector" and other fields that might NOT be required in future iterations

const assertMethods: Method[] = [
  {
    method: 'hasValue',
    args: ['foo'],
    actionOutput: {
      type: 'query',
      id: expect.any(String),
      selector: 'div.test',
      conditions: {
        all: [
          baseUUIDConditionAssertion,
          {
            fact: 'browser',
            path: '$.elements[*].innerText',
            operator: 'containsEvery',
            value: 'foo'
          }
        ],
        params: {
          id: expect.any(String),
          methodName: 'query(div.test).hasValue(foo)'
        }
      }
    }
  },
  {
    method: 'isVisible',
    args: [],
    actionOutput: {
      type: 'query',
      id: expect.any(String),
      selector: 'div.test',
      conditions: {
        all: [
          baseUUIDConditionAssertion,
          {
            fact: 'browser',
            operator: 'containsEvery',
            path: '$.elements[*].visible',
            value: true
          }
        ],
        params: {
          id: expect.any(String),
          methodName: 'query(div.test).isVisible()'
        }
      }
    }
  },
  {
    method: 'isHidden',
    args: [],
    actionOutput: {
      type: 'query',
      id: expect.any(String),
      selector: 'div.test',
      conditions: {
        all: [
          baseUUIDConditionAssertion,
          {
            fact: 'browser',
            operator: 'containsEvery',
            path: '$.elements[*].hidden',
            value: true
          }
        ],
        params: {
          id: expect.any(String),
          methodName: 'query(div.test).isHidden()'
        }
      }
    }
  },
  {
    method: 'hasClass',
    args: ['foo'],
    actionOutput: {
      type: 'query',
      id: expect.any(String),
      selector: 'div.test',
      conditions: {
        all: [
          baseUUIDConditionAssertion,
          {
            fact: 'browser',
            operator: 'contains',
            path: '$.elements[*].classNames[*]',
            value: 'foo'
          }
        ],
        params: {
          id: expect.any(String),
          methodName: 'query(div.test).hasClass(foo)'
        }
      }
    }
  },
  {
    method: 'hasId',
    args: ['foo'],
    actionOutput: {
      type: 'query',
      id: expect.any(String),
      selector: 'div.test',
      conditions: {
        all: [
          baseUUIDConditionAssertion,
          {
            fact: 'browser',
            operator: 'containsEvery',
            path: '$.elements[*].id',
            value: 'foo'
          }
        ],
        params: {
          id: expect.any(String),
          methodName: 'query(div.test).hasId(foo)'
        }
      }
    }
  },
  {
    method: 'isTagType',
    args: ['div'],
    actionOutput: {
      type: 'query',
      id: expect.any(String),
      selector: 'div.test',
      conditions: {
        all: [
          baseUUIDConditionAssertion,
          {
            fact: 'browser',
            operator: 'containsEvery',
            path: '$.elements[*].tagName',
            value: 'div'
          }
        ],
        params: {
          id: expect.any(String),
          methodName: 'query(div.test).isTagType(div)'
        }
      }
    }
  }
];

// Action Methods
// -----
// Add Action methods here to test the I/O of creating a User type action for
// the browser. Follow the steps below to add a test case.
//
//  1. Add the object with all basic requirements: "method", "args" (method arguments) and "selector"
//  2. Add in the "value" or other fields as needed
//
// Limitations
// - requires "selector" and other fields that might NOT be required in future iterations

const actionMethods: Method[] = [
  {
    method: 'click',
    args: [],
    actionOutput: {
      type: 'click',
      id: expect.any(String),
      selector: 'div.test'
    }
  },
  {
    method: 'select',
    args: [['foo']],
    actionOutput: {
      type: 'select',
      value: ['foo'],
      id: expect.any(String),
      selector: 'div.test'
    }
  },
  {
    method: 'type',
    args: ['foo'],
    actionOutput: {
      type: 'type',
      value: 'foo',
      id: expect.any(String),
      selector: 'div.test'
    }
  },
  {
    method: 'check',
    args: [],
    actionOutput: {
      type: 'check',
      id: expect.any(String),
      selector: 'div.test'
    }
  },
  {
    method: 'uncheck',
    args: [],
    actionOutput: {
      type: 'uncheck',
      id: expect.any(String),
      selector: 'div.test'
    }
  }
];

describe('uuid', () => {
  assertMethods.forEach((testCase) => {
    it(`adds uuid for method "DOMElement.${testCase.method}"`, () => {
      const testUtil = buildTestCore();

      // @ts-ignore
      testUtil.getElement()[testCase.method](...testCase.args);

      const action = testUtil.getActions()[0];
      const conditions = _.get(action, 'conditions.all', []);
      const foundUUIDCondition = _.find(conditions, {
        fact: 'browser',
        path: '$.id'
      });

      expect(foundUUIDCondition).toEqual(baseUUIDConditionAssertion);
    });
  });
});

// Methods
// -----

[
  ...assertMethods,
  ...actionMethods
].forEach((testCase) => {
  describe(testCase.method, () => {
    it('adds correct action to the queue', () => {
      const testUtil = buildTestCore();

      // @ts-ignore
      const chain = testUtil.getElement()[testCase.method](...testCase.args);

      expect(testUtil.getActions())
        .toEqual([testCase.actionOutput]);
    });

    it('returns this', () => {
      const testUtil = buildTestCore();

      // @ts-ignore
      const chain = testUtil.getElement()[testCase.method](...testCase.args);

      expect(chain).toBe(testUtil.getElement());
    });
  });
});
