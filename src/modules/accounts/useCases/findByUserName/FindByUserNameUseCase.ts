import { inject, injectable } from "tsyringe";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";

@injectable()
class FindByUserNameUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute(username: string): Promise<ILojistaResponseDTO> {
        const lojista = await this.lojistasRepository.findByUserName(username);

        const lojistaDTO = LojistaMap.toDTO(lojista);

        return lojistaDTO;
    }
}
export { FindByUserNameUseCase };
