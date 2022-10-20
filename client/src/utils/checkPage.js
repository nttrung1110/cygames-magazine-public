const checkPage = (page, totalPage) => {
  if (page > totalPage) return false;

  if (page <= 0) return false;

  if (isNaN(page)) return false;

  return true;
};

export default checkPage;
