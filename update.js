/**
 * Created by apizzimenti on 12/29/15.
 */

var updateNotifier = require('update-notifier'),
    clc = require('cli-color'),
    col = clc.bgBlack.white;

var notifier = updateNotifier({
    updateCheckInterval: 1000 * 60 * 60 * 24
});

if (notifier.update) {
    notifier.notify(
        'Update for cli-weather available: version ' + notifier.update.latest + '\n' +
        'Run ' + col('sudo npm i cli-weather -g') + ' to install.'
    );
}