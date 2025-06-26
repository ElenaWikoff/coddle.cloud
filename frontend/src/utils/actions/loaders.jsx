
export async function spotsLoader({ params }) {
   const res = await fetch(`/data/fishing_spots.json`);
   const data = res.json();
   return data;
}

export async function fishSpeciesLoader({ params }) {
   const res = await fetch(`/data/fish_species.json`);
   const data = res.json();
   return data;
}

export async function luresLoader({ params }) {
   const res = await fetch(`/data/lures.json`);
   const data = res.json();
   return data;
}

export async function fishLoader({ params }) {
   const data = await fishSpeciesLoader(params);
   data.results.find((fish) => {
      return fish.id == params.id;
   });
   return data.results.find((fish) => fish.id == params.id);
}
