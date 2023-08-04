// eslint-disable-next-line @typescript-eslint/ban-types
export default function catchError(func: Function) {
  return function () {
    func().catch((error: Error) => {
      console.log('ERROR: ', error);
    });
  };
}
