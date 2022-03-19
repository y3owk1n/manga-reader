export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function fetchGetHtml(url: string) {
  try {
    const data = await fetch(url).then((res) => {
      if (res.redirected) {
        return "redirected";
      }
      return res.text();
    });
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
