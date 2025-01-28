import { _hashPassword } from 'src/common/utils/bcrypt';
import { Level } from 'src/constants/level';
import { Role } from 'src/constants/role';
import { DatabaseService } from 'src/database/database.service';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { ScoreHistoryEntity } from 'src/modules/score/entities/score_history.entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { DataSource } from 'typeorm';

export class Seeder {
  constructor(
    private readonly dataSource: DataSource,
    private readonly databaseService: DatabaseService,
  ) {}

  async run() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.databaseService.clearDatabase();

      await this._seedUsers(queryRunner);
      await this._seedLevels(queryRunner);
      await this._seedQuestions(queryRunner);
      await this._seedUserAnswersAndScore(queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Seeding failed');
    } finally {
      await queryRunner.release();
    }
  }

  private async _seedUsers(queryRunner) {
    const userRepository = queryRunner.manager.getRepository(UserEntity);
    const users = [
      {
        email: 'estani@admin.com',
        password: await _hashPassword('Test1234'),
        role: Role.Admin,
      },
      {
        email: 'estani@user.com',
        password: await _hashPassword('Test1234'),
        role: Role.User,
      },
    ];
    await userRepository.save(users);
  }

  private async _seedLevels(queryRunner) {
    const levelRepository = queryRunner.manager.getRepository(LevelEntity);
    const levels = [{ name: Level.EASY }, { name: Level.MEDIUM }, { name: Level.HARD }];
    await levelRepository.save(levels);
  }

  private async _seedQuestions(queryRunner) {
    // Repositories
    const categoryRepository = queryRunner.manager.getRepository(CategoryEntity);
    const subcategoryRepository = queryRunner.manager.getRepository(SubcategoryEntity);
    const answerRepository = queryRunner.manager.getRepository(AnswerEntity);
    const questionRepository = queryRunner.manager.getRepository(QuestionEntity);

    // Create categories
    const category1 = categoryRepository.create({
      name: 'Futbol',
    });
    await categoryRepository.save([category1]);

    // Create subcategories
    const subcategory1 = subcategoryRepository.create({
      name: 'Futbol Argentino',
    });
    const subcategory2 = subcategoryRepository.create({
      name: 'Mundiales',
    });
    await subcategoryRepository.save([subcategory1, subcategory2]);

    // Create Answers
    const answer1 = answerRepository.create({
      text: 'Racing Club',
      categories: [category1],
      subcategories: [subcategory1],
    });
    const answer2 = answerRepository.create({
      text: 'Independiente',
      categories: [category1],
      subcategories: [subcategory1],
    });
    const answer3 = answerRepository.create({
      text: 'Boca Juniors',
      categories: [category1],
      subcategories: [subcategory1],
    });
    const answer4 = answerRepository.create({
      text: 'Brasil',
      categories: [category1],
      subcategories: [subcategory2],
    });
    const answer5 = answerRepository.create({
      text: 'Argentina',
      categories: [category1],
      subcategories: [subcategory2],
    });
    const answer6 = answerRepository.create({
      text: 'Alemania',
      categories: [category1],
      subcategories: [subcategory2],
    });
    await answerRepository.save([answer1, answer2, answer3, answer4, answer5, answer6]);

    // Create Questions
    const question1 = questionRepository.create({
      text: 'Cual es el club más grande de Argentina',
      answerOptions: [answer1, answer2, answer3],
      correctAnswer: answer3,
      category: category1,
      subcategory: subcategory1,
      level: Level.EASY,
    });
    const question2 = questionRepository.create({
      text: 'Que país ganó más mundiales',
      answerOptions: [answer4, answer5, answer6],
      correctAnswer: answer4,
      category: category1,
      subcategory: subcategory2,
      level: Level.EASY,
    });
    await questionRepository.save([question1, question2]);
  }

  private async _seedUserAnswersAndScore(queryRunner) {
    const userRepository = queryRunner.manager.getRepository(UserEntity);
    const questionRepository = queryRunner.manager.getRepository(QuestionEntity);
    const userAnswerRepository = queryRunner.manager.getRepository(UserAnswerEntity);
    const scoreHistoryRepository = queryRunner.manager.getRepository(ScoreHistoryEntity);

    const users = await userRepository.find();
    const questions = await questionRepository.find({
      relations: ['answerOptions', 'category', 'subcategory'],
    });

    for (const user of users) {
      for (const question of questions) {
        const answer =
          question.answerOptions[Math.floor(Math.random() * question.answerOptions.length)];

        const userAnswer = userAnswerRepository.create({
          user: user,
          question: question,
          answer: answer,
          isCorrect: answer.id === question.correctAnswer.id,
        });

        await userAnswerRepository.save(userAnswer);

        if (userAnswer.isCorrect) user.score += 10;

        const scoreHistory = scoreHistoryRepository.create({
          user: user,
          change: userAnswer.isCorrect ? 10 : 0,
          reason: `Respuesta correcta a la pregunta ${question.text}`,
        });

        await scoreHistoryRepository.save(scoreHistory);
        await userRepository.save(user);
      }
    }
  }
}
