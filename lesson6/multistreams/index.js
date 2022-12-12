const worker_threads = require('worker_threads');

const run = (data) => {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads.Worker('./worker.js', {
            workerData: data,
        });

        worker.on('message', resolve);
        worker.on('error', reject);
    });
};

(async () => {
    const passwordBytesSize = 10;
    const result = await run(passwordBytesSize);

    console.log(result);
})();
