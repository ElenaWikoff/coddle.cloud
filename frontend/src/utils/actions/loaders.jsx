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

export async function fishLoader({ params }) {
    console.log(params.id);
    const data = await fishSpeciesLoader(params);
    console.log(data);
    data.results.find((fish) => {
        console.log(fish.id + " " + params.id);
        return fish.id == params.id;
    })
    console.log(data.results.find((fish) => fish.id == params.id));
    return data.results.find((fish) => fish.id == params.id);
}
