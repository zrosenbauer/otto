/* eslint-disable */

import otto from '../main';

/**
 * An example Otto test used to validate AND test the Local & CI workflow.
 */
describe('example', () => {
  it('renders the home page', async () => {
    otto.navigate('https://bluenova.io');
    otto.query('h1').hasValue('BlueNova');
    otto.query('div.ant-typography')
      .hasValue('We build tools that allow developers to focus on delivering immediate value to their end customer.')
      .hasClass('description');

    await otto.assert();
  });
});
