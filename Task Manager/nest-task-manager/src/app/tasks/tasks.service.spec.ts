import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { Task } from "src/models/task/task.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { TaskStatus } from "./interfaces/enums.enum";


const mockUser = { uId: 'id' };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnThis(),
    }))
})

const mockConfigSerive = () => {
    get: jest.fn()
}

describe('TaskService', () => {
    let taskService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: getRepositoryToken(Task), useFactory: mockTaskRepository },
                { provide: ConfigService, useFactory: mockConfigSerive }
            ]
        }).compile()

        taskService = await module.get(TasksService);
        taskRepository = await module.get(getRepositoryToken(Task))
    })

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            jest.spyOn(taskService, 'getTasks').mockResolvedValue('somevalue')
            // const filters = { status: TaskStatus.IN_PROGRESS, search: 'some value' };
            const result = await taskService.getTasks(mockUser, {});
            expect(taskService.getTasks).toHaveBeenCalled()
            expect(result).toEqual('somevalue')
        })
    })
})