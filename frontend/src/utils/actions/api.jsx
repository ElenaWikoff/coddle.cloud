const base_url = '/api/';

export async function fetch_instance(route, id=null) {
    const url = `${base_url}/${route}/${id}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {return data})
    .catch((error) => {
        console.error(`Failed to fetch from ${url}: ${error}`);
    });
}

export async function fetch_data(route, searchParams) {
    const url = `${base_url}/${route}?${searchParams.toString()}`;
    console.log(url);
    // const url = `/data/fish_pagination.json`;
    let result = undefined;

    await fetch(url)
    .then((res) => res.json())
    .then((data) => {
        result = data;
    })
    .catch((error) => {
        console.error(`Failed to fetch from ${url}: ${error}`);
    });
    return result;
}

export async function spotLoader({ params }) {
   const data = await spotsLoader(params);
   return data.results.find((spot) => spot.id == params.id);
}

export async function fishLoader({ params }) {
   const data = await fetch_instance('fish', params.id);
   return data;
}

export async function lureLoader({ params }) {
   const data = await fetch_instance('fish', params.id);
   return data;
}