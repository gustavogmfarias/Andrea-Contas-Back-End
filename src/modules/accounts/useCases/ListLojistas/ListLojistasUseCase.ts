import { inject, injectable } from "tsyringe";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListLojistasUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({ page, perPage }): Promise<ILojistaResponseDTO[]> {
        try {
            const lojistas = await this.lojistasRepository.listLojistas({
                page,
                perPage,
            });

            const lojistasDTO = lojistas.map((lojista) => {
                return LojistaMap.toDTO(lojista);
            });
            return lojistasDTO;
        } catch {
            throw new AppError("Não foi possível buscar os lojistas", 400);
        }
    }
}
export { ListLojistasUseCase };
