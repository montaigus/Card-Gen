import { allCardTypes } from "./cardTypes";

const requestOptionsPost = (bodyObject: allCardTypes | { id: number }) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(bodyObject, null, 2),
  };
};

const localhost: string = "http://localhost:8000";

// TODO oops, un any qui traine, mais faut que je revoie ces histoires de query
export async function getCards({ queryKey }: any) {
  const apiRes: Response = await fetch(
    `${localhost}/cards?type=${queryKey[1].type}`
  );
  console.log("coucou api");
  if (!apiRes.ok) {
    //?on verra ça plus tard
    //throw new console.error("not ok");
  }

  return apiRes.json();
}

export async function writeCard({
  cardItem,
  isExisting,
}: {
  cardItem: allCardTypes;
  isExisting: boolean;
}) {
  const apiRes = fetch(
    `${localhost}/write?new=${isExisting ? 0 : 1}`,
    requestOptionsPost(cardItem)
  );

  return apiRes;
}

export async function destroyCard(id: number) {
  const apiRes = fetch(localhost + "/destroy", requestOptionsPost({ id: id }));
}
