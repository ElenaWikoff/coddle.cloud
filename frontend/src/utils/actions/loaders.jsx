// const url = "../data";

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
