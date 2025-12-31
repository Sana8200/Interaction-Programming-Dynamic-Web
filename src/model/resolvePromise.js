/**
 * Promise State Resolver
 * Tracks promise state (pending, resolved, rejected) in an observable object
 */

/**
 * Resolve a promise and track its state
 * @param {Promise|null} promise - The promise to track
 * @param {object} promiseState - Object to store { promise, data, error }
 */
export function resolvePromise(promise, promiseState) {
    // Reset state
    promiseState.promise = promise;
    promiseState.data = null;
    promiseState.error = null;

    if (!promise) {
        return;
    }

    promise
        .then((data) => {
            // Only update if this is still the current promise (prevents race conditions)
            if (promiseState.promise === promise) {
                promiseState.data = data;
                promiseState.error = null;
            }
        })
        .catch((error) => {
            if (promiseState.promise === promise) {
                promiseState.error = error;
                promiseState.data = null;
            }
        });
}
