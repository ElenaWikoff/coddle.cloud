
export async function spotsLoader({ params }) {
   const res = await fetch(`/data/fishing_spots.json`);
   const data = res.json();
   return data;
}

export async function spotLoader({ params }) {
   const data = await spotsLoader(params);
   return data.results.find((spot) => spot.id == params.id);
}

export async function fishSpeciesLoader({ params }) {
   const res = await fetch(`/api/fish`);
   const data = res.json();
   return data;
}

export async function fishLoader({ params }) {
   const data = await fishSpeciesLoader(params);
   return data.find((fish) => fish.id == params.id);
}

export async function luresLoader({ params }) {
   const res = await fetch(`/api/lures`);
   const data = res.json();
   return data;
}

export async function lureLoader({ params }) {
   const data = await luresLoader(params);
   return data.find((lure) => lure.id == params.id);
}
