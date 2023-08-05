// eslint-disable-next-line @typescript-eslint/ban-types
export default function catchError(func: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (state: Function) {
    func().catch((error: Error) => {
      console.log('ERROR: ', error);
      state(error);
    });
  };
}
