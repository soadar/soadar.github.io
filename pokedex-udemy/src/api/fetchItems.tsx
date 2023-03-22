import { Item } from "../types/types";

export async function fetchItems(): Promise<Item[]> {
  const respuesta = await fetch("https://pokeapi.co/api/v2/item?limit=5");
  const { results } = await respuesta.json();
  const items = results.map(async (item: any) => ({
    name: item.name,
    url: item.url,
  }));
  return items;
}
