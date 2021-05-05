# Otto

[![CI](https://github.com/bluenovaio/otto/actions/workflows/ci.yaml/badge.svg)](https://github.com/bluenovaio/otto/actions/workflows/ci.yaml)
[![Publish](https://github.com/bluenovaio/otto/actions/workflows/publish.yaml/badge.svg)](https://github.com/bluenovaio/otto/actions/workflows/publish.yaml)
[![codecov](https://codecov.io/gh/bluenovaio/otto/branch/main/graph/badge.svg?token=LYQZKFGV28)](https://codecov.io/gh/bluenovaio/otto)

Otto helps developers create and maintain e2e tests. Unlike other tools we truly "otto-mate" your e2e testing workflow.

## Getting Started

Install the package and take a look at the commands available.

**npm**
```
npm i @bluenova/otto
```

**yarn**
```
yarn add @bluenova/otto
```

## Usage

The `otto` package contains a cli tool in addition to utils used to write e2e tests for your applications.

**NOTE:** Currently you MUST `git clone git@github.com:bluenovaio/otto-server.git` and run the server locally using `yarn start`. This requirement will be removed in an upcoming bersion.

### Writing Tests

```typescript
import otto from '@bluenova/otto';

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
```

### Running Commands

```shell
$ otto test
```
