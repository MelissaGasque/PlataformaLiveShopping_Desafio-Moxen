import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Live } from "./live.entity"

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 30})
    nome: string

    @Column()
    imagemURL: string

    @Column()
    quantidade: string

    @ManyToOne(() => Live, (live) => live.products)
    live: Live
}