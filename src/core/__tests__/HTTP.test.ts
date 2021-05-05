import { Action } from '@bluenova/otto-browser';

import { HTTP } from '../HTTP';

describe('navigate', () => {
  it('adds base navigation', () => {
    const actions: Action[] = [];

    function addAction (action: Action) {
      actions.push(action);
    }

    const http = new HTTP({
      addAction,
      url: 'http://localhost:8080/test'
    });

    http.navigate();

    expect(actions)
      .toEqual([{
        type: 'navigate',
        id: expect.any(String),
        url: 'http://localhost:8080/test'
      }]);
  });
});
