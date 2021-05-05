import ottoSingleton from '../main';

describe('singleton', () => {
  it('returns an instantiated Otto', () => {
    expect(ottoSingleton.constructor.name).toEqual('Otto');
  });
});
