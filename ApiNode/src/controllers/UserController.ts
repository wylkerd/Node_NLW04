import { Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';

class UserController {
    async create(request: Request, response: Response) {
        // desestruturação do ES6
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatorio"),
            email: yup.string().email().required("Email é obrigatorio")
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err })
        }

        const usersRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists"
            });
        }

        const user = usersRepository.create({
            name, email
        })

        // await pois retorna uma promise
        await usersRepository.save(user);

        return response.status(201).json(user);
    }
};

export { UserController };
