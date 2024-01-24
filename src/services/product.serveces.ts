import { DeepPartial, Repository } from "typeorm"
import { ProductCreateInterface, ProductInterface, ProductReadInterface, ProductUpdateInterface } from "../interfaces/product.interface"
import { Product, Live } from "../entities/index"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors/app.errors"
import { readProductSchema } from "../schema/product.schema"
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
export const readProductService = async (liveId: string): Promise<ProductReadInterface[]> => {
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product);
    const products = await productRepo.find({ where: { live: { id: liveId } }, relations: ['live'] })
    return products.map(product => readProductSchema.parse(product))
}
export const readProdutsOnLiveService = async (liveId: string): Promise<boolean> => {
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product)
    const product = await productRepo.findOne({ where: { live: { id: liveId } }, relations: ['live'] })

    if (product) {
        return true
    } else {
        return false
    }
};
// //Apenas quem criou pode alterar
export const updateProductService = async (payload: DeepPartial<ProductUpdateInterface>, productId: string): Promise<ProductReadInterface> => {
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product)
    const product = await productRepo.findOneBy({ id: productId })
    const updateProduct = await productRepo.save({ ...product, ...payload })

    return readProductSchema.parse(updateProduct)
}
//Apenas quem criou pode deletar
export const deleteProductService = async (productId: string): Promise<void> => {
    const productRepo: Repository<Product> = AppDataSource.getRepository(Product)
    const deleteProduct = await productRepo.findOneBy({ id: productId })

    if (!deleteProduct) {
        throw new AppError("Produto não encontrado", 404)
    }

    await productRepo.remove(deleteProduct)
}