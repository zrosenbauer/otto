export const command = 'example';

export const describe = 'this is an example cli command';

export const builder = {};

export async function handler(argv: any) {
  console.log('You successfully ran a command!');
}
