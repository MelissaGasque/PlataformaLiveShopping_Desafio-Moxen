import { Repository } from "typeorm"
import { ProductCreateInterface, ProductInterface} from "../interfaces/product.interface"
import { Product, Live } from "../entities/index"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors/app.errors"
// import { productSchema } from "../schema/product.schema"


export const createProductService = async(payload: ProductCreateInterface, liveId:string): Promise<ProductInterface> => {
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product)
    const liveRepo: Repository<Live> = AppDataSource.getRepository(Live)
    const live: Live | null = await liveRepo.findOne({ where: { id: liveId } })
    if (!live) {
        throw new Error('Live não encontrada');
    }
    const product: ProductInterface = productRepo.create({...payload, live })
    await productRepo.save(product)
    return product
}
export const readProductService = async (): Promise<ProductInterface[]> => {
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product)
    return productRepo.find()
}
// //Apenas quem criou pode alterar
// export const updateProductService = async (payload: ProductUpdateInterface, productId: string): Promise<ProductInterface> => {
//     const productRepo: Repository<Product> = AppDataSource.getRepository(Product)
//     const product = await productRepo.findOneBy({ id: productId })
//     const updateProduct = await productRepo.save({ ...product, ...payload })

//     return productSchema.parse(updateProduct)
// }
//Apenas quem criou pode deletar
export const deleteProductService = async (productId: string): Promise<void> => {
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product)
    const deleteProduct = await productRepo.findOneBy({ id: productId })

    if (!deleteProduct) {
        throw new AppError("Produto não encontrado", 404)
    }

    await productRepo.remove(deleteProduct)
}