import * as fs from 'fs';
import * as path from 'path';
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

export class TestSeeder {
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
      console.log('error', error);
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
        email: 'test@user.com',
        password: await _hashPassword('Test1234'),
        role: Role.Player,
        username: 'test@user.com',
      },
    ];
    await userRepository.save(users);
  }

  private async _seedLevels(queryRunner) {
    const levelRepository = queryRunner.manager.getRepository(LevelEntity);
    const levels = [{ name: Level.EASY }];
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
    // Read Questions JSON
    const filePath = path.join(__dirname, '/data/questions_test.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const questions = JSON.parse(fileData);

    for (const questionData of questions) {
      const subcategory = await subcategoryRepository.findOne({
        where: { name: questionData.subcategory },
      });

      const answers = [];
      let correctAnswer = null;

      for (const answerData of questionData.answers) {
        const answer = answerRepository.create({
          text: answerData.text,
          categories: [category1],
          subcategories: [subcategory],
        });

        await answerRepository.save(answer);
        answers.push(answer);

        if (answerData.isCorrect) correctAnswer = answer;
      }

      // Create question
      const question = questionRepository.create({
        text: questionData.text,
        answerOptions: answers,
        correctAnswer: correctAnswer,
        category: category1,
        subcategory: subcategory,
        level: questionData.level,
      });

      await questionRepository.save(question);
    }
  }

  private async _seedUserAnswersAndScore(queryRunner) {
    const userRepository = queryRunner.manager.getRepository(UserEntity);
    const questionRepository = queryRunner.manager.getRepository(QuestionEntity);
    const userAnswerRepository = queryRunner.manager.getRepository(UserAnswerEntity);
    const scoreHistoryRepository = queryRunner.manager.getRepository(ScoreHistoryEntity);

    const users = await userRepository.find();
    const questions = await questionRepository.find({
      relations: ['answerOptions', 'category', 'subcategory', 'correctAnswer'],
    });

    for (const user of users) {
      for (const question of questions) {
        const answer =
          question.answerOptions[Math.floor(Math.random() * question.answerOptions.length)];

        const userAnswer = userAnswerRepository.create({
          user: user,
          question: question,
          answer: answer,
          isCorrect: answer.id ? answer.id === question.correctAnswer.id : false,
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
