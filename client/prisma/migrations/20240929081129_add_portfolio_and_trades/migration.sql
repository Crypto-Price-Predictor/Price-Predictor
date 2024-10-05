-- CreateTable
CREATE TABLE `portfolioUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `User_ID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coin` VARCHAR(191) NULL,
    `initial_amount` DECIMAL(65, 30) NOT NULL,
    `boughtPrice` DECIMAL(65, 30) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `profit` DECIMAL(65, 30) NULL,
    `Portfolio_ID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `portfolioUser` ADD CONSTRAINT `portfolioUser_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trades` ADD CONSTRAINT `trades_Portfolio_ID_fkey` FOREIGN KEY (`Portfolio_ID`) REFERENCES `portfolioUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
