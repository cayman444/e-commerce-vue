export interface IProductsToCart {
  productId: string
  productCountToCart: number
  priceForOne: number
  name: string
  image: string
}

export interface IAddToCart {
  productId: string
  priceForOne: number
  name: string
  image: string
}
