export default async function fetcher(url, passedOptions) {
  let options = {};
  if (passedOptions) {
    options = passedOptions;
  } else {
    // If no options are passed, force the fetch. Required for react native.
    options = {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      },
    };
  }

  const localOptions = {
    ...options,
  };

  const res = await fetch(url, localOptions);
  if (res.ok) {
    return await res.json();
  }
}
