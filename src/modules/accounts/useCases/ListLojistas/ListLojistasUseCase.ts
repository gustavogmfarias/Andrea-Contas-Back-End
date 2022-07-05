import { inject, injectable } from "tsyringe";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";

@injectable()
class ListLojistasUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({ page, per_page }): Promise<ILojistaResponseDTO[]> {
        const lojistas = await this.lojistasRepository.listLojistas({
            page,
            per_page,
        });

        const lojistasDTO = lojistas.map((lojista) => {
            return LojistaMap.toDTO(lojista);
        });
        return lojistasDTO;
    }
}
export { ListLojistasUseCase };
