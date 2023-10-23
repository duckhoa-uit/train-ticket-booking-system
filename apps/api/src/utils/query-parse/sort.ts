export const addSort = (sort_field?: string, sort_direction?: string) => {
  if (!sort_field || !sort_direction)
    return {
      $sort: {
        createdAt: -1,
      },
    }
  const sort = {
    [sort_field]: +sort_direction,
  }
  return {
    $sort: sort,
  }
}
