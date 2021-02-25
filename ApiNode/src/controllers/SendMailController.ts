import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { SurveyUser } from "../models/SurveyUser";
import SendMailService from "../services/SendMailService";

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UserRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json(
                {
                    error: "User does not exists!"
                }
            );
        }

        const survey = await surveysRepository.findOne({ id: survey_id })

        if (!survey) {
            return response.status(400).json(
                {
                    error: "Survey does not exists!"
                }
            );
        }

        // Salvar as informações na tabela SurveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        await surveysUsersRepository.save(surveyUser)
        // Enviar email para o usuário

        await SendMailService.execute(email, survey.title, survey.description);

        return response.json(surveyUser);
    }
}

export { SendMailController }
