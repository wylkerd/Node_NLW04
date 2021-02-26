import { Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        // desestruturação do ES6
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            throw new AppError(err)
        }

        const usersRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if (userAlreadyExists) {
            throw new AppError("User already exists")
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
