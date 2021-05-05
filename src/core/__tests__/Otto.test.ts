let returnActions: unknown[] = [];
jest.mock('axios', () => ({
  post: async (url: string, body: unknown) => {
    return {
      data: { actions: returnActions },
      url,
      body
    };
  }
}));

import axios from 'axios';

import { DOMElement } from '../DOMElement';
import { Otto } from '../Otto';
import { HTTP } from '../HTTP';

describe('query', () => {
  let domEl: DOMElement;
  let otto: Otto;

  beforeAll(() => {
    otto = new Otto();
    domEl = otto.query('foobar');
  });

  it('returns DOMElement', () => {
    expect(domEl.constructor.name).toEqual('DOMElement');
  });

  it('properly passes addAction', () => {
    expect(domEl.addAction).toBeDefined();
  });

  it('properly passes selector', () => {
    expect(domEl.selector).toEqual('foobar');
  });
});

describe('request', () => {
  let http: HTTP;
  let otto: Otto;

  beforeAll(() => {
    otto = new Otto();
    http = otto.request('/foobar', 'POST', { foobar: true });
  });

  it('returns HTTP', () => {
    expect(http.constructor.name).toEqual('HTTP');
  });

  it('properly passes addAction', () => {
    expect(http.addAction).toBeDefined();
  });

  it('properly passes url', () => {
    expect(http.url).toEqual('/foobar');
  });

  it('properly passes method', () => {
    expect(http.method).toEqual('POST');
  });

  it('defaults to GET', () => {
    const httpOther = otto.request('/foobar');
    expect(httpOther.method).toEqual('GET');
  });

  it('properly passes body', () => {
    expect(http.body).toEqual({ foobar: true });
  });
});

describe('navigate', () => {
  let http: HTTP;
  let otto: Otto;

  beforeAll(() => {
    otto = new Otto();
    http = otto.navigate('/foobar');
  });

  it('returns HTTP', () => {
    expect(http.constructor.name).toEqual('HTTP');
  });

  it('properly passes addAction', () => {
    expect(http.addAction).toBeDefined();
  });

  it('properly passes url', () => {
    expect(http.url).toEqual('/foobar');
  });

  it('properly passes method', () => {
    expect(http.method).toEqual('GET');
  });

  it('properly passes body', () => {
    expect(http.body).toEqual(undefined);
  });
});

describe('assert', () => {
  let otto: Otto;

  beforeAll(() => {
    otto = new Otto();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears actions', async () => {
    otto.query('.foobar').click();
    const spy = jest.spyOn(axios, 'post');
    await otto.assert();
    expect(spy).toHaveBeenCalledWith('http://localhost:5678/run', {
      runTime: 'chromium',
      actions: [{
        type: 'click',
        id: expect.any(String),
        selector: '.foobar'
      }]
    });
    await otto.assert();
    expect(spy).toHaveBeenCalledWith('http://localhost:5678/run', {
      runTime: 'chromium',
      actions: []
    });
  });

  it('does nothing if no errors', async () => {
    otto.query('.foobar').click();
    await expect(otto.assert()).resolves.toBe(undefined);
  });

  it('throws exceptions if errors', async () => {
    otto.query('.foobar').hasValue('foobar');
    returnActions = [
      {
        rule: {
          params: {
            methodName: 'query(.foobar).hasValue(foobar)'
          }
        }
      }
    ];
    await expect(otto.assert()).rejects.toThrow();
  });
});
