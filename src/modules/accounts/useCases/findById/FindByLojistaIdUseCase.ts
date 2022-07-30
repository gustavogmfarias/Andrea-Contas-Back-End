import { inject, injectable } from "tsyringe";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";

@injectable()
class FindByLojistaIdUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute(id: string): Promise<ILojistaResponseDTO> {
        const lojista = await this.lojistasRepository.findById(id);

        const lojistaDTO = LojistaMap.toDTO(lojista);

        return lojistaDTO;
    }
}
export { FindByLojistaIdUseCase };
