export async function fetchGetJSON(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    return await response.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function fetchGetHtml(url: string) {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        authority: "www.haoman6.com",
        schema: "https",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
      },
    });

    if (data.redirected) {
      return "redirected";
    }
    return data.text();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
