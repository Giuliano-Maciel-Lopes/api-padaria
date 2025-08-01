// fora da função:
export const orderSelect = {
    totalAmount: true,
    status: true,
    id: true,
    isHome: true,
    items: {
      select: {
        id: true,
        quantity: true,
        unitPrice: true,
        product: {
          select: {
            name: true,
            imageUrl: true,
            category: true,
          },
        },
      },
    },
    user: {
      select: {
        name: true,
      },
    },
  };
  