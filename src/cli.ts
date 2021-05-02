import * as path from 'path';
import * as cli from 'yargs';

(async () => {
  // eslint-disable-next-line no-unused-expressions
  cli
    .scriptName('otto')
    .commandDir(path.join(__dirname, 'commands'), {
      extensions: ['ts', 'js'],
      exclude: /\.d\.ts$/
    })
    .command({
      command: '*',
      handler() {
        console.log(
          'Argument required, please pass in a proper argument or use --help if you need help'
        );
      }
    })
    .option('debug', {
      alias: 'd',
      describe: 'Verbose logging for debugging'
    })
    .fail((msg, err, yargs) => {
      console.log(`ERROR: ${msg || err.message}`);
      process.exit(1);
    })
    .wrap(cli.terminalWidth() * 0.8)
    .help()
    .showHelpOnFail(false).argv;
})();
