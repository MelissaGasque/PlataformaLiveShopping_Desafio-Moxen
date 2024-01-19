import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users.entity"
import { Product } from "./products.entity"

@Entity("lives")
export class Live {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({length: 30})
    titulo: string;

    @Column({type: "text"})
    descricao: string;

    @Column()
    imagemURL: string

    @CreateDateColumn({type:"date", unique:true})
    inicioLive: string
    // ainda não sei se é string ou date

    @CreateDateColumn({type:"date", unique:true})
    fimLive: Date
    // Fazer teste

    @ManyToOne(() => User, (user) => user.live)
    user: User
    
    @OneToMany(() => Product, (product) => product.live)
    products: Product[]
}