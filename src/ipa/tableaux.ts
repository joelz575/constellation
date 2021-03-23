import { v4 as uuidv4 } from "uuid";

export async function obtTableau(id: string) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    nom: {
      fr: "Tableau test ".concat(id),
      en: "Test table ".concat(id)
    },
    bdOrbite: uuidv4()
  };
}

export async function obtDonnéesTableau(adresseOrbite: string) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return adresseOrbite;
}
