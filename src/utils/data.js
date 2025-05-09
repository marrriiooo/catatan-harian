// src/utils/data.js

export const getInitialData = () => [
  {
    id: +new Date(),
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: +new Date() + 1,
    title: "React",
    body: "React adalah library JavaScript untuk membangun antarmuka pengguna.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
];

export default getInitialData;
