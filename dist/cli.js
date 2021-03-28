"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const cli = __importStar(require("yargs"));
(async () => {
    if (process.argv.includes('help') ||
        process.argv.includes('--help') ||
        process.argv.includes('-h')) {
        console.log('otto');
        console.log('\n===========================\n\n');
        console.log('Your friendly neighborhood test automator!');
    }
    // eslint-disable-next-line no-unused-expressions
    cli
        .scriptName('otto')
        .commandDir(path.join(__dirname, 'commands'), {
        extensions: ['ts', 'js'],
        exclude: /\.d\.ts$/,
    })
        .command({
        command: '*',
        handler() {
            console.log('Argument required, please pass in a proper argument or use --help if you need help');
        },
    })
        .option('debug', {
        alias: 'd',
        describe: 'Verbose logging for debugging',
    })
        .fail((msg, err, yargs) => {
        console.log(`ERROR: ${msg || err.message}`);
        process.exit(1);
    })
        .wrap(cli.terminalWidth() * .8)
        .help()
        .showHelpOnFail(false).argv;
})();
//# sourceMappingURL=cli.js.map