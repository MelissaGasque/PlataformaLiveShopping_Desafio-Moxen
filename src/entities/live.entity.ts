import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users.entity"
import { Product } from "./products.entity"

@Entity("lives")
export class Live {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 30})
    titulo: string

    @Column({type: "text"})
    descricao: string;

    @Column()
    imagemURL: string

    @CreateDateColumn({type:"date", unique:true})
    inicioLive: string

    @CreateDateColumn({type:"date", unique:true})
    fimLive: string


    @ManyToOne(() => User, (user) => user.live)
    user: User
    
    @OneToMany(() => Product, (product) => product.live)
    products: Product[]
}