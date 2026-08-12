type Runner = google.script.Runner

function getRunner(): Runner {
  const run = (globalThis as {google?: typeof google}).google?.script?.run
  if (!run) {
    throw new Error('google.script.run is unavailable outside the Apps Script sandbox')
  }
  return run
}

export function callServer<T>(fn: string, ...args: unknown[]): Promise<T> {
  const run = getRunner()
  return new Promise<T>((resolve, reject) => {
    const invoke = run
      .withSuccessHandler((value: unknown) => resolve(value as T))
      .withFailureHandler((error: unknown) => reject(error)) as unknown as {
      [fn: string]: (...args: unknown[]) => void
    }
    invoke[fn](...args)
  })
}
