// export const getPagination = (page, totalPages) => {
//   let start = 1;
//   let end = totalPages;
//   const pages = [];

//   if (totalPages > 8) {
//     if (page - 4 >= 1 && totalPages >= page + 3) {
//       start = page - 4;
//       end = start + 7;
//     }

//     if (totalPages <= page + 3) {
//       end = totalPages;
//       start = end - 7;
//     }

//     if (page - 4 < 1) {
//       start = 1;
//       end = start + 7;
//     }
//   }

//   for (let i = start; i <= end; i++) {
//     pages.push(i);
//   }

//   return pages;
// };

export const getPagination = (page, totalPages) => {
  let start = 1;
  let end = totalPages;
  const pages = [];

  if (totalPages > 6) {
    if (page - 3 >= 1 && totalPages >= page + 2) {
      start = page - 3;
      end = start + 5;
    }

    if (totalPages <= page + 2) {
      end = totalPages;
      start = end - 5;
    }

    if (page - 3 < 1) {
      start = 1;
      end = start + 5;
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};
