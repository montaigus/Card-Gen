const fetchCards = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch("./Cards.json");

  if (!apiRes.ok) {
    throw new console.error("not ok");
  }

  return apiRes.json();
};

export default fetchCards;
