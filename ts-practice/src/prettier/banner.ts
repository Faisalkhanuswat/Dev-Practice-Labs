import figlet from 'figlet';
import chalk from 'chalk';

const createDashedLine = (length: number) => '='.repeat(length);

 function showBanner(appName: string, color: string = 'green') {
    figlet(appName, (err, data: any) => {
        if (err) {
            console.error('Error generating banner!');
            console.error(err);
            return;
        }
        const textWidth = Math.max(...data.split('\n').map((line: string) => line.length));
        const dashedLine = createDashedLine(textWidth);

        const chalkColor = chalk[color]
        console.log(chalkColor(dashedLine));
        console.log(chalkColor(data));
        console.log(chalkColor(dashedLine));
        console.log(
            chalk.cyanBright(`:: Node ::`) +
            chalk.gray(` (${process.version}.RELEASE)`)
        );
    });
}

export default showBanner;
