// src/utils/data.js

export const getInitialData = () => [
  {
    id: +new Date() + 2,
    title: "Node.js",
    body: "Node.js adalah runtime JavaScript yang dibangun di atas mesin JavaScript V8 Chrome.",
    createdAt: "2022-05-15T09:12:45.123Z",
    archived: false,
  },
  {
    id: +new Date() + 3,
    title: "TypeScript",
    body: "TypeScript adalah superset dari JavaScript yang menambahkan static typing.",
    createdAt: "2022-06-20T14:30:22.456Z",
    archived: false,
  },
  {
    id: +new Date() + 4,
    title: "Webpack",
    body: "Webpack adalah module bundler untuk aplikasi JavaScript modern.",
    createdAt: "2022-07-10T11:05:33.789Z",
    archived: true,
  },
  {
    id: +new Date() + 5,
    title: "Vue.js",
    body: "Vue.js adalah framework JavaScript progresif untuk membangun antarmuka pengguna.",
    createdAt: "2022-08-25T16:45:10.234Z",
    archived: false,
  },
  {
    id: +new Date() + 6,
    title: "Express",
    body: "Express adalah framework web aplikasi Node.js yang minimal dan fleksibel.",
    createdAt: "2022-09-05T08:20:15.678Z",
    archived: true,
  },
];

export default getInitialData;
