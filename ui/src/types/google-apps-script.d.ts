declare namespace google {
  namespace script {
    interface Runner {
      withSuccessHandler(callback: (value: unknown) => void): Runner
      withFailureHandler(callback: (error: unknown) => void): Runner
      withUserObject(obj: unknown): Runner
    }
    const run: Runner
  }
}
