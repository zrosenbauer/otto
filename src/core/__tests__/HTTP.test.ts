import { Action } from '@bluenova/otto-browser';

import { HTTP } from '../HTTP';

describe('constructor', () => {
  it('adds base navigation', () => {
    const actions: Action[] = [];

    function addAction (action: Action) {
      actions.push(action);
    }

    new HTTP({
      addAction,
      url: 'http://localhost:8080/test'
    });

    expect(actions)
      .toEqual([{
        type: 'navigate',
        id: expect.any(String),
        url: 'http://localhost:8080/test'
      }]);
  });
});
