export default async function assertSorted(test, arr, asc = true) {
  const arrLength = await arr.count;
  for (let i = 0; i < arrLength; i++) {
    if (i !== arrLength - 1) {
      let request = await arr.nth(i).innerText;
      let nextRequest = await arr.nth(i + 1).innerText;

      asc
        ? await test
            .expect(parseInt(request, 10))
            .lte(parseInt(nextRequest, 10))
        : await test
            .expect(parseInt(request, 10))
            .gte(parseInt(nextRequest, 10));
    }
  }
}
