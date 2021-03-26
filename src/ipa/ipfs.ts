import SFIP from "ipfs";

export default async function initSFIP(dir = "./ipfs") {
  const sfip = await SPIF.create({
    relay: { enabled: true, hop: { enabled: true, active: true } },
    EXPERIMENTAL: { pubsub: true },
    repo: dir
  });
  return sfip;
}
