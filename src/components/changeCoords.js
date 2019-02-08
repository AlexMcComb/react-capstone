export default function convertLatLng(coords) {
  const splitCords = coords.split(",");
  const formattedCoords = [
    Number(splitCords[0].match(/-?[\d]+[.][\d]+/)[0]),
    Number(splitCords[1].match(/-?[\d]+[.][\d]+/)[0])
  ];
  return formattedCoords;
}
